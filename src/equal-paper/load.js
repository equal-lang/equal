import "./equal-paper.css";
import { EditorData } from "./data";
import * as domFunctions from "./dom";

// set const variables and pass in

document.addEventListener("DOMContentLoaded", () => {
  const editorData = new EditorData();

  const toolbarObj = {
    tools: [
      { name: "new-file",
        display: "new-file" },
      { name: "open-file",
        display: "open-file" },
      { name: "save-file",
        display: "save" },
      { name: "save-file-as",
        display: "save-as" },
      { name: "run",
        display: "run" },
      { name: "verbose",
        display: "verbose" },
      { name: "clear-console",
        display: "clear-console" },
      { name: "html-viewer",
        display: "view-page", },
      { name: "html-refresh",
        display: "refresh-page", },
      { name: "help",
        display: "help" }
    ]
  };
  domFunctions.setupToolbar("toolbar", toolbarObj);
  domFunctions.setupToolbarFile("toolbar-file");

  const trueColor = "rgb(212, 245, 198)";
  const falseColor = domFunctions.getBackgroundColor("tool-help");

  document.getElementById("tool-new-file").addEventListener("click", () => {
    editorData.setFileHandle(undefined);
    editorData.notSaved();
    domFunctions.setEditorValue("");
  })

  document.getElementById("tool-open-file").addEventListener("click", () => {
    openFile(editorData);
  })

  document.getElementById("tool-save-file").addEventListener("click", () => {
    if (editorData.getFileHandle() !== undefined) {
      save(editorData, domFunctions.getEditorValue());
    } else {
      saveAs(editorData, domFunctions.getEditorValue());
    }
  })

  document.getElementById("tool-save-file-as").addEventListener("click", () => {
    saveAs(editorData, domFunctions.getEditorValue());
  })

  document.getElementById("tool-run").addEventListener("click", () => {
    let verbose = false;
    if (domFunctions.getBackgroundColor("tool-verbose") == trueColor) verbose = true;
    const source = {
      "mode": verbose,
      "source": domFunctions.getEditorValue()
    }
    
    // env variable
    // port 8000: default port for API when port not provided by heroku (local development)
    const apiUrl = ((window.location.origin == "http://localhost:8080") ? "http://localhost:8000/api/v0" : "https://equal-lang.herokuapp.com/api/v0");
    fetch(apiUrl, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(source)
    })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      domFunctions.logConsole("console", res);
    })
    .catch(catchError);
  })

  // log verbose in this console?
  document.getElementById("tool-verbose").addEventListener("click", () => {
    domFunctions.toggleBackground("tool-verbose", trueColor, falseColor);
  })

  document.getElementById("tool-clear-console").addEventListener("click", () => {
    domFunctions.clearConsole("console");
  })

  function renderHTML(html) {
    domFunctions.renderHTML(html, "main-grid", "45vh 50vh", "html-rendered");
  }

  function hideHTML() {
    domFunctions.hideHTML("main-grid", "95vh", "html-rendered");
  }

  // detect state because state can be changed
  document.getElementById("tool-html-viewer").addEventListener("click", () => {
    if (domFunctions.isVisible("html-rendered")) {
      domFunctions.setBackgroundColor("tool-html-viewer", falseColor);
      hideHTML();
    }
    else {
      domFunctions.setBackgroundColor("tool-html-viewer", trueColor);
      renderHTML(domFunctions.getEditorValue());
    }
  })

  document.getElementById("tool-html-refresh").addEventListener("click", () => {
    if (domFunctions.isVisible("html-rendered")) {
      renderHTML(domFunctions.getEditorValue());
    }
  })

  document.getElementById("tool-help").addEventListener("click", () => {
    if (confirm("This action will open a new tab. Proceed?")) {
      window.open("https://github.com/equal-lang/equal#readme");
    }
  })

  document.addEventListener("editor-change", (val) => {
    const {viewUpdate, fileOpened} = val.detail;
    if (fileOpened) editorData.saved();
    else if (viewUpdate.docChanged && editorData.getUnsaved() == false) {
      editorData.notSaved();
    }
  })

})


const acceptedFileTypes = [
  { 
    description: "Equal file",
    accept: {
      "text/equal": [".eq"]
    }
  },
  { 
    description: "HTML file",
    accept: {
      "text/html": [".html"]
    }
  },
  { 
    description: "Plain text file",
    accept: {
      "text/plain": [".txt"],
    }
  },
];

// return promise
function openFile(editorData) {
  const fileOptions = {
    types: acceptedFileTypes,
    excludeAcceptAllOption: true,
    multiple: false
  }
  return window.showOpenFilePicker(fileOptions)
    .then((fileHandles) => {
      return fileHandles[0];
    })
    .then((fileHandle) => {
      editorData.setFileHandle(fileHandle);
      return getTextFromFileHandle(fileHandle);
    })
    .then((text) => {
      domFunctions.setEditorValue(text, "open.file");
    })
    .catch(catchError);
}

// return promise
function getTextFromFileHandle(fileHandle) {
  return fileHandle.getFile()
    .then((file) => {
      return file.text();
    });
}

// check if a newer version than the one currently opened exists
// write and save if checked and given permission
function save(editorData, value) {
  editorData.getFileHandle().getFile()
  .then((file) => {
    let proceed = true;
    if (editorData.newVersion(file.lastModified)) {
      proceed = confirm("A newer version of the currently open file exists, which will be overwritten by this operation. Proceed?");
    }
    if (proceed) {
      editorData.getFileHandle().createWritable()
      .then((stream) => {
        stream.write(value);
        return stream;
      })
      .then((stream) => {
        stream.close();
        editorData.saved();
      })
      .catch(catchError)
    }
  })
}

// get and save file handle
// overwrite and save
function saveAs(editorData, value) {
  return window.showSaveFilePicker({
    types: acceptedFileTypes
  })
  .then((fileHandles) => {
    return fileHandles;
  })
  .then((fileHandle) => {
    editorData.setFileHandle(fileHandle);
    return fileHandle.createWritable();
  })
  .then((stream) => {
    stream.write(value);
    return stream;
  })
  .then((stream) => {
    stream.close();
    editorData.saved();
  })
  .catch(catchError);
}

function catchError(err) {
  console.error(err);
}