declare const enum equalMode {
    VERBOSE = "VERBOSE",
    NORMAL = "NORMAL"
}
declare function wrapValue(val: string): string | number | boolean;
interface equalOptions {
    mode: string;
    path?: string;
    source?: string;
    output?: (arg0: string) => void;
    input?: (arg0: string) => string;
}
export { equalMode, wrapValue, equalOptions };
