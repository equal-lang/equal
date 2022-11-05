import "./equal-paper.css";
import nav from "./nav.hbs";

const source = 
`<form id="fib">
<input id="n">
<div>
<h1>
  <!--  if (n < 2)    -->
  <form title="<">
    <label><a href="n"></a></label>
    <label>2</label>
  </form>
  <!-- return n -->
  <input type="submit">
  <a href="n"></a>
</h1>

<!--   return fib(n-2) + fib(n-1) -->
<input type="submit">
<form title="+">
  <label>
    <form title="fib">
      <label>
        <form title="-">
          <label>
            <a href="n"></a>
          </label>
          <label>2</label>
        </form>
      </label>
    </form>
  </label>

  <label>
    <form title="fib">
      <label>
        <form title="-">
          <label>
            <a href="n"></a>
          </label>
          <label>1</label>
        </form>
      </label>
    </form>
  </label>
</form>


</div>

</form>

<!-- var i = ? -->
<a id="i">0</a>

<!-- while (i < ?)  -->
<p>
<form title="<">
  <label>
    <a href="i"></a>
  </label>
  <label>20</label>
</form>

<!-- console.log(fib(i)) -->
<span>
  <form title="fib">
    <label>
      <a href="i"></a>
    </label>
  </form>
</span>

<!-- i = i + ? -->
<a id="i" class="global"> 
  <form title="+">
    <label>
      <a href="i"></a>
    </label>
    <label>1</label>
  </form>
</a>
</p>`

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("nav").innerHTML = nav({test: "123"})
  // disable print channel
document.getElementById("output").innerText = new equal.Equal(undefined, "VERBOSE", source, (str) => logConsole(str)).run();

const iframe = document.getElementById("i").contentDocument;

iframe.open();
iframe.write(`<h1>ten</h1>
<div>long doc</div>
<div>long doc</div>
<div>long doc</div>
<div>long doc</div>
<div>long doc</div>
<div>long doc</div>
<div>long doc</div>
<div>long doc</div>
<div>long doc</div>
<div>long doc</div>
<div>long doc</div>
<div>long doc</div>
<div>long doc</div>
<div>long doc</div>
<div>long doc</div>
<div>long doc</div>`);
iframe.close();

})

function getValue() {
  return editor.editor.viewState.state.doc.toString();
}

document.getElementById("test3").addEventListener("click", () => {
  document.getElementById("test2").innerText = getValue();
})

function logConsole(val) {
  document.getElementById("test2").innerText += val;
}