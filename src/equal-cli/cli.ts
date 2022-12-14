#!/usr/bin/env node

// Wrapper outside the actual interpreter (equal)
import yargs from "yargs";
// import yargs = require("yargs/yargs");
import { hideBin } from "yargs/helpers";
import * as fs from "fs";
import { Equal } from "../equal/equal";

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
      const options = {
        path: argv.path,
        mode: (argv.verbose ? "VERBOSE": "NORMAL")
      }
      new Equal(options).run();
    }
  }
})
.help()
.argv;

export {};