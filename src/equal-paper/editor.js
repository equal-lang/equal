import {basicSetup, EditorView} from "codemirror"
import {html} from "@codemirror/lang-html"

let editor = new EditorView({
  doc: "<div>Equal, not HTML</div>",
  extensions: [basicSetup, html()],
  parent: document.getElementById("editor")
})

export { editor }


