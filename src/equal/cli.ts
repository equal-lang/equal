#!/usr/bin/env node

// Wrapper outside the actual interpreter (equal)
import yargs from "yargs";
// import yargs = require("yargs/yargs");
import { hideBin } from "yargs/helpers";
const fs = require("fs");
const { Equal } = require("./equal");

yargs(hideBin(process.argv))
.scriptName("equal")
.command({
  command: "$0 <path>",
  aliases: ["run"],
  describe: "Run Equal file",
  builder: {
    "verbose": {
      describe: "Run in verbose mode",
      type: "boolean",
      default: false,
      alias: ["v"]
    }
  },
  handler: (argv: any) => {
    if (!fs.existsSync(argv.path) || !fs.lstatSync(argv.path).isFile()) console.error("Invalid path");
    else {
      new Equal(argv.path, (argv.verbose ? "VERBOSE": "NORMAL"));
    }
  }
})
.help()
.argv;

export {};