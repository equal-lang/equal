#!/usr/bin/env node

const path = require("path");

class Equal {
  error: boolean;
  constructor(args: string[]) {
    this.error = false;
  }
  // error or not
  // what mode
  // files

}

// TODO: add more flags with yargs
// main function
// only mode: verbose

function equal(): void {
  let equal = new Equal(process.argv);
  console.log(process.argv);
  console.log(process.argv.slice(2));
}

equal();

// module.exports = {
//   equal
// }

