const {BrowserWindow} = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
  });
  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, "..", "build", "index.html")}`
  ).then(() => {
    console.log("UI loaded.");
  });
  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({mode: 'detach'});
  }
  return win;
}

const createLoginWindow = () => {
  const win = new BrowserWindow({
    width: 600,
    height: 800,
  });
  win.loadURL("https://www.udemy.com/join/login-popup/").then(() => {
    console.log("UI loaded.");
  });
  return win;
}

module.exports = {
  createWindow,
  createLoginWindow
}
