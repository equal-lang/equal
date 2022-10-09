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

  onResize(layout) {
    // deconstruct object?
    const newEditorW = layout[0]["w"];
    const newOutputW = this.state.winW - newEditorW;
    const newStdinH = layout[1]["h"];
    const newStdoutH = layout[2]["h"];
    const newStdinW = layout[1]["w"];
    const newStdoutW = layout[2]["w"];

    console.log("onresize", layout)

    if (this.state.editorW != newEditorW) this.setState({ editorW: newEditorW, outputW: newOutputW });

    if (this.state.stdinH != newStdinH) {
      this.setState({ stdinH: newStdinH, stdoutH: this.state.winH - newStdinH });
    }

    if (this.state.stdoutH != newStdoutH) this.setState({ stdoutH: newStdoutH, stdinH: this.state.winH - newStdoutH });


    // TODO: fix resize on breakpoint change
    // TODO: make sure output always fill the space, in height and weight

    // TODO: fix error Failed prop type: minWidth larger than item width/maxWidth

    if (newStdinW < newOutputW || newStdoutW < newOutputW) {
      console.log(this.state.outputW, newOutputW);
      this.setState({ outputW: newOutputW-1 });
      this.setState({ outputW: newOutputW });

      // problem: outputW and newOutputW are the same, because editorW has not changed
      // rerender needed
      // problem: editorH also changing
      // changing stdinH can force out stdoutW

    }
  }

  render() {
    let state = this.state;

    let editorLayout = { i: "editor", x: 0, y: 0, w: state.editorW, h: state.winH, minH: state.winH, maxH: state.winH, maxW: state.winW, minW: 0}; 

    let stdinLayout = { i: "stdin", x: state.editorW, y: 0, w: state.outputW, h: state.stdinH, maxH: state.winH - 1, maxW: state.winW, minW: 0 };
    // let emptyStdinLayout = { i: "stdin", x: state.editorW, y: 0, w: 0, h: 0, minW: 0, minH: 0 };

    let stdoutLayout = { i: "stdout", x: state.editorW, y: state.stdinH, w: state.outputW, h: state.stdoutH, maxH: state.winH - 1, maxW: state.winW, minW: 0};
    // let emptyStdoutLayout = { i: "stdout", x: state.editorW, y: state.stdinH, w: 0, h: 0, minW: 0, minH: 0 };



    let layouts;
    if (state.stdinH <= 0) {
      layouts = {
        lg: [editorLayout, stdoutLayout]
        // lg: [editorLayout, emptyStdinLayout, stdoutLayout]

      };
    }
    else if (state.stdoutH <= 0) {

      layouts = {
        // lg: [editorLayout, stdinLayout, emptyStdoutLayout]
        lg: [editorLayout, stdinLayout]
      };
    } else {
      layouts = {
        lg: [ editorLayout, stdinLayout, stdoutLayout ]
      };
    }
    console.log(state)
    console.log(layouts);

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
        {(state.stdinH >= 0) ? stdin : <span/>}
        {(state.stdoutH >= 0) ? stdout : <span/>}
      </ResponsiveGridLayout>
    )
  }
}

export default Grid;