const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  onWindowResize: (callback) => {
    ipcRenderer.on("window-resize", callback);
  },
  onExecuteEqual: (val) => ipcRenderer.on("execute-equal", val),
  onInput: (input) => ipcRenderer.send("input", input)
})