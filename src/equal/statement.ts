import { Expression } from "./expression";

interface StatementVisitor {
  visitAssignment(host: Assignment): any;
  visitExpressionStatement(host: ExpressionStatement): any;
  
}

function isStatementVisitor(cls: any): cls is StatementVisitor {
  return cls.visitAssignment !== undefined &&cls.visitExpressionStatement !== undefined ;
} 

// abstract class
class Statement {
  constructor() {
  }
  public accept(visitor: StatementVisitor) {
    if (!isStatementVisitor(visitor)) throw new Error("Invalid visitor type");
  }
}

class Assignment extends Statement {
  name: string; 
  expression: Expression; 
  
  constructor(name: string, expression: Expression, ) {
    super();
    this.name = name;
    this.expression = expression;
    
  }
  public accept(visitor: StatementVisitor) {
    super.accept(visitor);
    return visitor.visitAssignment(this);
  }
}

class ExpressionStatement extends Statement {
  expression: Expression; 
  
  constructor(expression: Expression, ) {
    super();
    this.expression = expression;
    
  }
  public accept(visitor: StatementVisitor) {
    super.accept(visitor);
    return visitor.visitExpressionStatement(this);
  }
}

export {
  StatementVisitor, isStatementVisitor, Statement, Assignment, ExpressionStatement, 
}
