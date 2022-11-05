const enum equalMode {
  VERBOSE = "VERBOSE",
  NORMAL = "NORMAL"
}

function wrapValue(val: string): string | number | boolean {
  if (!isNaN(Number(val))) return Number(val);
  else if (val === "true" || val == "false") return (val === "true");
  // val must be string
  else return val;
}

interface equalOptions {
  mode: string;
  path?: string;
  source?: string;
  output?: (arg0: string) => void;
  input?: (arg0: string) => string;
}

export {
  equalMode, wrapValue, equalOptions
}