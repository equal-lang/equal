const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  onWindowResize: (callback) => {
    ipcRenderer.on("window-resize", callback);
  },
  onExecuteEqual: (val) => ipcRenderer.on("execute-equal", val),
  onOpenFile: (val) => ipcRenderer.on("open-file", val),
  setValue: (val) => ipcRenderer.send("set-value", val)
})