const { dialog, ipcMain } = require("electron");

// TO CHANGE?
const { Equal } = require("../builds/equal/equal");
const fs = require("fs");

const startStr = "<div>Hello World</div>";
class File {
  constructor() {
    this.path = undefined;
    this.source = startStr;
    this.newFile = this.newFile.bind(this);
    this.openFile = this.openFile.bind(this);
    this.save = this.save.bind(this);
    this.saveAs = this.saveAs.bind(this);
    this.run = this.run.bind(this);
    this.runVerbose = this.runVerbose.bind(this);


  }
  

  newFile(menuItem, browserWindow, event) {
    console.log("Yet to be implemented");
  }
  
  openFile(menuItem, browserWindow, event) {

    dialog.showOpenDialog({properties: ["openFile"] })
    .then((res) => {
      if (res.canceled == false) {
        
        const path = res.filePaths[0];
        if (fs.existsSync(path)) {
          const source = fs.readFileSync(path, "utf8");
          this.path = path;
          this.source = source;
          browserWindow.webContents.send("open-file", source);
        }
      }
    })
    .catch((err) => {
      console.error(err);
    })
    console.log("Yet to be implemented");
  }
  
  save(menuItem, browserWindow, event) {
    console.log("Yet to be implemented");
  }
  
  saveAs(menuItem, browserWindow, event) {
    console.log("Yet to be implemented");
  }
  
  run(menuItem, browserWindow, event) {
    browserWindow.webContents.send("execute-equal", new Equal({path: this.path, mode: "NORMAL", source: this.source}).run());
  }
  
  
  runVerbose(menuItem, browserWindow, event) {
    browserWindow.webContents.send("execute-equal", new Equal({path: this.path, mode: "VERBOSE", source: this.source}).run());
  }

  runFromFile(menuItem, browserWindow, event) {
    dialog.showOpenDialog({properties: ["openFile"] })
    .then((res) => {
      if (res.canceled == false) {
        browserWindow.webContents.send("execute-equal", new Equal({path: res.filePaths[0]}).run());
      }
    })
    .catch((err) => {
      console.error(err);
    })
  }


  setSource(val) {
    this.source = val;
  }

}


module.exports = {
  File
}