import "./equal-paper.css";
import nav from "./nav.hbs";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("nav").innerHTML = nav({test: "123"})

})

// disable print channel
document.getElementById("test").innerText = new equal.Equal(undefined, "VERBOSE", "<span>hello world</span>", (str) => undefined).run();