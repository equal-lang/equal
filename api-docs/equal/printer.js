"use strict";
exports.__esModule = true;
exports.Printer = void 0;
var Printer = (function () {
    function Printer(output) {
        this.buffer = "";
        this.allText = "";
        if (output)
            this.outputMethod = output;
        else
            this.outputMethod = console.log;
    }
    Printer.prototype.print = function (txt) {
        this.outputMethod(txt);
        this.allText += (txt + "\n");
    };
    Printer.prototype.bufferedPrint = function (txt) {
        this.buffer += (txt + "\n");
    };
    Printer.prototype.flushBuffer = function () {
        if (this.buffer) {
            if (this.buffer[this.buffer.length - 1] == "\n")
                this.buffer = this.buffer.slice(0, this.buffer.length - 1);
            this.outputMethod(this.buffer);
        }
    };
    Printer.prototype.allPrinted = function () {
        if (this.allText[this.allText.length - 1] == "\n")
            this.allText = this.allText.slice(0, this.allText.length - 1);
        return this.allText;
    };
    return Printer;
}());
exports.Printer = Printer;
//# sourceMappingURL=printer.js.map