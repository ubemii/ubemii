const {BrowserWindow} = require("electron");
const {createWindow, createLoginWindow, createCourseWindow} = require("./screens");
const {GetLoginState} = require("./utils");
const { ipcMain } = require('electron');
const {GetSubscribedCourses, GetSubscribedInstructors, GetSubscribedCourseCategories, GetCourseDetail,
  GetCourseLectures, GetUdemyToken, UdemyApi,
} = require("./Ubemii");
const {download} = require("./downloader");
const {session} = require("electron");

const ipcListeners = () => {
  ipcMain.on('UdemyApi', async (event, arg) => {
    console.log(typeof arg, arg);
    const response = await UdemyApi(arg);
    event.returnValue = response.data;
  });
  ipcMain.on('getSubscribedCourses', async (event, arg) => {
    const response = await GetSubscribedCourses();
    event.returnValue = response.data;
  });
  ipcMain.on('getSubscribedInstructors', async (event, arg) => {
    const response = await GetSubscribedInstructors();
    event.returnValue = response.data;
  });
  ipcMain.on('getSubscribedCourseCategories', async (event, arg) => {
    const response = await GetSubscribedCourseCategories();
    event.returnValue = response.data;
  });
  ipcMain.on('getCourseDetail', async (event, courseId) => {
    const response = await GetCourseDetail(courseId);
    event.returnValue = response.data;
  });
  ipcMain.on('getCourseLectures', async (event, courseId) => {
    const response = await GetCourseLectures(courseId);
    event.returnValue = response.data;
  });
  ipcMain.on('getToken', async (event, courseId) => {
    const response = await GetUdemyToken();
    event.returnValue = response;
  });
  ipcMain.on('openCourse', async (event, courseURL) => {
    createCourseWindow(courseURL);
  });
  ipcMain.on('addDownloadTask', async (event, tasks) => {
    download(tasks[0]);
  });
};

const waitLoginStateChange = () => {
  return new Promise(_ => {
    const checkInterval = setInterval(() => {
      GetLoginState().then(state => {
        if (state) {
          clearInterval(checkInterval);
          _();
        }
      });
    }, 500);
  });
}

const bind = async (app) => {
  await app.whenReady();
  // after app's state has changed to ready
  // -> check the login state
  const loginState = await GetLoginState();
  if (!loginState) {
    const loginWindow = createLoginWindow();
    await waitLoginStateChange();
    loginWindow.close();
  }

  const mainWindow = createWindow();
  ipcListeners();
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
};

module.exports = bind;
