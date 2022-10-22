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
```
#### If/else statements
```html
<!--must have a wrapping div block for if/else statements-->
<div>
  <h1 class="expression_that_evaluates_to_boolean">
    <!-- execute if h1 class evaluates to true-->
  </h1>
  <h2 class="expression">
    <div>
      <h1>
        <!-- a nested if/else statement-->
      </h1>
    </div>
  </h2>
  <!-- continues until h6 -->
</div>
```

#### While loops
```html
<!-- execute until p class evaluates to false -->
<p class="expression">
  <!-- execute -->
</p>
```


### Variables
#### Assignment
```html
<!-- local variable -->
<a id="name_of_variable">
  value
</a>
<!-- global variable -->
<a href="name_of_variable">
  value
</a>
```

##### Types
- three types available: string, number, boolean
- if ```!isNaN(Number(expression))``` is true, the variable is a number
- else if ```expression``` matches true or false exactly, the variable is a boolean
- else if the variable is a string
- if nothing is assigned explicitly, the value of the variable is ```""```
- implict conversions between types will throw error
##### Scope
- an variable is available in the div block the variable is defined in as well as all its children  
##### Notes
- variables can be redefined
- expressions must be assigned to variables to be used later


### Functions
#### Definition
```html
<form id="name_of_function">
  <input id="name_of_param1">
  <input id="name_of_param2">
  <input id="name_of_param3">
  <!-- etc -->
  <div>
    <!-- code to be executed -->
  </div>
  <input type="submit" class="expression_to_be_returned">
</form>
```
#### Reference
```html
<a id="name_of_value">
  <form title="name_of_function" class="param1 param2 param3">
</a>
```
### Operators
```html
<!-- arithmetic -->
<form title="+" class="num1 num2 num3 num4"></form> <!-- more args possible -->
<form title="-" class="num1 num2 num3 num4"></form> <!-- more args possible -->
<form title="*" class="num1 num2 num3 num4"></form> <!-- more args possible -->
<form title="/" class="num1 num2 num3 num4"></form> <!-- b != 0 --> <!-- more args possible -->
<!-- logic -->
<form title="!" class="expression1"></form>
<form title="==" class="expression1 expression2"></form>
<form title="!=" class="expression1 expression2"></form>
<form title=">" class="expression1 expression2"></form>
<form title="<" class="expression1 expression2"></form>
<form title="&&" class="expression1 expression2 expression3 expression4"></form> <!-- more args possible --> <!-- return true if all evaluate to true -->
<form title="||" class="expression1 expression2 expression3 expression4"></form> <!-- more args possible --> <!-- return true if one evaluates to true -->
```
#### Grammar so far
```txt
expression -> logic
logic -> '<form title="' ('&&' | '||') '" class="' equality ' ' (equality)* '"></form>' 
equality -> '<form title="' ('==' | '!=') '" class="' comparsion ' ' comparsion '"></form>'
comparsion -> '<form title="' ('>' | '<') '" class="' addition ' ' addition '"></form>'
addition -> '<form title="' ('+' | '-') '" class="' multiplication ' ' (multiplication)* '"></form>'
multiplication -> '<form title="' ('*' | '/') '" class="' unary ' ' (unary)* '"></form>'  
unary -> '<form title="' '!' '" class="' primary '"></form>' 
primary -> STRING | NUMBER | BOOLEAN
```
- do not change the order of classes if possible

### Standard library
#### String manipulation
```html
<!-- concat -->
<form title="con" class="str1 str2"></form>
<!-- substring -->
<!-- (index1 inclusive, index2 exclusive) -->
<form title="sub" class="str index1 index2"></form>
```
#### Conversion between types
```html
<!-- string to number (only when possible) -->
<form title="sn" class="str"></form>
<!-- number to string -->
<form title="ns" class="num"></form>
```
#### ASCII
```html
<!-- string to ascii -->
<form title="sa" class="str"></form>
<!-- ASCII to string -->
<form title="as" class="ascii_string"></form>
```

#### Reserved function names
- \+ , \- , \* , /, !, ==, !=, >, <, &&, ||
- as, ns
- con, sub
- sa, sn

### IO
#### Streams
```html
<head>
  <!-- set source of input stream, default to stdin if not set -->
  <link rel="stylesheet" href="file.in" type="in">
  <!-- set destination of output stream, default to stdout if not set -->
  <link rel="stylesheet" href="file.out" type="out">
</head>
```
#### Content
```html
<!-- empty src value means input, and alt, which defaults to 1, represents the number of whitespace-separated values the input would take -->
<img src="" alt="num"> 
<!-- output the variables specified in src value -->
<img src="variable1 variable2"> <!-- etc -->
```

### Notes
- ```class``` usually stores expressions to be evaluated
- ```id``` is usually used when defining a variable or a function
- ```href``` is used later to refer to the variable
- ```title``` is used later to refer to the function



## References
- The vast majority of code in this repository is written by me and the errors are mine alone
- Credit to [Crafting Interpreters](https://craftinginterpreters.com/representing-code.html) for inspiring much of the structure of the interpreter
- Other references:
  - [HTML Standards](https://html.spec.whatwg.org/)