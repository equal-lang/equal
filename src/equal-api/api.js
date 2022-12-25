const { Equal } = require("./equal/equal");

const app = require("express")();
const port = (process.env.PORT != undefined) ? process.env.PORT : 8000;

// env variable
// run from npm script to enable CUSTOM_DEV_MODE
// port 8080: default origin for website, running from nodemon
const origin = ((process.env.CUSTOM_DEV_MODE == "1") ? "http://localhost:8080" : "https://equal-lang.github.io");
app.use(require("cors")({
  origin: origin
}));
app.use(require("body-parser").json());

app.put("/api/v0", (req, res) => {
  const { mode, source } = req.body;
  res.json(new Equal({
    mode: mode ? "VERBOSE" : "NORMAL",
    source: source,
    output: () => {},
    input: () => {}
  }).run());
  // error status?
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
