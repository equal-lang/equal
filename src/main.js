const { app, BrowserWindow, Tray, nativeImage, Menu, ipcMain } = require("electron");
const path = require("path");
const { File } = require("./file.js");

const createWindow = () => {
  
  const win = new BrowserWindow({
    // height: 900,
    // width: 800,
    webPreferences: {
      preload: path.join(__dirname, "./preload.js"),
    },
  })

  win.setIcon(path.join(__dirname, "../public/assets/icon.png"));
  win.loadFile(path.join(__dirname, "../electron-build/index.html"));
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
})
.then(() => {
  const file = new File();
  ipcMain.on("set-value", (_event, val) => {
    file.setSource(val);
  })
  const appMenu = Menu.buildFromTemplate([
    {
      label: "&File",
      role: "fileMenu",
      submenu: [
        // {
        //   label: "New File",
        //   accelerator: "CommandOrControl+N",
        //   click: file.newFile
        // },
        // {
        //   label: "Open File...",
        //   accelerator: "CommandOrControl+O",
        //   click: file.openFile
        // },
        // { type: "separator" },
        // {
        //   label: "Save",
        //   accelerator: "CommandOrControl+S",
        //   click: file.save
        // },
        // {
        //   label: "Save As...",
        //   accelerator: "CommandOrControl+Shift+S",
        //   click: file.saveAs
        // },
        // { type: "separator" },
        {
          label: "Close",
          role: "close",
          accelerator: "CommandOrControl+W",
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
      label: "&Edit",
      role: "editMenu",

    },
    {
      label: "&Run",
      submenu: [
        {
          label: "Run Interpreter",
          // accelerator: "F5",
          click: file.run
        },
        // {
        //   label: "Run in Verbose Mode",
        //   accelerator: "Shift+F5",
        //   click: file.runVerbose
        // },
        {
          label: "Run from File",
          click: file.runFromFile
        }
      ]
    },
    {
      label: "&Tools",
      // role: "help",
      submenu: [
        // html linter
        // js transpiler
        // view actual webpage
        // tabs?
      ]
    },
    {
      label: "&Help",
      role: "help",
      submenu: [
        { role: "toggleDevTools" }
      ]
    }
  ])
  Menu.setApplicationMenu(appMenu);
})
.catch((err) => {
  console.error(err);
})

app.on("window-all-closed", () => {
  // windows or linux
  if (process.platfrom !== "darwin") {
    app.quit();
  }
})