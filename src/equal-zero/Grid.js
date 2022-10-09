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

  // onBreakpointChange(newBreakpoint, newCols) {
  //   this.setState({ winW: newCols });
  // }

  onResize(layout) {
    const newEditorW = layout[0]["w"];
    const newOutputW = this.state.winW - newEditorW;
    const newStdinH = layout[1]["h"];
    const newStdoutH = layout[2]["h"];
    const newStdinW = layout[1]["w"];
    const newStdoutW = layout[2]["w"];

    if (this.state.editorW != newEditorW) this.setState({ editorW: newEditorW, outputW: newOutputW });

    if (this.state.stdinH != newStdinH) this.setState({ stdinH: newStdinH, stdoutH: this.state.winH - newStdinH });

    if (this.state.stdoutH != newStdoutH) this.setState({ stdoutH: newStdoutH, stdinH: this.state.winH - newStdoutH });


    // TODO: fix resize on breakpoint change
    // TODO: make sure output always fill the space, in height and weight

    // TODO: fix error Failed prop type: minWidth larger than item width/maxWidth

    // if (newStdinW < newOutputW || newStdoutW < newOutputW) {
    //   console.log(this.state.outputW, newOutputW);
    //   this.setState({ outputW: newOutputW });
    //   console.log("yes")

    // }
  }

  render() {
    let layouts = {
      lg: [
        { i: "editor", x: 0, y: 0, w: this.state.editorW, h: this.state.winH, minH: this.state.winH, maxW: this.state.winW }, // maxH: this.state.winH, 
        { i: "stdin", x: this.state.editorW, y: 0, w: this.state.outputW, h: this.state.stdinH, maxH: this.state.winH, maxW: this.state.winW },
        { i: "stdout", x: this.state.editorW, y: this.state.stdinH, w: this.state.outputW, h: this.state.stdoutH, maxH: this.state.winH, maxW: this.state.winW }
      ]

    };
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
        // onBreakpointChange={this.onBreakpointChange.bind(this)}
        rowHeight={document.documentElement.clientHeight / 6}

      >
        <div key="editor" id="editor"><Editor /></div>
        <div key="stdin" id="stdin">stdin</div>
        <div key="stdout" id="stdout">stdout</div>
        {/* <div key="transpiled-javascript"></div> */}

      </ResponsiveGridLayout>
    )
  }
}

export default Grid;