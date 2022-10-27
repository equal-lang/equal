```html
PROGRAM -> ASSIGNMENT*
ASSIGNMENT -> 
(<a id="(identifier)">
  EXPRESSION
</a>
| STATEMENT)

STATEMENT -> EXPRESSION_STATEMENT
EXPRESSION_STATEMENT -> EXPRESSION

EXPRESSION -> LOGIC

LOGIC -> 
(<form title="(&& | ||)">
  <label>EQUALITY</label>
  (<label>EQUALITY</label>)+
</form>
| EQUALITY)

EQUALITY -> 
(<form title="(== | !=)">
  <label>COMPARSION</label>
  <label>COMPARSION</label>
</form>
| COMPARSION)

COMPARSION -> 
(<form title="(> | <)">
  <label>ADDITION</label>
  <label>ADDITION</label>
</form>
| ADDITION)

ADDITION -> 
(<form title="(+ | -)">
  <label>MULTIPLICATION</label>
  (<label>MULTIPLICATION</label>)+
</form>
| MULTIPLICATION)

MULTIPLICATION -> 
(<form title="(* | /)">
  <label>UNARY</label>
  (<label>UNARY</label>)+
</form>
| UNARY)

UNARY -> 
(<form title="!">
  <label>LITERAL</label>
</form>
| LITERAL)

LITERAL -> 
(string | number | boolean | IDENTIFIER)

IDENTIFIER ->
(<a href="identifier">
</a>)

```