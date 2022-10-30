const { dialog } = require("electron");
// TO CHANGE
const { Equal } = require("../cli-build/equal/equal");

function newFile() {
  console.log("New File");
}

function openFile() {
  // window.electronAPI.openFile()
  // .then()
  console.log("Open File...");
}

function save() {
  console.log("Save");
}

function saveAs() {
  console.log("Save As...");
}

function run(menuItem, browserWindow, event) {
    dialog.showOpenDialog({properties: ["openFile"] })
    .then((res) => {
      if (res.canceled == false) {
        browserWindow.webContents.send("execute-equal", new Equal(res.filePaths[0], "NORMAL").run());
      }
    })
    .catch((err) => {
      console.error(err);
    })
  }

module.exports = {
  newFile, openFile, save, saveAs, run
}