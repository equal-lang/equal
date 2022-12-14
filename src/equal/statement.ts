import { Expression, Literal } from "./expression";

interface StatementVisitor {
  visitScope(host: Scope): any;
  visitAssignment(host: Assignment): any;
  visitLoop(host: Loop): any;
  visitConditionalStatement(host: ConditionalStatement): any;
  visitExpressionStatement(host: ExpressionStatement): any;
  visitPrintStatement(host: PrintStatement): any;
  visitFunctionDeclaration(host: FunctionDeclaration): any;
  visitReturnStatement(host: ReturnStatement): any;
  
}

function isStatementVisitor(cls: any): cls is StatementVisitor {
  return cls.visitScope !== undefined &&cls.visitAssignment !== undefined &&cls.visitLoop !== undefined &&cls.visitConditionalStatement !== undefined &&cls.visitExpressionStatement !== undefined &&cls.visitPrintStatement !== undefined &&cls.visitFunctionDeclaration !== undefined &&cls.visitReturnStatement !== undefined ;
} 

// abstract class
class Statement {
  constructor() {
  }
  public accept(visitor: StatementVisitor) {
    if (!isStatementVisitor(visitor)) throw new Error("Invalid visitor type");
  }
}

class Scope extends Statement {
  statements: Statement[]; 
  
  constructor(statements: Statement[], ) {
    super();
    this.statements = statements;
    
  }
  public accept(visitor: StatementVisitor) {
    super.accept(visitor);
    return visitor.visitScope(this);
  }
}

class Assignment extends Statement {
  name: string; 
  expression: Expression; 
  scope: string | undefined; 
  
  constructor(name: string, expression: Expression, scope: string | undefined, ) {
    super();
    this.name = name;
    this.expression = expression;
    this.scope = scope;
    
  }
  public accept(visitor: StatementVisitor) {
    super.accept(visitor);
    return visitor.visitAssignment(this);
  }
}

class Loop extends Statement {
  condition: Expression; 
  statements: Statement[]; 
  
  constructor(condition: Expression, statements: Statement[], ) {
    super();
    this.condition = condition;
    this.statements = statements;
    
  }
  public accept(visitor: StatementVisitor) {
    super.accept(visitor);
    return visitor.visitLoop(this);
  }
}

class ConditionalStatement extends Statement {
  conditions: Expression[]; 
  statements: Statement[][]; 
  
  constructor(conditions: Expression[], statements: Statement[][], ) {
    super();
    this.conditions = conditions;
    this.statements = statements;
    
  }
  public accept(visitor: StatementVisitor) {
    super.accept(visitor);
    return visitor.visitConditionalStatement(this);
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

class PrintStatement extends Statement {
  expressions: Expression[]; 
  
  constructor(expressions: Expression[], ) {
    super();
    this.expressions = expressions;
    
  }
  public accept(visitor: StatementVisitor) {
    super.accept(visitor);
    return visitor.visitPrintStatement(this);
  }
}

class FunctionDeclaration extends Statement {
  name: string; 
  params: string[]; 
  body: Statement[]; 
  
  constructor(name: string, params: string[], body: Statement[], ) {
    super();
    this.name = name;
    this.params = params;
    this.body = body;
    
  }
  public accept(visitor: StatementVisitor) {
    super.accept(visitor);
    return visitor.visitFunctionDeclaration(this);
  }
}

class ReturnStatement extends Statement {
  expression: Expression; 
  
  constructor(expression: Expression, ) {
    super();
    this.expression = expression;
    
  }
  public accept(visitor: StatementVisitor) {
    super.accept(visitor);
    return visitor.visitReturnStatement(this);
  }
}

export {
  StatementVisitor, isStatementVisitor, Statement, Scope, Assignment, Loop, ConditionalStatement, ExpressionStatement, PrintStatement, FunctionDeclaration, ReturnStatement, 
}
