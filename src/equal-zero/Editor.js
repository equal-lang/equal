import React from "react";
import CodeMirror from "@uiw/react-codemirror";
// import { EditorView, basicSetup } from "codemirror";
import { html } from "@codemirror/lang-html";
import { sublime } from "@uiw/codemirror-theme-sublime";

import "./Editor.css";

class Editor extends React.Component {
  render() {
    return (
      <CodeMirror
      value="<div>Hello World</div>"
      height={this.props.height + "px"}
      theme={sublime}
      extensions={[html()]}
      onChange={(value, viewUpdate) => {
        console.log(value);
      }}
    />
    // get height from props

    );
  }


}

export default Editor;