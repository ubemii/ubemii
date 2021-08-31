import {getData, setData} from "./StorageService";

const electron = window.require("electron")

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
export const getCourseLectures = async (courseId, forceReload = false) => {
  let lectures = [];
  const lectureInfo = getData('lectures-' + courseId, null);
  const reloadLectures = () => {
    console.log("Must reload lectures");
    const response = electron.ipcRenderer.sendSync("getCourseLectures", courseId);
    lectures = response.results || [];
    setData('lectures-' + courseId, {
      lastUpdated: new Date().getTime(),
      lectures: lectures
    });
  }
  if (!lectureInfo || forceReload) {
    reloadLectures();
  } else {
    // will be cached for 24 hours.
    if ((new Date().getTime() - lectureInfo.lastUpdated) > 24 * 3600 * 1000) {
      reloadLectures();
    } else {
      lectures = lectureInfo.lectures;
    }
  }

  return lectures;
}

export const openCourse = async (courseId) => {
  return electron.ipcRenderer.send("openCourse", courseId);
}
