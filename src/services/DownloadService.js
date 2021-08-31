const defaultQuality = "480";

const addDownloadTask = () => {

};

const getPendingTasks = () => {

}

const qualityPicker = (video) => {
  // this is an array that contains all media sources.
  const mediaSources = video['media_sources'];
  // based on type (mime type), filter mp4 (not encrypted) videos
  const mp4videos = mediaSources.filter(x => x.type === "video/mp4");
  if (mp4videos.length === 0) {
    // here the magic comes. the most complex part and fucking hard
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
  if (!isSupplementary) {
    switch (asset['asset_type']) {
      case "Video":
        // console.log(asset);
        // console.log("Picked", qualityPicker(asset));
        const picked = qualityPicker(asset);
        if (picked) downloadUrl = picked.src;
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
  console.log("=> ", {
    id: attachmentId,
    name: asset.filename,
    timeEstimation: asset['time_estimation'],
    downloadUrl
  });
};

export const parseUdemyDownload = async (lectureInfo) => {
  // console.log(lectureInfo);
  const asset = lectureInfo['asset'] || {};
  const supplementaryAssets = lectureInfo['supplementary_assets'] || [];
  if (asset) {
    parseAttachment(asset);
  } else {
    console.log("asset not found", lectureInfo);
    return null;
  }
  if (supplementaryAssets && supplementaryAssets.length > 0) {
    console.log("lecture has supplementary assets.", supplementaryAssets);
    supplementaryAssets.forEach(asset => {
      parseAttachment(asset, true);
    });
  }
}
