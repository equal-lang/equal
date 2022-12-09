const express = require("express");
const app = express();
const port = (process.env.PORT != undefined) ? process.env.PORT : 8000;

app.get("/", (req, res) => {
  res.send("hi world");
})
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
