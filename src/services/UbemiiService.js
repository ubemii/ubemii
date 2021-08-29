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
