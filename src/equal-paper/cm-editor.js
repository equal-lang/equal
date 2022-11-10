import {basicSetup, EditorView} from "codemirror"
import {html} from "@codemirror/lang-html"

let editor = new EditorView({
  doc: "<div>Equal, not HTML</div>",
  extensions: [
    basicSetup, 
    html(),
    EditorView.updateListener.of((viewUpdate) => {
      document.dispatchEvent(new CustomEvent("editor-change", {detail: viewUpdate}));
    })
  ],

  parent: document.getElementById("editor")
})

export { editor }