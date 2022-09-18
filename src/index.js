const React = require("react");
const ReactDOM = require("react-dom");

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: "equal zero",
    }
  }

  render() {
    return (
      <div>
        <h1>{this.state.test}</h1>
      </div>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Test />)