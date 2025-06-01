"use strict";
const { app, BrowserWindow } = require("electron");
const { join } = require("path");
const electron = require("electron");
const ipcMain = electron.ipcMain;
const dialog = electron.dialog;
const mm = require("music-metadata");
const fs = require("fs");
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";
const createWindow = () => {
  const win = new BrowserWindow({
    // 窗口图标
    icon: join(__dirname, "assets/icon.jpg"),
    width: 1e3,
    height: 625,
    minWidth: 1e3,
    minHeight: 625,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false
    }
  });
  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
    win.webContents.openDevTools();
  } else {
    win.loadFile(join(__dirname, "dist/index.html"));
  }
  ipcMain.on("window-max", function() {
    if (win.isMaximized()) {
      win.restore();
    } else {
      win.maximize();
    }
  });
  ipcMain.on("window-min", function() {
    win.minimize();
  });
  ipcMain.on("window-close", function() {
    win.close();
  });
  ipcMain.on("open-file-dialog", async (event) => {
    const { filePaths } = await dialog.showOpenDialog(win, {
      title: "请选择音频文件",
      filters: [
        { name: "music", extensions: ["mp3", "wav", "aac", "flac", "ogg"] }
      ]
    });
    if (filePaths.length > 0) {
      const selectedFilePath = filePaths[0];
      const file = await mm.parseFile(selectedFilePath);
      const stat = fs.statSync(selectedFilePath);
      event.reply("selected-file", selectedFilePath, file, stat.size);
    }
  });
};
app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
