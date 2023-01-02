import toolbar from "./toolbar.hbs";
import toolbarFile from "./toolbar-file.hbs";

const constants = {
  toolbarObj: {
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
  },

  toolbarId: "toolbar",
  toolbarFileId: "toolbar-file",
  gridId: "main-grid",
  consoleId: "console",
  iframeId: "html-rendered",

  gridLayoutHtml: "45vh 50vh",
  gridLayoutNoHtml: "95vh",

  trueColor: "rgb(212, 245, 198)",
  falseColor: "rgb(240, 240, 240)",
}

// depend on window, document, editor

function setupToolbar() {
  // console.log(getBackgroundColor("tool-help"));
  document.getElementById(constants.toolbarId).innerHTML = toolbar(constants.toolbarObj);
}

function setupToolbarFile(name="Untitled", unsaved=true) {
  document.getElementById(constants.toolbarFileId).innerHTML = toolbarFile({
    name: name,
    unsaved: unsaved,
  })
}

function getBackgroundColor(id) {
  return window.getComputedStyle(document.getElementById(id))["background-color"];
}

function setBackgroundColor(id, color) {
  document.getElementById(id).style["background-color"] = color;
}

// depend on getBackgroundColor and setBackgroundColor
function toggleBackgroundColor(id) {
  if (getBackgroundColor(id) == constants.trueColor) {
    setBackgroundColor(id, constants.falseColor);
    return constants.falseColor;
  }
  else {
    setBackgroundColor(id, constants.trueColor);
    return constants.trueColor;
  }
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
  document.getElementById(constants.consoleId).innerText += val + endOfLine;
}

function clearConsole() {
  document.getElementById(constants.consoleId).innerText = "";
}

function isVisible(id) {
  const style = window.getComputedStyle(document.getElementById(id));
  return !(style["display"] == "none" || style["visibility"] == "hidden");
}

function renderHTML(html) {
  document.getElementById(constants.gridId).style["grid-template-rows"] = constants.gridLayoutHtml;
  const iframe = document.getElementById(constants.iframeId);
  // check for security
  iframe.setAttribute("srcdoc", html);
  document.getElementById(constants.iframeId).style.display = "block";
}

function hideHTML() {
  document.getElementById(constants.gridId).style["grid-template-rows"] = constants.gridLayoutNoHtml;
  document.getElementById(constants.iframeId).style.display = "none";
}

export const trueColor = constants.trueColor;
export const falseColor = constants.falseColor;

export {
  setupToolbar, setupToolbarFile,
  getBackgroundColor, setBackgroundColor, toggleBackgroundColor,
  getEditorValue, setEditorValue, 
  logConsole, clearConsole, 
  isVisible, renderHTML, hideHTML
}