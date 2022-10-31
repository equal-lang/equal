# Equal - the Esoteric Programming Language HTML

## Features
### Control Flow
#### Comments
```html
<!-- comments about the code -->
```

#### Code blocks
```html
<div>
  <!-- code inside -->
</div>
<!-- variable outside the current div block can be accessed, variable in the global scope can be modified -->
<!-- variable in children div blocks cannot be accessed or modified -->
```
#### If/else statements
```html
<h1>
  <!-- expression -->
  <!-- statements (execute if expression evaluates to true) -->
</h1>
<h2>
  <!-- else if statements -->
</h2>
<h6>
  <!-- else statement -->
</h6>
```

#### While loops
```html
<p>
  <!-- expression -->
  <!-- statements (execute until expression evaluates to false) -->
</p>
```


### Variables
#### Assignment
```html
<!-- declare and reassign variable -->
<a id="name_of_variable" class="global">
  value
</a>
<!-- set class value to global to modify global value -->
<!-- refer to variable -->
<a href="name_of_variable">
</a>
<!-- variables must be initialized -->
<!-- only href considered in expression -->
```

##### Types
- dynamically typed
- three types available: string, number, boolean
- if ```!isNaN(Number(expression))``` is true, the variable is a number
- else if ```expression``` matches true or false exactly, the variable is a boolean
- else if the variable is a string
- if nothing is assigned explicitly, the value of the variable is ```""```
- implict conversions between types will throw error

##### Notes
- variables can be redefined
- expressions must be assigned to variables to be used later

### Functions
- Only global functions supported
- Functions must be declared (and initialized) before being used
#### Definition
```html
<form id="name_of_function">
  <input id="name_of_param1">
  <input id="name_of_param2">
  <input id="name_of_param3">
  <!-- etc -->
  <div>
  <!-- code to be executed -->
  <!-- optional, return value defaults to 0 -->
  <input type="submit"> 
  <!-- if there is a input submit, an expression must be returned -->
  </div>
</form>
```
#### Reference
```html
<!-- for is optional and is for readability purposes only-->
<form title="name_of_function">
  <label for="name_of_param1">
    arg1
  </label>
  <label for="name_of_param2">
    arg2
  </label>
  <label for="name_of_param3">
    arg3
  </label>
  <!-- etc -->
</form>
```
### Operators
- only operators that cannot be easily constructed with other operators are provided

```html
<!-- arithmetic -->
<form title="+">
  <label for="name_of_param1">num1</label>
  <label for="name_of_param2">num2</label>
  <!-- more args possible -->
</form>
<!-- possible titles: "+" "-" "*" "/" -->
<!-- no division by zero -->
<!-- plus does not work on strings, use concat instead -->

<!-- comparsion -->
<form title="==">
  <label for="name_of_param1">expression1</label>
  <label for="name_of_param2">expression2</label>
  <!-- only two args -->
</form>
<!-- possible titles: "==" "!=" ">" "<" -->
<!-- strict equal and not equal -->

<!-- logic -->
<!-- (1) -->
<form title="!">
  <label for="name_of_param1">expression1</label>
  <!-- only one arg -->
</form>
<!-- (2) -->
<form title="&&">
  <label for="name_of_param1">expression1</label>
  <label for="name_of_param2">expression2</label>
  <!-- more args possible -->
</form>
<!-- possible titles for (1): "!" -->
<!-- possible titles for (2): "&&" "||" -->
<!-- &&: return true if all evaluate to true -->
<!-- ||: return true if one evaluates to true -->

```
#### precedence (lower to higher):
- expression
- logic
- equality
- comparsion
- addition
- multiplication
- unary
- literal

- TODO: since all expressions are nested inside forms, is precedence really needed?

#### [Grammar](GRAMMAR.md)
##### Notes
- do not change the order of classes if possible
- add ending tags, even if they are optional

### Standard library
#### String manipulation
```html
<!-- concat -->
<form title="con" class="str1 str2"></form>
<!-- substring -->
<!-- (index1 inclusive, index2 exclusive) -->
<form title="sub" class="str index1 index2"></form>
```

#### Reserved function names
- \+ , \- , \* , /, !, ==, !=, >, <, &&, ||


### IO
#### Content
```html
<!-- empty src value means input, and alt, which defaults to 1, represents the number of whitespace-separated values the input would take -->
<img src="" alt="num"> 
<span>
<!-- output the expressions here -->
</span>
```

### Notes
- Most attributes
  - ```id``` is usually used when defining the name of variables or functions
  - ```href``` and ```title``` are used to refer to variables and functions that are already defined
  - ```for``` is used to refer to the parameter when passing in values
- Tagnames
  - tbc




## References
- The vast majority of code in this repository is written by me and the errors are mine alone
- Credit to [Crafting Interpreters](https://craftinginterpreters.com/representing-code.html) for inspiring much of the structure of the interpreter
- Other references:
  - [HTML Standards](https://html.spec.whatwg.org/)