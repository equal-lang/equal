
function runEqual(source, verbose = false) {
  if (self.equal) {
    console.log(self.equal)
    // new self.equal.Equal({
    //   mode: verbose ? "VERBOSE" : "NORMAL",
    //   source: source,
    //   output: (str) => logConsole(str)
    // }).run();

  } else {
    throw new Error("No interpreter object found");
  }
  

}


onmessage = (message) => {
  console.log(message)
  if (message["data"]["equal"]) self.equal = JSON.parse(message["data"]["equal"]);
  console.log("self.equal", self.equal)

  console.log(self);
  runEqual("<div>hello world</div>");
}

onerror = (e) => {
  console.error(e);
}