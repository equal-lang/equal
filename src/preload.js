const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  onWindowResize: (callback) => {
    ipcRenderer.on("window-resize", callback);
  }
})