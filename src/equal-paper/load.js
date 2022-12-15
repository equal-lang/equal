import "./equal-paper.css";
import toolbar from "./toolbar.hbs";
import toolbarFile from "./toolbar-file.hbs";

document.addEventListener("DOMContentLoaded", () => {
  setupToolbar();
  const mainEditorData = editorInit();
  const trueColor = "rgb(212, 245, 198)";
  const falseColor = getBackgroundColor("tool-help");

  document.getElementById("tool-new-file").addEventListener("click", () => {
    mainEditorData.setFileHandle(undefined);
    mainEditorData.notSaved();
    setEditorValue("");
  })

  document.getElementById("tool-open-file").addEventListener("click", () => {
    openFile(mainEditorData);
  })

  document.getElementById("tool-save-file").addEventListener("click", () => {
    if (mainEditorData.getFileHandle() !== undefined) {
      save(mainEditorData, getEditorValue());
    } else {
      saveAs(mainEditorData, getEditorValue());
      // set file handle
    }
  })

  document.getElementById("tool-save-file-as").addEventListener("click", () => {
    saveAs(mainEditorData, getEditorValue());
  })

  document.getElementById("tool-run").addEventListener("click", () => {
    let verbose = false;
    if (getBackgroundColor("tool-verbose") == trueColor) verbose = true;
    const source = {
      "mode": verbose,
      "source": getEditorValue()
    }
    // env variable
    const apiUrl = "https://equal-lang.herokuapp.com/api/v0";
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
      logConsole(res);
    })
    .catch(catchError);
  })

  // log verbose in this console?
  document.getElementById("tool-verbose").addEventListener("click", () => {
    toggleBackground("tool-verbose", trueColor, falseColor);
  })

  document.getElementById("tool-clear-console").addEventListener("click", () => {
    clearConsole();
  })

  // detect state because state can be changed
  document.getElementById("tool-html-viewer").addEventListener("click", () => {
    if (isVisible("html-rendered")) {
      setBackgroundColor("tool-html-viewer", falseColor);
      hideHTML();
    }
    else {
      setBackgroundColor("tool-html-viewer", trueColor);
      renderHTML(getEditorValue());
    }
  })

  document.getElementById("tool-html-refresh").addEventListener("click", () => {
    if (isVisible("html-rendered")) {
      renderHTML(getEditorValue());
    }
  })

  document.getElementById("tool-help").addEventListener("click", () => {
    if (confirm("This action will open a new tab. Proceed?")) {
      window.open("https://github.com/equal-lang/equal#readme");
    }
  })

  document.addEventListener("editor-change", (val) => {
    const {viewUpdate, fileOpened} = val.detail;
    if (fileOpened) mainEditorData.saved();
    else if (viewUpdate.docChanged && mainEditorData.getUnsaved() == false) {
      mainEditorData.notSaved();
    }
  })

})


function setupToolbar() {
  document.getElementById("toolbar").innerHTML = toolbar({
    tools: [
      {
        name: "new-file",
        display: "new-file"
      },
      {
        name: "open-file",
        display: "open-file"
      },
      {
        name: "save-file",
        display: "save"
      },
      {
        name: "save-file-as",
        display: "save-as"
      },
      {
        name: "run",
        display: "run"
      },
      {
        name: "verbose",
        display: "verbose"
      },
      {
        name: "clear-console",
        display: "clear-console"
      },
      {
        name: "html-viewer",
        display: "view-page",
      },
      {
        name: "html-refresh",
        display: "refresh-page",
      },
      {
        name: "help",
        display: "help"
      }
    ]
  });
  setupToolbarFile();
}

function setupToolbarFile(name="Untitled", unsaved=true) {
  document.getElementById("toolbar-file").innerHTML = toolbarFile({
    // make right justified?
    name: name,
    unsaved: unsaved
  })
}

const editorInit = (function () {
  let fileHandle = undefined;
  let unsaved = false;
  let savedTime = undefined;

  function updateToolbarFile() {
    setupToolbarFile(fileHandle == undefined ? undefined : fileHandle.name, unsaved);
  }

  return {
    getFileHandle() {
      return fileHandle;
    },
    getUnsaved() {
      return unsaved;
    },
    saved() {
      unsaved = false;
      savedTime = Date.now();
      updateToolbarFile();
    },
    notSaved() {
      unsaved = true;
      updateToolbarFile();
    },
    setFileHandle(handle) {
      fileHandle = handle;
    },
    newVersion(fileModifiedTime) {
      // changed since last saved, giving 1000ms for the file to write
      return (fileModifiedTime > (savedTime + 1000));
    }
  }
});

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
      setEditorValue(text, "open.file");
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

function getEditorValue() {
  return editor.editor.viewState.state.doc.toString();
}

function setEditorValue(val, userEvent=undefined) {
  let transaction = {
    changes: [{ from: 0, to: editor.editor.state.doc.length, insert: val }],
  };
  if (userEvent) transaction["userEvent"] = userEvent;
  editor.editor.dispatch(transaction);
}




function logConsole(val, endOfLine = "\n") {
  document.getElementById("console").innerText += val + endOfLine;
}

function clearConsole() {
  document.getElementById("console").innerText = "";
}

function isVisible(id) {
  const style = window.getComputedStyle(document.getElementById(id));
  return !(style["display"] == "none" || style["visibility"] == "hidden");
}

function renderHTML(html) {
  document.getElementsByClassName("main")[0].style["grid-template-rows"] = "10vh 45vh 40vh";
  const iframe = document.getElementById("html-rendered");
  // check for security
  iframe.setAttribute("srcdoc", html);
  document.getElementById("html-rendered").style.display = "block";
}

function hideHTML() {
  document.getElementsByClassName("main")[0].style["grid-template-rows"] = "10vh 85vh";
  document.getElementById("html-rendered").style.display = "none";
}

function toggleBackground(id, trueColor, falseColor) {
  if (getBackgroundColor(id) == trueColor) {
    setBackgroundColor(id, falseColor);
    return falseColor;
  }
  else {
    setBackgroundColor(id, trueColor);
    return trueColor;
  }
}

function getBackgroundColor(id) {
  return window.getComputedStyle(document.getElementById(id))["background-color"];
}

function setBackgroundColor(id, color) {
  document.getElementById(id).style["background-color"] = color;
}

function catchError(err) {
  console.error(err);
}