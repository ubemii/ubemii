import axios from "axios";
const mpdParser = window.require("mpd-parser");
const defaultQuality = "480";

const addDownloadTask = (tasks) => {
  // // we will perform download in the background so it's not necessary to add anything here.
  // // just send the tasks list to the background process.
  // electron.ipcRenderer.send("addDownloadTask", tasks);
  tasks.forEach(file => {
    if (file.mime === "video/mp4") {

    } else if (file.mime === "application/dash+xml") {
      console.log(file);
      axios.get(file.downloadUrl).then(response => {
        const mpdManifest = mpdParser.parse(response.data, {
          manifestUri: file.downloadUrl
        });
        console.log(mpdManifest);
      }).catch(console.error);
    }
  });
};

const getPendingTasks = () => {

}

const convertQualityToSize = (height) => {
  height = parseInt(height);
  let width = "256";
  if (height === 2160) width = "3840"
  if (height === 1440) width = "2560"
  if (height === 1080) width = "1920"
  if (height === 720) width = "1280"
  if (height === 480) width = "854"
  if (height === 360) width = "640"
  if (height === 240) width = "426"
  return parseInt(width);
}

const qualityPicker = (video) => {
  // this is an array that contains all media sources.
  const mediaSources = video['media_sources'];
  // based on type (mime type), filter mp4 (not encrypted) videos
  const mp4videos = mediaSources.filter(x => x.type === "video/mp4");
  if (mp4videos.length === 0) {
    // here the magic comes. the most complex part and fucking hard
    // console.log(mediaSources);
    // Find m3u8 files
    // const m3u8Listing = mediaSources.find(x => x.type === "application/x-mpegURL");
    // if (m3u8Listing) {
    //   console.log("sources", mediaSources);
    //   const parser = new m3u8Parser.Parser();
    //   const m3u8Src = m3u8Listing.src;
    //   const m3u8Content = await axios.get(m3u8Src);
    //   // console.log(m3u8Content.data);
    //   parser.push(m3u8Content.data);
    //   console.log("============ MANIFEST ==============")
    //   if (parser.manifest) {
    //     const playlist = parser.manifest.playlists;
    //     if (!playlist) return new Error("m3u8: Playlists inaccessible.");
    //     const parsedVideos = [];
    //     const avoidDuplicates = [];
    //     playlist.forEach(video => {
    //       if (video.attributes && video.attributes.RESOLUTION && video.attributes.RESOLUTION) {
    //         const {width, height} = video.attributes.RESOLUTION;
    //         if (!avoidDuplicates.includes(height)) {
    //           avoidDuplicates.push(height);
    //           console.log(video);
    //           parsedVideos.push(video);
    //         }
    //       }
    //     });
    //
    //   } else {
    //     return new Error("m3u8: Error occurred, cannot retrieve manifest");
    //   }
    //   console.log("============ MANIFEST ==============")
    // }

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // !!! Working on mpd instead. m3u8 is broken!!!
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    return mediaSources.find(x => x.type === "application/dash+xml");
  } else {
    // mp4 is available
    const chooseHighest = (videos) => {
      if (videos.length === 1) return videos[0];
      return videos.sort((a, b) => {
        return parseInt(b.label) - parseInt(a.label)
      })[0];
    }
    if (defaultQuality === "highest") {
      return chooseHighest(mp4videos);
    } else {
      const index = mp4videos.findIndex(x => x.label === defaultQuality);
      if (index >= 0) {
        return mp4videos[index];
      } else {
        return chooseHighest(mp4videos);
      }
    }
  }
};

const parseAttachment = (asset, isSupplementary = false) => {
  let attachmentId = asset.id || -1;
  let downloadUrl = "";
  let mime = "";
  let type = asset['asset_type'].toLowerCase();
  let content = '';
  if (!isSupplementary) {
    switch (asset['asset_type']) {
      case "Video":
        // console.log(asset);
        // console.log("Picked", qualityPicker(asset));
        const picked = qualityPicker(asset);
        if (picked) {
          mime = picked.type;
          downloadUrl = picked.src;
        }
        break;
      case "Article":
        content = asset['body'];
        break;
      default:
        console.log("Warning asset type " + asset['asset_type']);
        console.log(asset);
        console.log("---------------------");
        break;
    }
  } else {
    downloadUrl = asset['download_urls'][asset['asset_type']][0].file;
  }
  return {
    id: attachmentId,
    name: asset.filename,
    timeEstimation: asset['time_estimation'],
    type,
    mime: mime,
    content,
    originalObject: asset,
    downloadUrl
  };
};

export const parseUdemyDownload = async (lectureInfo) => {
  // console.log(lectureInfo);
  const downloads = [];
  const asset = lectureInfo['asset'] || {};
  const supplementaryAssets = lectureInfo['supplementary_assets'] || [];
  if (asset) {
    downloads.push(parseAttachment(asset));
  } else {
    console.log("asset not found", lectureInfo);
    return null;
  }
  if (supplementaryAssets && supplementaryAssets.length > 0) {
    console.log("lecture has supplementary assets.", supplementaryAssets);
    for (const asset1 of supplementaryAssets) {
      downloads.push(parseAttachment(asset1, true));
    }
  }
  addDownloadTask(downloads);
}
