'use strict';
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const env = process.env.NODE_ENV || 'development';
global.__DEV__ = env !== 'production';

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700
  });

  if (__DEV__) {
    mainWindow.loadURL('file://' + __dirname + '/index-dev.html');
  } else {
    mainWindow.loadURL('file://' + __dirname + '/index.html');
  }

  // mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
