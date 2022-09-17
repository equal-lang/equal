const { app, BrowserWindow, Tray, nativeImage, Menu } = require("electron");
const path = require("path");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  })
  win.setIcon("./public/assets/logo.png");
  win.loadFile("./public/index.html");
}

app.whenReady()
.then(() => {
  createWindow();
  // macOS
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  })
})
.then(() => {
  const appMenu = Menu.buildFromTemplate([
    // TODO: add functions and shortcuts
    {
      label: "&File",
      role: "fileMenu",
      submenu: [
        {
          label: "New File",
          accelerator: "CommandOrControl+N",
          click: (menuItem, browserWindow, event) => {
            console.log("New File");
          }
        },
        {
          label: "Open...",
          accelerator: "CommandOrControl+O",
          click: (menuItem, browserWindow, event) => {
            console.log("Open File");
          }
        },
        {
          type: "separator",
        },
        {
          label: "Save",
          accelerator: "CommandOrControl+S",
          click: (menuItem, browserWindow, event) => {
            console.log("Save");
          }
        },
        {
          label: "Save As...",
          accelerator: "CommandOrControl+Shift+S",
          click: (menuItem, browserWindow, event) => {
            console.log("Save As...");
          }
        },
        {
          type: "separator",
        },
        {
          label: "New Window",
          accelerator: "CommandOrControl+Shift+N",
          click: (menuItem, browserWindow, event) => {
            console.log("New Window");
          }
        },
        {
          label: "Close Window",
          role: "close"
        },
        {
          type: "separator",
        },
        {
          // only different from close on macOS
          label: "Quit",
          role: "quit"
        },
      ]
    },
    {
      label: "Edit",
      role: "editMenu",
      submenu: [

      ]
    },
    {
      label: "View",
      role: "viewMenu",
      submenu: [

      ]
    },
    {
      label: "Help",
      role: "help",
      submenu: [

      ]
    }
  ])
  Menu.setApplicationMenu(appMenu);
})
.then(() => {
  // TODO: change tray menu
  let tray = new Tray(nativeImage.createFromPath("./assets/logo.png"));
  const trayMenu = Menu.buildFromTemplate([
    { label: "Launch Interpreter", type: "normal"}
  ])
  tray.setToolTip("Equal Zero");
  tray.setTitle("Equal Zero");
  tray.setContextMenu(trayMenu);
})
.catch((err) => {

})

app.on("window-all-closed", () => {
  // windows or linux
  if (process.platfrom !== "darwin") {
    app.quit();
  }
})