import { Token } from "./token";

// abstract class
class Expression {
  constructor() {
    throw new Error("Abstract class cannot be directly instantiated");
  }
  public accept(visitor: Visitor) {
    throw new Error("Method in abstract class cannot be called");
  }
}

class Binary extends Expression {
  operator: Token; 
  arg1: Expression; 
  arg2: Expression; 
  
  constructor(operator: Token, arg1: Expression, arg2: Expression, ) {
    super();
    this.operator = operator;
    this.arg1 = arg1;
    this.arg2 = arg2;
    
  }
  public accept(visitor: Visitor) {
    visitor.visitBinary(this);
  }
}

class Unary extends Expression {
  operator: Token; 
  arg1: Expression; 
  
  constructor(operator: Token, arg1: Expression, ) {
    super();
    this.operator = operator;
    this.arg1 = arg1;
    
  }
  public accept(visitor: Visitor) {
    visitor.visitUnary(this);
  }
}

class Literal extends Expression {
  arg: string | number | boolean; 
  
  constructor(arg: string | number | boolean, ) {
    super();
    this.arg = arg;
    
  }
  public accept(visitor: Visitor) {
    visitor.visitLiteral(this);
  }
}

// abstract class
class Visitor {
  public visitBinary(host: Binary): any {
    throw new Error("Method in abstract class cannot be called");
  }public visitUnary(host: Unary): any {
    throw new Error("Method in abstract class cannot be called");
  }public visitLiteral(host: Literal): any {
    throw new Error("Method in abstract class cannot be called");
  }
}

export {
  Visitor, Expression, Binary, Unary, Literal, 
}
