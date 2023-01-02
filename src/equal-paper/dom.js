import toolbar from "./toolbar.hbs";
import toolbarFile from "./toolbar-file.hbs";

// depend on window, document, editor

function setupToolbar(toolbarId, toolbarObj) {
  document.getElementById(toolbarId).innerHTML = toolbar(toolbarObj);
}

function setupToolbarFile(toolbarFileId, name="Untitled", unsaved=true) {
  document.getElementById(toolbarFileId).innerHTML = toolbarFile({
    name: name,
    unsaved: unsaved
  })
}

function getBackgroundColor(id) {
  return window.getComputedStyle(document.getElementById(id))["background-color"];
}

function setBackgroundColor(id, color) {
  document.getElementById(id).style["background-color"] = color;
}

// depend on getBackgroundColor and setBackgroundColor
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

function logConsole(consoleId, val, endOfLine = "\n") {
  document.getElementById(consoleId).innerText += val + endOfLine;
}

function clearConsole(consoleId) {
  document.getElementById(consoleId).innerText = "";
}

function isVisible(id) {
  const style = window.getComputedStyle(document.getElementById(id));
  return !(style["display"] == "none" || style["visibility"] == "hidden");
}

function renderHTML(html, gridId, gridLayout, iframeId) {
  document.getElementById(gridId).style["grid-template-rows"] = gridLayout;
  const iframe = document.getElementById(iframeId);
  // check for security
  iframe.setAttribute("srcdoc", html);
  document.getElementById(iframeId).style.display = "block";
}

function hideHTML(gridId, gridLayout, iframeId) {
  document.getElementById(gridId).style["grid-template-rows"] = gridLayout;
  document.getElementById(iframeId).style.display = "none";
}

export {
  setupToolbar, setupToolbarFile,
  getBackgroundColor, setBackgroundColor, toggleBackground,
  getEditorValue, setEditorValue, 
  logConsole, clearConsole, 
  isVisible, renderHTML, hideHTML
}