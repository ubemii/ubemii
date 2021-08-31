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
export const getCourseChapters = async (courseId, forceReload = false) => {
  let chapters = [];
  const chapterInfo = getData('chapters-' + courseId, null);
  const reloadChapters = () => {
    console.log("Must reload chapters");
    const response = electron.ipcRenderer.sendSync("getCourseChapters", courseId);
    chapters = response.results || [];
    setData('chapters-' + courseId, {
      lastUpdated: new Date().getTime(),
      chapters: chapters
    });
  }
  if (!chapterInfo || forceReload) {
    reloadChapters();
  } else {
    // will be cached for 24 hours.
    if ((new Date().getTime() - chapterInfo.lastUpdated) > 24 * 3600 * 1000) {
      reloadChapters();
    } else {
      chapters = chapterInfo.chapters;
    }
  }

  return chapters;
}

export const openCourse = async (courseId) => {
  return electron.ipcRenderer.send("openCourse", courseId);
}
