const electron = window.require("electron");
const axios = window.require("axios");
const UDEMY_API_BASE = "https://www.udemy.com/api-2.0";

export const getToken = () => {
  const response = electron.ipcRenderer.sendSync("getToken");
  return (response);
};

export const getSubscribedCourses = async (limit = 50) => {
  const response = electron.ipcRenderer.sendSync("getSubscribedCourses");
  return (response.results || []);
}

export const getSubscribedInstructors = async () => {
  const response = electron.ipcRenderer.sendSync("getSubscribedInstructors");
  return (response.results || []);
}

export const getSubscribedCourseCategories = async () => {
  const response = electron.ipcRenderer.sendSync("getSubscribedCourseCategories");
  return (response.results || []);
}

export const getCourseDetail = async (courseId) => {
  const response = electron.ipcRenderer.sendSync("getCourseDetail", courseId);
  return (response || {});
}

export const getLectureDetail = async (courseId, lectureId) => {
  const params = `fields[lecture]=asset,description,download_url,is_free,last_watched_second&fields[asset]=asset_type,length,media_license_token,course_is_drmed,media_sources,captions,thumbnail_sprite,slides,slide_urls,download_urls`;
  const response = axios.get(`https://www.udemy.com/api-2.0/users/me/subscribed-courses/${courseId}/lectures/${lectureId}/?${params}`);
  return (response.data);
}

export const getCourseLectures = async (courseId, forceReload = false) => {
  // let lectures = [];
  // const lectureInfo = getData('lectures-' + courseId, null);
  // const reloadLectures = () => {
  //   console.log("Must reload lectures");
  //   const response = electron.ipcRenderer.sendSync("getCourseLectures", courseId);
  //   lectures = response.results || [];
  //   setData('lectures-' + courseId, {
  //     lastUpdated: new Date().getTime(),
  //     lectures: lectures
  //   });
  // }
  // if (!lectureInfo || forceReload) {
  //   reloadLectures();
  // } else {
  //   // will be cached for 1 hour.
  //   if ((new Date().getTime() - lectureInfo.lastUpdated) > 3600 * 1000) {
  //     lectureInfo();
  //   } else {
  //     lectures = lectureInfo.lectures;
  //   }
  // }
  // return lectures;
  const params = `fields[asset]=results,title,external_url,time_estimation,download_urls,slide_urls,filename,asset_type,captions,media_license_token,course_is_drmed,media_sources,stream_urls,body&fields[chapter]=object_index,title,sort_order&fields[lecture]=id,title,object_index,asset,supplementary_assets,view_html&page_size=10000`;
  const response = await udemyApi({
    method: "get",
    url: UDEMY_API_BASE + `/courses/${courseId}/cached-subscriber-curriculum-items/?` + params
  });
  return response.results;
}

export const udemyApi = (options) => {
  return electron.ipcRenderer.sendSync("UdemyApi", options);
};

export const openCourse = async (courseId) => {
  return electron.ipcRenderer.send("openCourse", courseId);
}
