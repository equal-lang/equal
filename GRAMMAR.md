```html
PROGRAM -> STATEMENT*

STATEMENT -> SCOPE

SCOPE -> 
((<div>
  ASSIGNMENT
</div>)*
| ASSIGNMENT*)

ASSIGNMENT -> 
(<a id="ID" (class="global")?>
  EXPRESSION
</a>
| FUNCTION_DECLARATION)

FUNCTION_DECLARATION -> 
(<form id="ID">
  (<input id="ID">)*
  <div>
    (STATEMENT)*
  </div>
</form>
| RETURN_STATEMENT)

RETURN_STATEMENT -> 
(<input type="submit" value="ID">
EXPRESSION
| LOOP)

LOOP -> 
(<p>
  EXPRESSION
  STATEMENT*
</p>
| CONDITIONAL_STATEMENT)

CONDITIONAL_STATEMENT -> 
(<h1>
  EXPRESSION
  STATEMENT*
</h1>
(<h2>
  EXPRESSION
  STATEMENT*
<h2>)?
(<h3>
  EXPRESSION
  STATEMENT*
<h3>)?
(<h4>
  EXPRESSION
  STATEMENT*
<h4>)?
(<h5>
  EXPRESSION
  STATEMENT*
<h5>)?
(<h6>
  STATEMENT*
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
| CALL)

CALL -> 
(<form title="ID">
  (<label>EXPRESSION</label>)*
</form>
| PRIMARY)

PRIMARY -> 
(string | number | boolean | IDENTIFIER)

IDENTIFIER ->
(<a href="ID">
</a>)

ID -> string
```