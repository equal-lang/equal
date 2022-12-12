const { Equal } = require("./equal/equal");

const app = require("express")();
const port = (process.env.PORT != undefined) ? process.env.PORT : 8000;

// env variable
app.use(require("cors")({
  origin: "https://equal-lang.github.io"
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
