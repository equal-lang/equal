import { EqualCallable } from "./callable";
declare class Environment {
    outerEnv: Environment | undefined;
    variables: Map<string, string | number | boolean>;
    functions: Map<string, EqualCallable>;
    constructor(outEnv?: Environment);
    assign(key: string, val: string | number | boolean): void;
    get(key: string): string | number | boolean;
    declareFunc(key: string, func: EqualCallable): void;
    getFunc(key: string): EqualCallable;
}
export { Environment };
