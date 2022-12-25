class Printer {
  printed: string;
  debugObj: {[key: string]: object};
  outputMethod: (arg0: string) => void;

  constructor(output?: (arg0: string) => void) {
    this.printed = "";
    this.debugObj = {};
    if (output) this.outputMethod = output;
    else this.outputMethod = console.log;
  }

  public print(txt: string) {
    this.outputMethod(txt);
    this.printed += (txt + "\n");
  }

  // set mode in printer
  // return debug string or not?
  public debug(label: string, obj: object) {
    // outputMethod: console.debug
    // debugObj
    console.debug("("+label+")", obj);
    this.debugObj[label] = obj;
  }

  // no verbose logging
  public allPrinted(): string {
    return this.stripNewline(this.printed);
  }

  private stripNewline(input: string): string {
    if (input[input.length-1] == "\n") return input.slice(0, input.length-1);
    return input;
  }
}

export { Printer }