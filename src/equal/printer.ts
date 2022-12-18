class Printer {
  allText: string;

  outputMethod: (arg0: string) => void;
  constructor(output?: (arg0: string) => void) {
    this.allText = "";
    if (output) this.outputMethod = output;
    else this.outputMethod = console.log;
  }
  public print(txt: string) {
    this.outputMethod(txt);
    this.allText += (txt + "\n");
  }

  // no verbose logging
  public allPrinted(): string {
    return this.stripNewline(this.allText);
  }

  private stripNewline(input: string): string {
    if (input[input.length-1] == "\n") return input.slice(0, input.length-1);
    return input;
  }
}

export { Printer }