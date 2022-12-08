import { JSONfn } from "jsonfn";

function runEqual(source, verbose=false) {
  // check object
  if (self.equal) {
    new self.equal.Equal({
      source: source,
      mode: (verbose ? "VERBOSE": "NORMAL")
    }).run();

  } else {
    throw new Error("No interpreter object found");
  }

}

onmessage = (e) => {
  const data = e["data"];
  // finish setting up object
  if (data["equal"]) self.equal = JSONfn.parse((data["equal"]));
  if (data["source"]) {
    runEqual(data["source"], data["verbose"]);
  }
}