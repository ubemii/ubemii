const electron = window.require("electron")


export const getSubscribedCourses = async (limit = 50) => {
  const response = electron.ipcRenderer.sendSync("getSubscribedCourses");
  console.log(response);
  return (response.results || []);
}
