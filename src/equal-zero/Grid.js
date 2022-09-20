import React from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import "./Grid.css";

const ResponsiveGridLayout = WidthProvider(Responsive);
class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      winW: 12,
      winH: 6,
      editorW: 6, // can be modified
      outputW: 12 - 6, // change when editorW changes
      stdinH: 2, // can be modified
      stdoutH: 6 - 2, // can be modified
    }
    // editor, pass in?
    // state
  }
  // initial in props
  // changing states

  onResize(layout) {
    // let { x, y, h, w } = layout[0];
    // console.log(x, y, h, w);
  }

  render() {
    // fixed total height and width
    let layouts = {
      lg: [
        { i: "editor", x: 0, y: 0, w: this.state.editorW, h: this.state.winH, minH: this.state.winH, maxH: this.state.winH },
        { i: "stdin", x: this.state.editorW, y: 0, w: this.state.outputW, h: this.state.stdinH, minW: this.state.outputW, maxW: this.state.outputW },
        { i: "stdout", x: this.state.editorW, y: this.state.stdinH, w: this.state.outputW, h: this.state.stdoutH, minW: this.state.outputW, maxW: this.state.outputW }
      ]
    };
    return (
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        isDraggable={false}
        margin={[0, 0]}
        resizeHandles={["nw", "ne", "sw", "se"]}
        onResize={this.onResize}
        rowHeight={document.documentElement.clientHeight / 6}
      >

        <div key="editor" id="editor">editor</div>
        <div key="stdin">stdin</div>
        <div key="stdout">stdout</div>
        {/* <div key="transpiled-javascript"></div> */}

      </ResponsiveGridLayout>
    )
  }
}

export default Grid;