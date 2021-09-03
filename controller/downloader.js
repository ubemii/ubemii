const mpdParser = require("mpd-parser");
const axios = require("axios");
const {GetUdemyToken} = require("./Ubemii");
const {GetCookieString} = require("./utils");
const defaultQuality = "480";

const download = async (file) => {
  // this is an array that contains all media sources.
  const token = await GetUdemyToken();
  if (file.mime === "video/mp4") {

  } else if (file.mime === "application/dash+xml") {
    axios.get(file.downloadUrl, {
      headers: {
        "cookie": await GetCookieString(),
        "authorization": "Bearer " + token,
        "x-udemy-authorization": "Bearer " + token,
        "origin": "https://www.udemy.com",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) ubemii/2.1.2 Chrome/91.0.4472.164 Electron/13.2.3 Safari/537.36"
      }
    }).then(response => {
      const mpdManifest = mpdParser.parse(response.data, {
        manifestUri: file.downloadUrl
      });
      console.log(mpdManifest);
    }).catch(console.error);
  }
}

module.exports = {
  download
}
