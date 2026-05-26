import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import type { Extension } from "@codemirror/state";

export function getCodeMirrorLanguage(lang?: string): Extension {
  const key = (lang || "javascript").toLowerCase().trim();

  switch (key) {
    case "html":
    case "markup":
    case "htm":
      return html();
    case "typescript":
    case "ts":
      return javascript({ typescript: true });
    case "jsx":
      return javascript({ jsx: true });
    case "tsx":
      return javascript({ jsx: true, typescript: true });
    case "javascript":
    case "js":
    default:
      return javascript();
  }
}
