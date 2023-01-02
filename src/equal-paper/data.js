import * as domTools from "./dom";

class EditorData {
  #fileHandle;
  #unsaved;
  #savedTime;

  constructor(fileHandle=undefined, unsaved=false, savedTime=undefined) {
    this.#fileHandle = fileHandle;
    this.#unsaved = unsaved;
    this.#savedTime = savedTime;
  }

  #updateToolbarFile() {
    // need toolbar id
    domTools.setupToolbarFile(this.#fileHandle == undefined ? undefined : this.#fileHandle.name, this.#unsaved);
  }

  getFileHandle() {
    return this.#fileHandle;
  };

  getUnsaved() {
    return this.#unsaved;
  };

  saved() {
    this.#unsaved = false;
    this.#savedTime = Date.now();
    this.#updateToolbarFile();
  };

  notSaved() {
    this.#unsaved = true;
    this.#updateToolbarFile();
  };

  setFileHandle(handle) {
    this.#fileHandle = handle;
  };

  newVersion(fileModifiedTime) {
    // changed since last saved, giving 1000ms for the file to write
    return (fileModifiedTime > (this.#savedTime + 1000));
  }
}

export { EditorData };
