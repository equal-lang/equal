import {basicSetup, EditorView} from "codemirror"
import {html} from "@codemirror/lang-html"

new EditorView({
  doc: "<div>hello world</div>",
  extensions: [basicSetup, html()],
  parent: document.getElementById("test1")
})
