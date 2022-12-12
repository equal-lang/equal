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
exports.ReturnStatement = exports.FunctionDeclaration = exports.PrintStatement = exports.ExpressionStatement = exports.ConditionalStatement = exports.Loop = exports.Assignment = exports.Scope = exports.Statement = exports.isStatementVisitor = void 0;
function isStatementVisitor(cls) {
    return cls.visitScope !== undefined && cls.visitAssignment !== undefined && cls.visitLoop !== undefined && cls.visitConditionalStatement !== undefined && cls.visitExpressionStatement !== undefined && cls.visitPrintStatement !== undefined && cls.visitFunctionDeclaration !== undefined && cls.visitReturnStatement !== undefined;
}
exports.isStatementVisitor = isStatementVisitor;
var Statement = (function () {
    function Statement() {
    }
    Statement.prototype.accept = function (visitor) {
        if (!isStatementVisitor(visitor))
            throw new Error("Invalid visitor type");
    };
    return Statement;
}());
exports.Statement = Statement;
var Scope = (function (_super) {
    __extends(Scope, _super);
    function Scope(statements) {
        var _this = _super.call(this) || this;
        _this.statements = statements;
        return _this;
    }
    Scope.prototype.accept = function (visitor) {
        _super.prototype.accept.call(this, visitor);
        return visitor.visitScope(this);
    };
    return Scope;
}(Statement));
exports.Scope = Scope;
var Assignment = (function (_super) {
    __extends(Assignment, _super);
    function Assignment(name, expression, scope) {
        var _this = _super.call(this) || this;
        _this.name = name;
        _this.expression = expression;
        _this.scope = scope;
        return _this;
    }
    Assignment.prototype.accept = function (visitor) {
        _super.prototype.accept.call(this, visitor);
        return visitor.visitAssignment(this);
    };
    return Assignment;
}(Statement));
exports.Assignment = Assignment;
var Loop = (function (_super) {
    __extends(Loop, _super);
    function Loop(condition, statements) {
        var _this = _super.call(this) || this;
        _this.condition = condition;
        _this.statements = statements;
        return _this;
    }
    Loop.prototype.accept = function (visitor) {
        _super.prototype.accept.call(this, visitor);
        return visitor.visitLoop(this);
    };
    return Loop;
}(Statement));
exports.Loop = Loop;
var ConditionalStatement = (function (_super) {
    __extends(ConditionalStatement, _super);
    function ConditionalStatement(conditions, statements) {
        var _this = _super.call(this) || this;
        _this.conditions = conditions;
        _this.statements = statements;
        return _this;
    }
    ConditionalStatement.prototype.accept = function (visitor) {
        _super.prototype.accept.call(this, visitor);
        return visitor.visitConditionalStatement(this);
    };
    return ConditionalStatement;
}(Statement));
exports.ConditionalStatement = ConditionalStatement;
var ExpressionStatement = (function (_super) {
    __extends(ExpressionStatement, _super);
    function ExpressionStatement(expression) {
        var _this = _super.call(this) || this;
        _this.expression = expression;
        return _this;
    }
    ExpressionStatement.prototype.accept = function (visitor) {
        _super.prototype.accept.call(this, visitor);
        return visitor.visitExpressionStatement(this);
    };
    return ExpressionStatement;
}(Statement));
exports.ExpressionStatement = ExpressionStatement;
var PrintStatement = (function (_super) {
    __extends(PrintStatement, _super);
    function PrintStatement(expressions) {
        var _this = _super.call(this) || this;
        _this.expressions = expressions;
        return _this;
    }
    PrintStatement.prototype.accept = function (visitor) {
        _super.prototype.accept.call(this, visitor);
        return visitor.visitPrintStatement(this);
    };
    return PrintStatement;
}(Statement));
exports.PrintStatement = PrintStatement;
var FunctionDeclaration = (function (_super) {
    __extends(FunctionDeclaration, _super);
    function FunctionDeclaration(name, params, body) {
        var _this = _super.call(this) || this;
        _this.name = name;
        _this.params = params;
        _this.body = body;
        return _this;
    }
    FunctionDeclaration.prototype.accept = function (visitor) {
        _super.prototype.accept.call(this, visitor);
        return visitor.visitFunctionDeclaration(this);
    };
    return FunctionDeclaration;
}(Statement));
exports.FunctionDeclaration = FunctionDeclaration;
var ReturnStatement = (function (_super) {
    __extends(ReturnStatement, _super);
    function ReturnStatement(expression) {
        var _this = _super.call(this) || this;
        _this.expression = expression;
        return _this;
    }
    ReturnStatement.prototype.accept = function (visitor) {
        _super.prototype.accept.call(this, visitor);
        return visitor.visitReturnStatement(this);
    };
    return ReturnStatement;
}(Statement));
exports.ReturnStatement = ReturnStatement;
//# sourceMappingURL=statement.js.map