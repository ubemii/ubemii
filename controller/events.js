const {BrowserWindow} = require("electron");
const {createWindow, createLoginWindow, createCourseWindow} = require("./screens");
const {GetLoginState} = require("./utils");
const { ipcMain } = require('electron');
const {GetSubscribedCourses, GetSubscribedInstructors, GetSubscribedCourseCategories, GetCourseDetail,
  GetCourseChapters
} = require("./Ubemii");

const ipcListeners = () => {
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
  ipcMain.on('getCourseChapters', async (event, courseId) => {
    const response = await GetCourseChapters(courseId);
    event.returnValue = response.data;
  });
  ipcMain.on('openCourse', async (event, courseURL) => {
    createCourseWindow(courseURL);
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
