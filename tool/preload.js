const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
    saveEntry: (payload) => ipcRenderer.invoke("entry.save", payload),
    getByUcode: (ucode) => ipcRenderer.invoke("entry.getByUcode", ucode),
    loadList: (keyword) => ipcRenderer.invoke("list.load", keyword),
    exportTomlByRadical: () => ipcRenderer.invoke("export.toml.byRadical")
});