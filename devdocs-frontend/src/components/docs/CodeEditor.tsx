"use client";

import CodeMirror from "@uiw/react-codemirror";
import { oneDark } from "@codemirror/theme-one-dark";
import { EditorView } from "@codemirror/view";
import { cn } from "@/lib/utils";
import { getCodeMirrorLanguage } from "@/lib/codemirror-language";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  className?: string;
}

export function CodeEditor({ value, onChange, language, className }: CodeEditorProps) {
  return (
    <CodeMirror
      value={value}
      height="100%"
      theme={oneDark}
      extensions={[getCodeMirrorLanguage(language), EditorView.lineWrapping]}
      onChange={onChange}
      className={cn(
        "h-full min-h-[280px] text-sm",
        "[&_.cm-editor]:h-full [&_.cm-editor]:outline-none",
        "[&_.cm-scroller]:min-h-[280px] font-mono",
        className
      )}
      basicSetup={{
        lineNumbers: true,
        foldGutter: true,
        highlightActiveLine: true,
        bracketMatching: true,
        autocompletion: true,
        indentOnInput: true,
      }}
    />
  );
}
