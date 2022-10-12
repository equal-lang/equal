import React from "react";
import * as Prism from "prismjs";

// linking directly from node modules for the moment
// fix later
import "../../node_modules/prism-themes/themes/prism-duotone-forest.min.css";

// import "../../node_modules/blissfuljs/bliss.shy.js";
import "../../node_modules/prism-live/src/prism-live.js";
import "../../node_modules/prism-live/prism-live.css";


import "./Editor.css";

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: `<div>Hello World</div>`
    }
  }

  render() {
    // console.log(test);
    return (
        <textarea
          className="prism-live line-numbers language-html fill"
          spellCheck={false}
          defaultValue={this.state.code}
        >
        </textarea>

    );
  }


}

export default Editor;