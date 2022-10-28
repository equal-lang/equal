import { Token, tokenType} from "./token";
import { EqualSyntaxError, ErrorHandler } from "./error";

function bigLexer(tokens: Token[], path: string, errHandler: ErrorHandler) {
  let bigTokens: BigToken[] = [];
  let pointer = 0;
  let startTag = [], text = [], endTag = [];
  let inStartTag = false, inEndTag = false;
  while (pointer <= tokens.length-1) {
    
    const token = tokens[pointer];
    if (token["tokenType"] == tokenType.START_TAG_LEFT) {
      evalText(text);
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
    } else if (token["tokenType"] == tokenType.EOF) {
      // only a value?
      evalText(text);

    } else {
      if (inStartTag) startTag.push(token);
      else if (inEndTag) endTag.push(token);
      else text.push(token);
    }
    pointer++;
  }
  if (inStartTag || inEndTag) reportError("Unclosed tag", tokens[tokens.length-1]["line"]);
  // test for this
  // EOF?
  return bigTokens;

  function evalStartTag(arr: Token[]) {
    if (arr.length == 0) return;
    startTag = [];

    let tagName = arr[0]["value"];
    if (!tagName) throwError("Missing tagname", arr[0]["line"]);
    let attributeList = tagMap.get(tagName);
    if (attributeList == undefined) return;
    
    let attribute: {[k: string]: string} = {};
    let pos = 1;
    let currentAttr = "", currentVal = "";
    while(pos < arr.length) {
      if (arr[pos] && arr[pos]["tokenType"] == tokenType.ATTRIBUTE && attributeList.includes(arr[pos]["value"])) {
        currentAttr = arr[pos]["value"] as string;
        pos++;
        if (arr[pos] && arr[pos]["tokenType"] == tokenType.EQUAL_SIGN) pos++;
        else throwError("Missing equal sign", arr[pos-1]["line"]);
        // use arr[pos] in the future?
        if (arr[pos] && arr[pos]["tokenType"] == tokenType.VALUE) {
          if (arr[pos]["value"] == undefined) throwError("Undefined value", arr[pos]["line"]);
          else currentVal = arr[pos]["value"] as string;
          pos++;
        }
        attribute[currentAttr] = currentVal;
        currentAttr = "", currentVal = "";
      } 
      // pos++;
    }
    
    bigTokens.push(new BigToken(bigTokenType.START_TAG, tagName as string, attribute, arr[arr.length-1]["line"]));

  }

  function evalEndTag(arr: Token[]) {
    if (arr.length == 0) return;
    endTag = [];

    if (arr.length > 1) reportError("Extra attributes in end tag", arr[0]["line"]);
    let tagName = arr[0]["value"];
    if (!tagName) throwError("Missing tagname", arr[0]["line"]);

    bigTokens.push(new BigToken(bigTokenType.END_TAG, tagName as string, {}, arr[0]["line"]));
  }

  function evalText(arr: Token[]) {
    if (arr.length == 0) return;
    text = [];
    if (arr.length > 1) reportError("Extra attributes in text", arr[0]["line"]);
    let val = arr[0]["value"];
    if (val === undefined) throwError("The value of a literal cannot be undefined", arr[0]["line"]);
    bigTokens.push(new BigToken(bigTokenType.TEXT, undefined, {"value": wrapValue(val as string)}, arr[0]["line"]));

  }

  function throwError(message: string, line?: number) {
    throw new EqualSyntaxError(message, path, line);
  }

  function reportError(message: string, line?: number) {
    const err = new EqualSyntaxError(message, path, line);
    errHandler.reportError(err);
  }

  function wrapValue(val: string): string | number | boolean {
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

class BigToken {
  type: bigTokenType;
  name: string | undefined;
  attribute: {[k: string]: any};
  line: number;
  constructor(type: bigTokenType, name: string | undefined, attribute: {[k: string]: any}, line: number) {
    this.type = type;
    this.name = name;
    this.attribute = attribute;
    this.line = line; 
  }
}

const enum bigTokenType {
  START_TAG = "START_TAG",
  END_TAG = "END_TAG",
  TEXT = "TEXT"
}

export { bigLexer, BigToken, bigTokenType };