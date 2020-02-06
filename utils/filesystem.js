const fs = require("fs");
const logger = require("./logger");

var lg = new logger();

class filesystem {
  async deleteFile(filePath) {
    fs.unlink(filePath, err => {
      //if (err) throw err;
      lg.verboseLogForced("Successfully deleted file: " + filePath);
    });
  }

  async deleteFolder(folderPath) {
    fs.rmdir(folderPath, { recursive: false }, err => {
      //if (err) throw err;
      lg.verboseLogForced("Successfully deleted folder: " + folderPath);
    });
  }

  async deleteFolderRecursively(folderPath) {
    fs.rmdir(folderPath, { recursive: true }, err => {
      //if (err) throw err;
      lg.verboseLogForced(
        "Successfully deleted folder(s) recursively: " + folderPath
      );
    });
  }

  async createFolder(folderPath) {
    lg.verboseLogForced("Creating folder: " + folderPath);
    fs.mkdir(folderPath, { recursive: false }, err => {
      //if (err) throw new Error(err);
      lg.verboseLogForced("Successfully created folder: " + folderPath);
    });
  }

  async createFolderRecursively(folderPath) {
    fs.mkdir(folderPath, { recursive: true }, err => {
      //if (err) throw err;
      lg.verboseLogForced(
        "Successfully created folder(s) recursively: " + folderPath
      );
    });
  }

  async renameFile(srcFile, tgtFile) {
    fs.rename(srcFile, tgtFile, err => {
      //if (err) throw err;
      lg.verboseLogForced("renamed complete");
    });
  }
}

module.exports = filesystem;
