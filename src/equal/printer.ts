class Printer {
  buffer: string;
  outputMethod: (arg0: string) => void;
  constructor(output?: (arg0: string) => void) {
    this.buffer = "";
    if (output) this.outputMethod = output;
    else this.outputMethod = console.log;
  }
  public print(txt: string) {
    this.outputMethod(txt);
  }
  public bufferedPrint(txt: string) {
    this.buffer += (txt + "\n");
  }
  public flushBuffer(): void {
    if (this.buffer) {
      if (this.buffer[this.buffer.length-1] == "\n") this.buffer = this.buffer.slice(0, this.buffer.length-1);
      this.outputMethod(this.buffer);
    }
  }
}

export { Printer }