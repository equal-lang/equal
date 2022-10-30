const { app, BrowserWindow, Tray, nativeImage, Menu, ipcMain } = require("electron");
const path = require("path");
const { newFile, openFile, save, saveAs, run } = require("./file.js");
const { runMain } = require("module");

const createWindow = () => {
  
  const win = new BrowserWindow({
    // height: 900,
    // width: 800,
    webPreferences: {
      preload: path.join(__dirname, "./preload.js"),
    },
  })

  win.setIcon(path.join(__dirname, "../public/assets/icon.png"));
  win.loadFile(path.join(__dirname, "../build/index.html"));
  win.on("resize", () => {
    
    win.webContents.send("window-resize");

  })
}

app.whenReady()
.then(() => {
  createWindow();
  // macOS
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  })
  ipcMain.on("input", (val) => {
    console.log(val);
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
            newFile();
          }
        },
        {
          label: "Open File...",
          accelerator: "CommandOrControl+O",
          click: (menuItem, browserWindow, event) => {
            openFile();
          }
        },
        {
          type: "separator",
        },
        {
          label: "Save",
          accelerator: "CommandOrControl+S",
          click: (menuItem, browserWindow, event) => {
            save();
          }
        },
        {
          label: "Save As...",
          accelerator: "CommandOrControl+Shift+S",
          click: (menuItem, browserWindow, event) => {
            saveAs();
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
          role: "quit",
          accelerator: "Alt+F4",

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
        {
          role: "toggleDevTools"
          
        }

      ]
    },
    {
      label: "Run",
      submenu: [
        {
          label: "Run Interpreter",
          accelerator: "F5",
          click: run
        }

      ]
    },
    {
      label: "Help",
      role: "help",
      submenu: [

      ]
    },
    {
      label: "Tools",
      // role: "help",
      submenu: [
// html linter
// js transpiler
// view actual webpage
// tabs?
      ]
    }
  ])
  Menu.setApplicationMenu(appMenu);
})
.then(() => {
  // TODO: change tray menu
  let tray = new Tray(nativeImage.createFromPath(path.join(__dirname, "../public/assets/logo.png")));
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