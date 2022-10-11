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

  onBreakpointChange(newBreakpoint, newCols) {
    const winW = newCols,
    editorW = Math.floor(.6 * winW),
    outputW = winW - editorW;
    this.setState({
      winW, editorW, outputW
    })
  }

    // editor: height is constant at winH, but editorW can change
    // stdin and stdout: individual H can change, but total H is constant at winH; outputW can change, providing that its total with editorW remains constant at winW

  onResize(layout, oldItem, newItem) {
    function searchI(layout, i) {
      for (let j = 0; j < layout.length; j++) {
        if (layout[j]["i"] == i) return layout[j];
      }
      return null;
    }
    
    const editor = searchI(layout, "editor");
    const stdin = searchI(layout, "stdin");
    const stdout = searchI(layout, "stdout");

    // editor, one of stdin or stdout must exist

    const newEditorW = editor["w"];
    const newOutputW = (newItem["i"] == "stdin" || newItem["i"] == "stdout") ? newItem["w"] : this.state.winW - newEditorW;
    const newStdinW = stdin ? stdin["w"] : (this.state.winW - newEditorW);
    const newStdoutW = stdout ? stdout["w"] : (this.state.winW - newEditorW);

  

    const newStdinH = stdin ? stdin["h"] : (this.state.winH - stdout["h"]);
    const newStdoutH = stdout ? stdout["h"] : (this.state.winH - stdin["h"]);

    if (this.state.editorW != newEditorW) {
      this.setState({ editorW: newEditorW, outputW: newOutputW });
    }

    if (this.state.stdinH != newStdinH) {
      // stdout does not exist, no state is reset because this.state.winH - stdin["h"] is equal to the previous state
      this.setState({ stdinH: newStdinH, stdoutH: this.state.winH - newStdinH });
    }

    if (this.state.stdoutH != newStdoutH) {
      this.setState({ stdoutH: newStdoutH, stdinH: this.state.winH - newStdoutH });
    }
    // BUG: when stdin/stdout resized itself to zero / simply resized, empty space is left


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


    // responsive grid not needed?
    let grid = <ResponsiveGridLayout style={{ width: document.documentElement.clientWeight, height: document.documentElement.clientHeight }}
      className="layout"
      layouts={layouts}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      isDraggable={false}
      margin={[0, 0]}
      resizeHandles={["nw", "ne", "sw", "se"]}
      onResize={this.onResize.bind(this)}
      onBreakpointChange={this.onBreakpointChange.bind(this)}
      rowHeight={document.documentElement.clientHeight / 6}
    >
      {editor}
      {(state.stdinH > 0) ? stdin : <span/>}
      {(state.stdoutH > 0) ? stdout : <span/>}
    </ResponsiveGridLayout>;
    return grid;
  }
}

export default Grid;