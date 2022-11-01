import React from "react";
import CodeMirror from "@uiw/react-codemirror";
// import { EditorView, basicSetup } from "codemirror";
import { html } from "@codemirror/lang-html";
import { abcdef } from "@uiw/codemirror-theme-abcdef";

import "./Editor.css";

class Editor extends React.Component {
  render() {
    return (
      <CodeMirror
      value="<div>Hello World</div>"
      height={this.props.height + "px"}
      theme={abcdef}
      extensions={[html()]}
      onChange={(value, viewUpdate) => {
        window.electronAPI.setValue(value);
      }}
    />
    // get height from props

    );
  }


}

export default Editor; 