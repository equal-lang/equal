import React from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import Editor from "./Editor.js";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import "./Grid.css";

const ResponsiveGridLayout = WidthProvider(Responsive);
class Grid extends React.Component {
  constructor(props) {
    super(props);
    // get winW from somewhere
    this.state = {
      winW: 12, // constant
      winH: 6, // constant

      editorW: 7, // can be modified
      outputW: 12 - 7, // change when editorW changes
      stdinH: 3, // can be modified
      stdoutH: 6 - 3, // can be modified
    }
  }

    // editor: height is constant at winH, but editorW can change
    // stdin and stdout: individual H can change, but total H is constant at winH; outputW can change, providing that its total with editorW remains constant at winW

  onResize(layout, oldItem, newItem) {
    // deconstruct object?

    // check only this function
    // only thing done later is if stdin or stdout has a height of 0 or below, not return their elements
      // why does width not need this?
    // when resize happens, if one element has not been included previously and there is now space for it, find a way to add it in
      // layout 
    // else keep the total width at 6 and the total height at 12
    // hidden handle in editor
    
    // search based on i

    function searchI(layout, i) {
      for (let j = 0; j < layout.length; j++) {
        if (layout[j]["i"] == i) return layout[j];
      }
      return null;
    }
    
    const editor = searchI(layout, "editor");
    const stdin = searchI(layout, "stdin");
    const stdout = searchI(layout, "stdout");

    const newEditorW = editor["w"];

    // if (stdin && stdout) {
    //   const newStdinH = stdin["h"];
    //   const newStdoutH = stdout["h"];
    // } else if (stdin) {
    //   const newStdinH = stdin["h"];
    //   const newStdoutH = this.state.winH - stdin["h"];
    // } else if (stdout) {
    //   const newStdinH = this.state.winH - stdout["h"];
    //   const newStdoutH = stdout["h"];
    // } else {
    //   const newStdinH = 0;
    //   const newStdoutH = 0;
    // }

    // one of stdin or stdout?

    const newStdinH = stdin ? stdin["h"] : (this.state.winH - stdout["h"]);
    const newStdoutH = stdout ? stdout["h"] : (this.state.winH - stdin["h"]);

    const newStdinW = stdin ? stdin["w"] : (this.state.winW - newEditorW);
    const newStdoutW = stdout ? stdout["w"] : (this.state.winW - newEditorW);

    const newOutputW = (newItem["i"] == "stdin" || newItem["i"] == "stdout") ? newItem["w"] : this.state.winW - newEditorW;


    if (this.state.editorW != newEditorW) {
      this.setState({ editorW: newEditorW, outputW: newOutputW });
    }

    if (this.state.stdinH != newStdinH) {
      this.setState({ stdinH: newStdinH, stdoutH: this.state.winH - newStdinH });
    }

    if (this.state.stdoutH != newStdoutH) {
      this.setState({ stdoutH: newStdoutH, stdinH: this.state.winH - newStdoutH });
    }

    // stdout sometimes does not fill the space
    // TODO: fix resize on breakpoint change


    if (newStdinW != newOutputW || newStdoutW != newOutputW) {
      this.setState({ outputW: newOutputW, editorW: this.state.winW - newOutputW });
    } 
  }

  render() {
    let state = this.state;

    let editorLayout = { i: "editor", x: 0, y: 0, w: state.editorW, h: state.winH, minH: state.winH, maxH: state.winH, maxW: state.winW, minW: 0}; 

    let stdinLayout = { i: "stdin", x: state.editorW, y: 0, w: state.outputW, h: state.stdinH, maxH: state.winH, maxW: state.winW, minW: 0, minH: 0 };

    let stdoutLayout = { i: "stdout", x: state.editorW, y: state.stdinH, w: state.outputW, h: state.stdoutH, maxH: state.winH, maxW: state.winW, minW: 0, minH: 0 };

    let layouts = {
      lg: [ editorLayout, stdinLayout, stdoutLayout ]
    };

    let editor = <div key="editor" id="editor"><Editor /></div>;
    let stdin = <div key="stdin" id="stdin">stdin</div>;
    let stdout = <div key="stdout" id="stdout">stdout</div>;

    return (
      <ResponsiveGridLayout style={{ width: document.documentElement.clientWeight, height: document.documentElement.clientHeight }}
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        isDraggable={false}
        margin={[0, 0]}
        resizeHandles={["nw", "ne", "sw", "se"]}
        onResize={this.onResize.bind(this)}
        rowHeight={document.documentElement.clientHeight / 6}
      >
        {editor}
        {(state.stdinH > 0) ? stdin : <span/>}
        {(state.stdoutH > 0) ? stdout : <span/>}
      </ResponsiveGridLayout>);
  }
}

export default Grid;