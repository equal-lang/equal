import React from "react";
import Grid from "./Grid.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(e) {
    console.log(e)

  }

  render() {
    return (
      <div onKeyPress={this.handleKeyPress}>
        <Grid />

      </div>
    );
  }
}

export default App;