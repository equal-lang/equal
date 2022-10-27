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

STATEMENT -> EXPRESSION_STATEMENT

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