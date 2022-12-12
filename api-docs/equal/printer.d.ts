declare class Printer {
    buffer: string;
    allText: string;
    outputMethod: (arg0: string) => void;
    constructor(output?: (arg0: string) => void);
    print(txt: string): void;
    bufferedPrint(txt: string): void;
    flushBuffer(): void;
    allPrinted(): string;
}
export { Printer };
