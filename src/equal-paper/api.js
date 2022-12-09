// url parameter is meant to be manipulable, and the code is open-sourced
// redirect if no url parameter
new equal.Equal({
  source: `<form id="fib">
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
</p>`,
  mode: "VERBOSE"
}).run();

// delete worker and such
// do not include file
// make request to api and use the answer