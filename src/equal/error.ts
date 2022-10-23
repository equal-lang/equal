import { string } from "yargs";
import { equalMode } from "./utils";

// return statements
// interface

interface ErrorVisitor {
  visitInterpreterError(host: EqualInterpreterError): any;
  visitSyntaxError(host: EqualSyntaxError): any;
  visitRuntimeError(host: EqualRuntimeError): any;
}

class test extends Error {
  message: string;
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, test.prototype);
  }
  public test1232435() {
    console.log("test");
  }
}

class test1 extends test{
  public test1232435() {
    console.log("test1");
  }
}
class ErrorPrinter implements ErrorVisitor {
  public print(err: EqualError) {
    console.log(new test1("message").test1232435());
    // console.log(new EqualInterpreterError("test").accept(this));
    // let err1 = new EqualError("emssage");
    // console.log(err1.accept(this));
    // return err.accept(this); 
  }
  public visitInterpreterError(host: EqualInterpreterError): string {
    return "Interpreter Error at " + this.toString(host);
  }
  public visitSyntaxError(host: EqualSyntaxError): string {
    return "Syntax Error at " + this.toString(host);
  }
  public visitRuntimeError(host: EqualRuntimeError): string {
    return "Runtime Error at " + this.toString(host);
  }
  private toString(err: EqualError): string {
    return err.file + ":" + err.line + ": " + err.message;
  }
}

function isErrorVisitor(cls: any): cls is ErrorVisitor {
  return (cls.visitInterpreterError !== undefined && cls.SyntaxError !== undefined && cls.visitRuntimeError !== undefined)
} 

// abstract class
class EqualError extends Error {
  message: string;
  file: string;
  line: number;

  constructor(message: string, file?: string, line?: number) {
    super(message);
    this.name = "EqualError";
    this.message = message;
    this.file = ((file == undefined) ? "Unknown file" : file);
    this.line = ((line == undefined) ? 0 : line);
  }
  public accept(visitor: any) {
    if (!isErrorVisitor(visitor)) throw new Error("Invalid visitor type");
  }
}

class EqualInterpreterError extends EqualError {
  constructor(message: string, file?: string, line?: number) {
    super(message, file, line);
    this.name = "EqualInterpreterError";
  }

  public accept(visitor: any) {
    super.accept(visitor);
    return visitor.visitInterpreterError(this);
  }
}

class EqualSyntaxError extends EqualError {
  constructor(message: string, file?: string, line?: number) {
    super(message, file, line);
    this.name = "EqualSyntaxError";
  }
  public accept(visitor: any) {
    super.accept(visitor);
    return visitor.visitSyntaxError(this);
  }
}

class EqualRuntimeError extends EqualError {
  constructor(message: string, file?: string, line?: number) {
    super(message, file, line);
    this.name = "EqualRuntimeError";
  }
  public accept(visitor: any) {
    super.accept(visitor);
    return visitor.visitRuntimeError(this);
  }
}

class ErrorHandler {
  // store error?
  _hasError: boolean;
  mode: keyof typeof equalMode;
  errors: EqualError[];
  constructor(mode: keyof typeof equalMode) {
    this.mode = mode;
    this._hasError = false;
    this.errors = [];
  }
  // TODO: change this
  public reportError(message: string, file?: string, line?: number) {
    // let err: EqualError = new EqualError(message, file, line);
    // console.error(err.toString());
    // this._hasError = true;
    // this.errors.push(err);
  }
  public getErrorStatus(): boolean {
    return this._hasError;
  }

  public handleError(err: EqualError) {
    console.log(err.message);
    // verbose
    let printer = new ErrorPrinter();
    console.log(printer.print(err));
    
    // if (this.mode == equalMode.VERBOSE) console.info(err);
    // if (err instanceof EqualSyntaxError) {
      
    // } else if (err instanceof EqualRuntimeError) {

    // } else {
    //   if (!(err instanceof EqualInterpreterError)) err = new EqualInterpreterError(err.message, err.file, err.line);
    //   this.handleInterpreterError(err);
    // }

  }
    // handle unexpected errors in interpreter code
  private handleInterpreterError(err: Error): void {
    console.error("Unexpected Error: " + ((err.message == "") ? "Unknown Error" : err.message));
  }
}

export { EqualError, EqualInterpreterError, EqualSyntaxError, EqualRuntimeError, ErrorHandler };