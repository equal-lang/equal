import "./equal-paper.css";
import toolbar from "./toolbar.hbs";
import toolbarFile from "./toolbar-file.hbs";

// open file: change filehandle, set unsaved to false
// file edited: set unsaved to true
// save file: set unsaved to false
// new file?
// if path not set, redirect to save-file-as
// file changing in another place - like notepad, will not refresh?
// deleted - created again
// now - lose all data on refresh
// modifiedtime 
// creating

document.addEventListener("DOMContentLoaded", () => {
  setupToolbar();
  const editorFile = editorData();

  const trueColor = "rgb(212, 245, 198)";
  const falseColor = getBackgroundColor("tool-help");

  document.getElementById("tool-open-file").addEventListener("click", () => {
    openFile()
      .then((fileHandle) => {
        editorFile.setFileHandle(fileHandle);
        return getTextFromFileHandle(fileHandle);
      })
      .then((text) => {
        setEditorValue(text);
      })
      .catch(catchError);
  })


  document.getElementById("tool-save-file").addEventListener("click", () => {
    if (editorFile.getFileHandle() !== undefined) {
      save(editorFile, getEditorValue());
    } else {
      saveAs();
    }
  })

  // document.getElementById("tool-save-file-as").addEventListener("click", () => {
  //   console.log("sfa");
  // })

  document.getElementById("tool-run").addEventListener("click", () => {
    let runEq = new Promise((resolve, reject) => {
      let verbose = false;
      if (getBackgroundColor("tool-verbose") == trueColor) verbose = true;
      runEqual(getEditorValue(), verbose);
      resolve(verbose);
      reject();
    });
    runEq
      .then((verbose) => {
        if (verbose) console.debug("Finished running script");
      })
      .catch(catchError)
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

  document.getElementById("tool-help").addEventListener("click", () => {
    if (confirm("This action will open a new tab. Proceed?")) {
      window.open("https://github.com/equal-lang/equal#readme");
    }
  })

  document.addEventListener("editor-change", (val) => {
    if (val.detail.docChanged) {
      editorFile.notSaved();
    }
  })

})

function setupToolbar() {
  document.getElementById("toolbar").innerHTML = toolbar({
    tools: [
      // {
      //   name: "new-file",
      //   display: "new-file"
      // },
      {
        name: "open-file",
        display: "open-file"
      },
      {
        name: "save-file",
        display: "save"
      },
      // {
      //   name: "save-file-as",
      //   display: "save-as"
      // },
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

const editorData = (function () {
  let fileHandle = undefined;
  let unsaved = false;
  let savedTime = undefined;

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
      this.updateToolbarFile();
    },
    notSaved() {
      unsaved = true;
      this.updateToolbarFile();
    },
    setFileHandle(handle) {
      fileHandle = handle;
    },
    newVersion(fileModifiedTime) {
      // changed since last saved, giving 1000ms for the file to write
      return (fileModifiedTime > (savedTime + 1000));
    },
    updateToolbarFile() {
      setupToolbarFile(fileHandle.name, unsaved);
    }
  }
});

// return promise
function openFile() {
  const fileOptions = {
    types: [
      {
        description: "Equal Files",
        accept: {
          "text/plain": [".eq", ".txt"],
          "text/html": [".html"]
        }
      },
    ],
    excludeAcceptAllOption: true,
    multiple: false
  }

  return window.showOpenFilePicker(fileOptions)
    .then((fileHandles) => {
      return fileHandles[0];
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

function save(editorInfo, value) {
  editorInfo.getFileHandle().getFile()
  .then((file) => {
    let proceed = true;
    if (editorInfo.newVersion(file.lastModified)) {
      proceed = confirm("A newer version of the currently open file exists, which will be overwritten by this operation. Proceed?");
    }
    if (proceed) {
      editorInfo.getFileHandle().createWritable()
      .then((stream) => {
        stream.write(value);
        return stream;
      })
      .then((stream) => {
        stream.close();
        editorInfo.saved();
      })
      .catch(catchError)
    }
  })
  
}

function saveAs() {
  
}

function getEditorValue() {
  return editor.editor.viewState.state.doc.toString();
}

function setEditorValue(val) {
  editor.editor.dispatch({
    changes: [{ from: 0, to: editor.editor.state.doc.length, insert: val }]
  })
}

function runEqual(source, verbose = false) {
  new equal.Equal({
    mode: verbose ? "VERBOSE" : "NORMAL",
    source: source,
    output: (str) => logConsole(str)
  }).run();
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