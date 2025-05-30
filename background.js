const { app, BrowserWindow } = require('electron')
const { join } = require('path')
const ipcMain = require('electron').ipcMain

// 屏蔽安全警告
// ectron Security Warning (Insecure Content-Security-Policy)
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

const createWindow = () => {
    const win = new BrowserWindow({
        // 窗口图标
        icon: join(__dirname, 'resource/shortcut.ico'),
        width: 1000,
        height: 625,
        minWidth: 1000,
        minHeight: 625,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    })

    // development模式
    if(process.env.VITE_DEV_SERVER_URL) {
        win.loadURL(process.env.VITE_DEV_SERVER_URL)
        // 开启调试台
        win.webContents.openDevTools()
    }else {
        win.loadFile(join(__dirname, 'dist/index.html'))
    }

    ipcMain.on('window-max', function() {
        if (win.isMaximized()) {
            win.restore();
        } else {
            win.maximize();
        }
    })

    ipcMain.on('window-min', function() {
        win.minimize();
    })

    ipcMain.on('window-close', function() {
        win.close();
    })
}

app.whenReady().then(() => {
    createWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

