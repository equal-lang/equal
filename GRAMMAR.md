```html
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
  (<label>COMPARSION</label>)+
</form>
| COMPARSION)

COMPARSION -> 
(<form title="(> | <)">
  <label>ADDITION</label>
  (<label>ADDITION</label>)+
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
(STRING | NUMBER | BOOLEAN)
```