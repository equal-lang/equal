const { app, BrowserWindow, ipcMain, Tray, nativeImage, Menu } = require("electron");
const path = require("path");


const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  })
  ipcMain.handle("ping", () => "pong");
  win.setIcon("./logo.png");
  win.loadFile("index.html");
}

app.whenReady().then(() => {
  const icon = nativeImage.createFromPath("./logo.png");
  let tray = new Tray(icon);

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' }
  ])

  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)
}).then(() => {

  createWindow();

  app.on("activate", () => {
    // mac
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  })
})

app.on("window-all-closed", () => {
  // windows or linux
  if (process.platfrom !== "darwin") {
    app.quit();
  }
})