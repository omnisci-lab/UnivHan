const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { saveOrUpdateEntry, searchEntries } = require("./data-process");

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    win.loadFile("index.html");
}

const appDir = app.getAppPath();
const dataDir = path.join(path.dirname(appDir), "data");

app.whenReady().then(() => { createWindow(); });

ipcMain.handle("entry.save", async (_e, entry) => {
    saveOrUpdateEntry(dataDir, entry);
    return true;
});

ipcMain.handle('list.load', async (_e, keyword) => {
    const entries = searchEntries(dataDir, keyword);
    return entries;
});