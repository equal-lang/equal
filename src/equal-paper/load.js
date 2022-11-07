import { equalMode } from "../../cli-build/equal/utils";
import "./equal-paper.css";
import toolbar from "./toolbar.hbs";

// set css for editor
// attach listeners
document.addEventListener("DOMContentLoaded", () => {
  setupToolbar();

  const trueColor = "rgb(212, 245, 198)";
  // should be hard to manipulate at this moment in time
  const falseColor = getBackgroundColor("tool-help");

  document.getElementById("tool-open-file").addEventListener("click", () => {
    console.log("of");
  })

  
  document.getElementById("tool-save-file").addEventListener("click", () => {
    console.log("sf");
  })
  
  document.getElementById("tool-save-file-as").addEventListener("click", () => {
    console.log("sfa");
  })
  
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
    .catch((err) => {
      console.error(err);
    })
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
      console.log("true to false");
      setBackgroundColor("tool-html-viewer", falseColor);
      hideHTML();
    }
    else {
      console.log("false to true");

      setBackgroundColor("tool-html-viewer", trueColor);
      renderHTML(getEditorValue());
    }
  })
  
  document.getElementById("tool-help").addEventListener("click", () => {
    console.log("h");
  })

  

})

function setupToolbar() {
  document.getElementById("toolbar").innerHTML = toolbar({
    tools: [
      { name: "open-file",
        display: "open" },
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
  });
}

function runEqual(source, verbose=false) {
  new equal.Equal({
    mode: verbose ? "VERBOSE" : "NORMAL",
    source: source,
    output: (str) => logConsole(str)
  }).run();
}

function getEditorValue() {
  return editor.editor.viewState.state.doc.toString();
}

function logConsole(val, endOfLine="\n") {
  document.getElementById("console").innerText += val + endOfLine;
}

function clearConsole() {
  document.getElementById("console").innerText = "";
}

function isVisible(id) {
  const style = window.getComputedStyle(document.getElementById(id));
  return !(style["display"] == "none" || style["visibility"] == "hidden");
}


function hideHTML() {
  document.getElementsByClassName("main")[0].style["grid-template-rows"] = "10vh 85vh";
  document.getElementById("html-rendered").style.display = "none";
}

function renderHTML(html) {
  document.getElementsByClassName("main")[0].style["grid-template-rows"] = "10vh 45vh 40vh";
  const iframe = document.getElementById("html-rendered");
  // check for security
  iframe.setAttribute("srcdoc", html);
  document.getElementById("html-rendered").style.display = "block";
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