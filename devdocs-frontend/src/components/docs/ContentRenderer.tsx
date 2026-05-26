"use client";

import { AlertTriangle, Info, Lightbulb, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ContentBlock } from "@/types";
import { HighlightedCode } from "@/components/docs/HighlightedCode";
import { CodeBlockActions } from "@/components/docs/CodeBlockActions";

function CodeBlock({ content, language }: { content: string; language?: string }) {
  return (
    <div className="my-5 rounded-xl overflow-hidden border border-border bg-code-bg">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground font-mono uppercase tracking-wide">
            {language || "code"}
          </span>
        </div>
        <CodeBlockActions code={content} language={language} />
      </div>
      <HighlightedCode code={content} language={language} />
    </div>
  );
}

function NoteBox({ type, content }: { type: "note" | "warning" | "tip"; content: string }) {
  const variants = {
    note:    { icon: Info,          bg: "bg-blue-500/10",   border: "border-blue-500/30",  text: "text-blue-400",   label: "Note"    },
    warning: { icon: AlertTriangle, bg: "bg-amber-500/10",  border: "border-amber-500/30", text: "text-amber-400",  label: "Warning" },
    tip:     { icon: Lightbulb,     bg: "bg-green-500/10",  border: "border-green-500/30", text: "text-green-400",  label: "Tip"     },
  };
  const v = variants[type];
  const Icon = v.icon;

  return (
    <div className={cn("my-5 flex gap-3 rounded-xl border p-4", v.bg, v.border)}>
      <Icon className={cn("w-4 h-4 mt-0.5 shrink-0", v.text)} />
      <div>
        <p className={cn("text-sm font-semibold mb-1", v.text)}>{v.label}</p>
        <p className="text-sm text-muted-foreground leading-relaxed">{content}</p>
      </div>
    </div>
  );
}

function TableBlock({ headers, rows }: { headers?: string[]; rows?: string[][] }) {
  if (!headers?.length && !rows?.length) return null;
  return (
    <div className="my-5 overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-sm">
        {headers && headers.length > 0 && (
          <thead>
            <tr className="border-b border-border bg-muted/50">
              {headers.map((h, i) => (
                <th key={i} className="text-left px-4 py-2.5 font-semibold text-foreground">{h}</th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {rows?.map((row, i) => (
            <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-2.5 text-muted-foreground">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ContentRenderer({ blocks }: { blocks: ContentBlock[] }) {
  const sorted = [...blocks].sort((a, b) => a.order - b.order);

  return (
    <div className="prose-docs">
      {sorted.map((block) => {
        switch (block.type) {
          case "heading":
            return <h2 key={block._id}>{block.content}</h2>;

          case "text":
            return <p key={block._id}>{block.content}</p>;

          case "code":
            return <CodeBlock key={block._id} content={block.content} language={block.language} />;

          case "note":
            return <NoteBox key={block._id} type="note" content={block.content} />;

          case "warning":
            return <NoteBox key={block._id} type="warning" content={block.content} />;

          case "tip":
            return <NoteBox key={block._id} type="tip" content={block.content} />;

          case "list":
            return (
              <div key={block._id} className="my-4">
                {block.content && <p className="mb-2 text-muted-foreground">{block.content}</p>}
                <ul>
                  {block.items?.map((item, i) => (
                    <li key={i} className="text-muted-foreground">{item}</li>
                  ))}
                </ul>
              </div>
            );

          case "table":
            return <TableBlock key={block._id} headers={block.headers} rows={block.rows} />;

          case "image":
            return (
              <figure key={block._id} className="my-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={block.content} alt={block.caption || ""} className="rounded-xl border border-border w-full" />
                {block.caption && <figcaption className="text-center text-sm text-muted-foreground mt-2">{block.caption}</figcaption>}
              </figure>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
