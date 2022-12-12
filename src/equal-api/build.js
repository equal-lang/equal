const fs = require("fs-extra");
const path = require("path");

const exportFiles = ["./api.js", "./package.json", "./Procfile"];
const exportFolder = ["../../builds/equal"];
const exportPath = path.join(__dirname, "../../api-docs");

copyFiles(exportFiles, exportFolder, exportPath);

async function copyFiles(files, folders, newPath) {
  try {
    if (!fs.existsSync(newPath)) await fs.mkdir(newPath);
    for (let file in files) {
      let fileName = files[file].match(/\/([^\/]+)$/)[1];
      await fs.copyFile(path.join(__dirname, files[file]), path.join(newPath, fileName));
    }
    for (let folder in folders) {
      let folderName = folders[folder].match(/\/([^\/]+)\/*$/)[1];
      await fs.copy(path.join(__dirname, folders[folder]), path.join(newPath, folderName));
    }
    console.info("Built API at " + exportPath);

  } catch(err) {
    console.error(err);
  }
}
