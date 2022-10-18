// handle error if they come up in the main interpreter, else simply report

class equalError {
  file: string;
  line: number;
  message: string;
  
  constructor(file: string, line: number, message: string) {
    this.file = ((file == undefined) ? "Unknown file" : file);
    this.line = ((line == undefined) ? 0 : line);
    this.message = message;
  }

  public report() {
    console.error("Error at " + this.file + ":" + this.line + ": " + this.message);
  }
}


export { equalError };
