import { equalMode } from "./utils";

interface ErrorVisitor {
  visitSyntaxError(host: EqualSyntaxError): any;
  visitRuntimeError(host: EqualRuntimeError): any;
  visitUnexpectedError(host: EqualUnexpectedError): any;
}

function isErrorVisitor(cls: any): cls is ErrorVisitor {
  return (cls.visitSyntaxError !== undefined && cls.visitRuntimeError !== undefined && cls.visitUnexpectedError !== undefined);
} 

class ErrorPrinter implements ErrorVisitor {
  public print(err: EqualError) {
    return err.accept(this);
  }
  public visitSyntaxError(host: EqualSyntaxError): string {
    return "SyntaxError at " + this.toString(host);
  }
  public visitRuntimeError(host: EqualRuntimeError): string {
    return "RuntimeError at " + this.toString(host);
  }
  public visitUnexpectedError(host: EqualRuntimeError): string {
    return "Unexpected Error: " + host.message + "\nPlease report the bug at https://github.com/equal-lang/equal/issues\n(To view the stack trace, run the interpreter again in verbose mode)";
  }
  private toString(err: EqualError): string {
    return err.file + ":" + err.line + ": " + err.message;
  }
}

class EqualError extends Error {
  message: string;
  file: string;
  line: number;

  constructor(message: string, file?: string, line?: number) {
    super(message);
    Object.setPrototypeOf(this, EqualError.prototype);
    this.name = "EqualError";
    this.message = message;
    this.file = ((file == undefined) ? "Unknown" : file);
    this.line = ((line == undefined) ? 0 : line);
  }
  public accept(visitor: any) {
    if (!isErrorVisitor(visitor)) throw new Error("Invalid visitor type");
  }
}

// errors that occurred during lexing or parsing
class EqualSyntaxError extends EqualError {
  constructor(message: string, file?: string, line?: number) {
    super(message, file, line);
    Object.setPrototypeOf(this, EqualSyntaxError.prototype);
    this.name = "EqualSyntaxError";
  }
  public accept(visitor: any) {
    super.accept(visitor);
    return visitor.visitSyntaxError(this);
  }
}

// rest of the errors
class EqualRuntimeError extends EqualError {
  constructor(message: string, file?: string, line?: number) {
    super(message, file, line);
    Object.setPrototypeOf(this, EqualRuntimeError.prototype);
    this.name = "EqualRuntimeError";
  }
  public accept(visitor: any) {
    super.accept(visitor); 
    return visitor.visitRuntimeError(this);
  }
}

// reserved for errors the interpreter produced
class EqualUnexpectedError extends EqualError {
  constructor(message: string, file?: string, line?: number) {
    super(message, file, line);
    Object.setPrototypeOf(this, EqualUnexpectedError.prototype);
    this.name = "EqualUnexpectedError";
  }
  public accept(visitor: any) {
    super.accept(visitor); 
    return visitor.visitUnexpectedError(this);
  }
}

class ErrorHandler {
  // store error?
  _hasError: boolean;
  mode: equalMode;
  errors: EqualError[];
  constructor(mode: equalMode) {
    this.mode = mode;
    this._hasError = false;
    this.errors = [];
  }

  public getErrorStatus(): boolean {
    return this._hasError;
  }

  // Report errors identified without ending parsing
  public reportError(err: EqualError) {
    console.error(new ErrorPrinter().print(err));
    this._hasError = true;
    this.errors.push(err);
  }
  
  // Handle errors that are thrown
  public handleError(err: Error) {
    // probably will make this output look better
    // if (this.mode == equalMode.VERBOSE) console.debug("Error", err);
    let newErr: EqualError;
    if (!(err instanceof EqualError)) newErr = new EqualUnexpectedError(err.message);
    else newErr = err;
    console.error(new ErrorPrinter().print(newErr));
    this._hasError = true;
    this.errors.push(newErr);
  }
}

export { EqualError, EqualSyntaxError, EqualRuntimeError, EqualUnexpectedError, ErrorHandler };