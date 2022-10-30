import { operatorType } from "./token";

interface ExpressionVisitor {
  visitBinary(host: Binary): any;
  visitLogical(host: Logical): any;
  visitUnary(host: Unary): any;
  visitLiteral(host: Literal): any;
  visitVariable(host: Variable): any;
  visitCall(host: Call): any;
  
}

function isExpressionVisitor(cls: any): cls is ExpressionVisitor {
  return cls.visitBinary !== undefined &&cls.visitLogical !== undefined &&cls.visitUnary !== undefined &&cls.visitLiteral !== undefined &&cls.visitVariable !== undefined &&cls.visitCall !== undefined ;
} 

// abstract class
class Expression {
  constructor() {
  }
  public accept(visitor: ExpressionVisitor) {
    if (!isExpressionVisitor(visitor)) throw new Error("Invalid visitor type");
  }
}

class Binary extends Expression {
  operator: operatorType; 
  arg1: Expression; 
  arg2: Expression; 
  
  constructor(operator: operatorType, arg1: Expression, arg2: Expression, ) {
    super();
    this.operator = operator;
    this.arg1 = arg1;
    this.arg2 = arg2;
    
  }
  public accept(visitor: ExpressionVisitor) {
    super.accept(visitor);
    return visitor.visitBinary(this);
  }
}

class Logical extends Expression {
  operator: operatorType; 
  arg1: Expression; 
  arg2: Expression; 
  
  constructor(operator: operatorType, arg1: Expression, arg2: Expression, ) {
    super();
    this.operator = operator;
    this.arg1 = arg1;
    this.arg2 = arg2;
    
  }
  public accept(visitor: ExpressionVisitor) {
    super.accept(visitor);
    return visitor.visitLogical(this);
  }
}

class Unary extends Expression {
  operator: operatorType; 
  arg1: Expression; 
  
  constructor(operator: operatorType, arg1: Expression, ) {
    super();
    this.operator = operator;
    this.arg1 = arg1;
    
  }
  public accept(visitor: ExpressionVisitor) {
    super.accept(visitor);
    return visitor.visitUnary(this);
  }
}

class Literal extends Expression {
  arg: string | number | boolean; 
  
  constructor(arg: string | number | boolean, ) {
    super();
    this.arg = arg;
    
  }
  public accept(visitor: ExpressionVisitor) {
    super.accept(visitor);
    return visitor.visitLiteral(this);
  }
}

class Variable extends Expression {
  name: string; 
  
  constructor(name: string, ) {
    super();
    this.name = name;
    
  }
  public accept(visitor: ExpressionVisitor) {
    super.accept(visitor);
    return visitor.visitVariable(this);
  }
}

class Call extends Expression {
  calleeName: string; 
  args: Expression[]; 
  
  constructor(calleeName: string, args: Expression[], ) {
    super();
    this.calleeName = calleeName;
    this.args = args;
    
  }
  public accept(visitor: ExpressionVisitor) {
    super.accept(visitor);
    return visitor.visitCall(this);
  }
}

export {
  ExpressionVisitor, isExpressionVisitor, Expression, Binary, Logical, Unary, Literal, Variable, Call, 
}
