import React from "react";
import CodeMirror from "@uiw/react-codemirror";
// import { EditorView, basicSetup } from "codemirror";
import { html } from "@codemirror/lang-html";

import "./Editor.css";


class Editor extends React.Component {
  render() {
    return (
      <CodeMirror
      value="console.log('hello world!');"
      height={this.props.height + "px"}
      extensions={[html()]}
    />
    // get height from props

    );
  }


}

export default Editor;