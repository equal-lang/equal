// depend on window, document, editor
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

// change to console

function logText(id, val, endOfLine = "\n") {
  document.getElementById(id).innerText += val + endOfLine;
}

function clearText(id) {
  document.getElementById(id).innerText = "";
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
  getBackgroundColor, setBackgroundColor, toggleBackground,
  getEditorValue, setEditorValue, 
  logText, clearText, 
  isVisible, renderHTML, hideHTML
}