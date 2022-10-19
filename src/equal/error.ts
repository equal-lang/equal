import { equalMode } from "./utils";

class equalError {
  message: string;
  file: string;
  line: number;

  constructor(message: string, file?: string, line?: number) {
    this.message = message;
    this.file = ((file == undefined) ? "Unknown file" : file);
    this.line = ((line == undefined) ? 0 : line);
  }

  public toString() {
    return ("Error at " + this.file + ":" + this.line + ": " + this.message);
  }
}


class errorHandler {
  // store error?
  _hasError: boolean;
  mode: keyof typeof equalMode;
  errors: equalError[];
  constructor(mode: keyof typeof equalMode) {
    this.mode = mode;
    this._hasError = false;
    this.errors = [];
  }
  public reportError(message: string, file?: string, line?: number) {
    let err: equalError = new equalError(message, file, line);
    console.error(err.toString());
    this._hasError = true;
    this.errors.push(err);
  }
  public getErrorStatus(): boolean {
    return this._hasError;
  }
}

export { equalError, errorHandler };
