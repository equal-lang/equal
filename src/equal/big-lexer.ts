import { Token, tokenType} from "./token";
import { EqualSyntaxError, EqualUnexpectedError, ErrorHandler } from "./error";

function bigLexer(tokens: Token[], path: string, errHandler: ErrorHandler) {
  let bigTokens: bigToken[] = [];
  let pointer = 0;
  let startTag = [], text = [], endTag = [];
  let inStartTag = false, inEndTag = false;
  while (pointer <= tokens.length-1) {
    const token = tokens[pointer];
    if (token["tokenType"] == tokenType.START_TAG_LEFT) {
      inStartTag = true;
    } else if (token["tokenType"] == tokenType.END_TAG_LEFT) {
      evalText(text);
      inEndTag = true;
    } else if (token["tokenType"] == tokenType.TAG_RIGHT) {
      // The tokens parsed by the lexer will be wrong if this is true
      if (inStartTag && inEndTag) throwError("Missing right tag", token["line"]);
      else if (!inStartTag && !inEndTag) throwError("Extra right tag", token["line"]);
      else if (inStartTag) {
        evalStartTag(startTag);
        inStartTag = false;
      } else if (inEndTag) {
        evalEndTag(endTag);
        inEndTag = false;
      }
    } else {
      if (inStartTag) startTag.push(token);
      else if (inEndTag) endTag.push(token);
      else text.push(token);
    }
    pointer++;
  }
  return bigTokens;

  function evalStartTag(arr: Token[]) {
    if (arr.length == 0) return;
    startTag = [];
    console.log(arr);

    let tagName = arr[0]["value"];
    if (!tagName) throwError("Missing tagname", arr[0]["line"]);
    let attributeList = tagMap.get(tagName);
    if (attributeList == undefined) return;
    
    let attribute: {[k: string]: string} = {};
    let pos = 1;
    let currentAttr = "", currentVal = "";
    while(pos < arr.length) {
      if (arr[pos]["tokenType"] == tokenType.ATTRIBUTE && attributeList.includes(arr[pos]["value"])) {
        currentAttr = arr[pos]["value"] as string;
        // if (currentAttr == undefined) throwError("Undefined value");
        pos++;
        if (arr[pos]["tokenType"] == tokenType.EQUAL_SIGN) pos++;
        else throwError("Missing equal sign");
        if (arr[pos]["tokenType"] == tokenType.VALUE) {
          if (arr[pos]["value"] == undefined) throwError("Undefined value");
          else currentVal = arr[pos]["value"] as string;
          pos++;
        }
        attribute[currentAttr] = currentVal;
        currentAttr = "", currentVal = "";
      } 
      pos++;
    }
    console.log(tagName, attribute)
    
    bigTokens.push(new bigToken(bigTokenType.START_TAG, tagName as string, attribute, arr[arr.length-1]["line"]));

  }

  function evalEndTag(arr: Token[]) {
    if (arr.length == 0) return;
    endTag = [];

    if (arr.length > 1) reportError("Extra attributes in end tag");
    let tagName = arr[0]["value"];
    if (!tagName) throwError("Missing tagname", arr[0]["line"]);

    bigTokens.push(new bigToken(bigTokenType.END_TAG, tagName as string, {}, arr[0]["line"]));
  }

  function evalText(arr: Token[]) {
    if (arr.length == 0) return;
    text = [];
    if (arr.length > 1) reportError("Extra attributes in text");
    let val = arr[0]["value"];
    if (val === undefined) throwError("The value of a literal cannot be undefined");
    bigTokens.push(new bigToken(bigTokenType.TEXT, undefined, {"value": wrapValue(val as string)}, arr[0]["line"]));

  }

  function throwError(message: string, line?: number) {
    throw new EqualSyntaxError(message, path, line);
  }

  function reportError(message: string, line?: number) {
    const err = new EqualSyntaxError(message, path, line);
    errHandler.reportError(err);
  }

  function wrapValue(val: string): string | number | boolean {
    // better error message?
    if (!isNaN(Number(val))) return Number(val);
    else if (val === "true" || val == "false") return (val === "true");
    // val must be string
    else return val;
  }

}

// tagname -> attributes needed
let tagMap = new Map()
.set("div", [])
.set("h1", ["class"])
.set("h2", ["class"])
.set("h3", ["class"])
.set("h4", ["class"])
.set("h5", ["class"])
.set("h6", ["class"])
.set("p", ["class"])
.set("a", ["id", "href"])
.set("input", ["type", "value", "id"])
.set("form", ["title", "id"])
.set("label", ["for"])
.set("link", ["rel", "href", "type"])
.set("img", ["src", "alt"])

class bigToken {
  type: bigTokenType;
  name: string | undefined;
  attribute: {[k: string]: any};
  line: number;
  constructor(type: bigTokenType, name: string | undefined, attribute: {[k: string]: any}, line: number) {
    this.type = type;
    this.line = line; 
    this.name = name;
    this.attribute = attribute;
  }
}

const enum bigTokenType {
  START_TAG = "START_TAG",
  END_TAG = "END_TAG",
  TEXT = "TEXT"
}

export { bigLexer };