import {basicSetup, EditorView} from "codemirror"
import {html} from "@codemirror/lang-html"

let editor = new EditorView({
  doc: "<div>hello world</div>",
  extensions: [basicSetup, html()],
  parent: document.getElementById("test1")
})

// export?
console.log(editor)

export { editor }


