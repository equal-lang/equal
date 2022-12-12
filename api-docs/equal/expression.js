"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.Call = exports.Variable = exports.Literal = exports.Unary = exports.Logical = exports.Binary = exports.Expression = exports.isExpressionVisitor = void 0;
function isExpressionVisitor(cls) {
    return cls.visitBinary !== undefined && cls.visitLogical !== undefined && cls.visitUnary !== undefined && cls.visitLiteral !== undefined && cls.visitVariable !== undefined && cls.visitCall !== undefined;
}
exports.isExpressionVisitor = isExpressionVisitor;
var Expression = (function () {
    function Expression() {
    }
    Expression.prototype.accept = function (visitor) {
        if (!isExpressionVisitor(visitor))
            throw new Error("Invalid visitor type");
    };
    return Expression;
}());
exports.Expression = Expression;
var Binary = (function (_super) {
    __extends(Binary, _super);
    function Binary(operator, arg1, arg2) {
        var _this = _super.call(this) || this;
        _this.operator = operator;
        _this.arg1 = arg1;
        _this.arg2 = arg2;
        return _this;
    }
    Binary.prototype.accept = function (visitor) {
        _super.prototype.accept.call(this, visitor);
        return visitor.visitBinary(this);
    };
    return Binary;
}(Expression));
exports.Binary = Binary;
var Logical = (function (_super) {
    __extends(Logical, _super);
    function Logical(operator, arg1, arg2) {
        var _this = _super.call(this) || this;
        _this.operator = operator;
        _this.arg1 = arg1;
        _this.arg2 = arg2;
        return _this;
    }
    Logical.prototype.accept = function (visitor) {
        _super.prototype.accept.call(this, visitor);
        return visitor.visitLogical(this);
    };
    return Logical;
}(Expression));
exports.Logical = Logical;
var Unary = (function (_super) {
    __extends(Unary, _super);
    function Unary(operator, arg1) {
        var _this = _super.call(this) || this;
        _this.operator = operator;
        _this.arg1 = arg1;
        return _this;
    }
    Unary.prototype.accept = function (visitor) {
        _super.prototype.accept.call(this, visitor);
        return visitor.visitUnary(this);
    };
    return Unary;
}(Expression));
exports.Unary = Unary;
var Literal = (function (_super) {
    __extends(Literal, _super);
    function Literal(arg) {
        var _this = _super.call(this) || this;
        _this.arg = arg;
        return _this;
    }
    Literal.prototype.accept = function (visitor) {
        _super.prototype.accept.call(this, visitor);
        return visitor.visitLiteral(this);
    };
    return Literal;
}(Expression));
exports.Literal = Literal;
var Variable = (function (_super) {
    __extends(Variable, _super);
    function Variable(name) {
        var _this = _super.call(this) || this;
        _this.name = name;
        return _this;
    }
    Variable.prototype.accept = function (visitor) {
        _super.prototype.accept.call(this, visitor);
        return visitor.visitVariable(this);
    };
    return Variable;
}(Expression));
exports.Variable = Variable;
var Call = (function (_super) {
    __extends(Call, _super);
    function Call(calleeName, args) {
        var _this = _super.call(this) || this;
        _this.calleeName = calleeName;
        _this.args = args;
        return _this;
    }
    Call.prototype.accept = function (visitor) {
        _super.prototype.accept.call(this, visitor);
        return visitor.visitCall(this);
    };
    return Call;
}(Expression));
exports.Call = Call;
//# sourceMappingURL=expression.js.map