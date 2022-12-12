import { equalMode } from "./utils";
declare class EqualError extends Error {
    message: string;
    file: string;
    line: number;
    constructor(message: string, file?: string, line?: number);
    accept(visitor: any): void;
}
declare class EqualSyntaxError extends EqualError {
    constructor(message: string, file?: string, line?: number);
    accept(visitor: any): any;
}
declare class EqualRuntimeError extends EqualError {
    constructor(message: string, file?: string, line?: number);
    accept(visitor: any): any;
}
declare class EqualUnexpectedError extends EqualError {
    constructor(message: string, file?: string, line?: number);
    accept(visitor: any): any;
}
declare class ErrorHandler {
    _hasError: boolean;
    mode: equalMode;
    errors: EqualError[];
    constructor(mode: equalMode);
    getErrorStatus(): boolean;
    reportError(err: EqualError): void;
    handleError(err: Error): void;
}
export { EqualError, EqualSyntaxError, EqualRuntimeError, EqualUnexpectedError, ErrorHandler };
