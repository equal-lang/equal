```html
PROGRAM -> SCOPE*

SCOPE -> 
((<div>
  ASSIGNMENT
</div>)*
| ASSIGNMENT*)

ASSIGNMENT -> 
(<a id="identifier">
  EXPRESSION
</a>
| STATEMENT)

STATEMENT -> LOOP

LOOP -> 
(<p>
  EXPRESSION
  SCOPE*
</p>
| CONDITIONAL_STATEMENT)

CONDITIONAL_STATEMENT -> 
(<h1>
  EXPRESSION
  SCOPE*
</h1>
(<h2>
  EXPRESSION
  SCOPE*
<h2>)?
(<h3>
  EXPRESSION
  SCOPE*
<h3>)?
(<h4>
  EXPRESSION
  SCOPE*
<h4>)?
(<h5>
  EXPRESSION
  SCOPE*
<h5>)?
(<h6>
  SCOPE*
</h6>)?
| PRINT_STATEMENT)

PRINT_STATEMENT -> 
(<span>
  EXPRESSION*
</span>
| EXPRESSION_STATEMENT)

EXPRESSION_STATEMENT -> EXPRESSION

EXPRESSION -> LOGIC

LOGIC -> 
(<form title="(&& | ||)">
  <label>EXPRESSION</label>
  (<label>EXPRESSION</label>)+
</form>
| EQUALITY)

EQUALITY -> 
(<form title="(== | !=)">
  <label>EXPRESSION</label>
  <label>EXPRESSION</label>
</form>
| COMPARSION)

COMPARSION -> 
(<form title="(> | <)">
  <label>EXPRESSION</label>
  <label>EXPRESSION</label>
</form>
| ADDITION)

ADDITION -> 
(<form title="(+ | -)">
  <label>EXPRESSION</label>
  (<label>EXPRESSION</label>)+
</form>
| MULTIPLICATION)

MULTIPLICATION -> 
(<form title="(* | /)">
  <label>EXPRESSION</label>
  (<label>EXPRESSION</label>)+
</form>
| UNARY)

UNARY -> 
(<form title="!">
  <label>EXPRESSION</label>
</form>
| LITERAL)

LITERAL -> 
(string | number | boolean | IDENTIFIER)

IDENTIFIER ->
(<a href="identifier">
</a>)

```