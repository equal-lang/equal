import { equalMode } from "./utils";


class Lexer {
  mode: keyof typeof equalMode;
  data: string;
  pointer: number;
  constructor(mode: keyof typeof equalMode) {
    this.mode = mode;
    this.data = "";
    this.pointer = 0;
  }

  public lex(data: string) {
    this.data = data;
    while (!this.atEnd()) {
      console.log(this.data[this.pointer]);
      this.pointer = this.pointer + 1;
    }
  }

  private atEnd(): boolean {
    return (this.pointer > this.data.length - 1);
  }
}

export { Lexer };
