import { operatorType } from "./token";

interface ExpressionVisitor {
  visitBinary(host: Binary): any;
  visitUnary(host: Unary): any;
  visitLiteral(host: Literal): any;
  visitVariable(host: Variable): any;
  
}

function isExpressionVisitor(cls: any): cls is ExpressionVisitor {
  return cls.visitBinary !== undefined &&cls.visitUnary !== undefined &&cls.visitLiteral !== undefined &&cls.visitVariable !== undefined ;
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

export {
  ExpressionVisitor, isExpressionVisitor, Expression, Binary, Unary, Literal, Variable, 
}
