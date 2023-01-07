import {basicSetup, EditorView} from "codemirror"
import {html} from "@codemirror/lang-html"
const initialText = 
`<form id="fib">
  <!-- function fib(n) -->
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
    <label>15</label>
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
</p>
`

let editor = new EditorView({
  doc: initialText,
  extensions: [
    basicSetup, 
    html(),
    EditorView.updateListener.of((viewUpdate) => {
      const fileOpened = viewUpdate.transactions.length > 0 && viewUpdate.transactions[0].isUserEvent("open.file");
      document.dispatchEvent(new CustomEvent("editor-change", {detail: { viewUpdate: viewUpdate, fileOpened: fileOpened}}));
    })
  ],

  parent: document.getElementById("editor")
})

export { editor }