import React from 'react';
import SimpleCodeEditor from 'react-simple-code-editor';
import * as Prism from "prismjs";
import "../../node_modules/prism-themes/themes/prism-duotone-forest.min.css";

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: `<div>Hello World</div>`
    }
  }

  render() {
    return(
      <SimpleCodeEditor
        value={this.state.code}
        onValueChange={code => this.setState({ code: code })}
        highlight={code => Prism.highlight(code, Prism.languages.html)}
        padding={10}
      />
    );
  }

  
}

export default Editor;