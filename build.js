const packager = require("electron-packager");
const installer = require("electron-winstaller");
const fs = require("fs").promises;

packager({
  "dir": ".",
  "out": "./package",
  "name": "equal",
  // "ignore": /node_modules/
}).then(() => {
  fs.rename("./package/equal-win32-x64", "./package/equal");
}).then(() => {
  installer.createWindowsInstaller({
    appDirectory: "./package/equal",
    outputDirectory: "./dist",
    authors: "Hechen Liu",
    description: "Interpreter for Equal Language"
  });
})
.catch((e) => {
  console.log(e)
})




