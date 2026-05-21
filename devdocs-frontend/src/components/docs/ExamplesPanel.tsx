"use client";

import { useState } from "react";
import { Check, Copy, Heart, Terminal, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { api } from "@/api/client";
import type { Example } from "@/types";

const DIFF_COLORS = {
  beginner:     { bg: "bg-green-500/10",  text: "text-green-400",  border: "border-green-500/20"  },
  intermediate: { bg: "bg-yellow-500/10", text: "text-yellow-400", border: "border-yellow-500/20" },
  advanced:     { bg: "bg-red-500/10",    text: "text-red-400",    border: "border-red-500/20"    },
};

function ExampleCard({ example }: { example: Example }) {
  const [copied, setCopied] = useState(false);
  const [likes, setLikes]   = useState(example.likeCount);
  const [open, setOpen]     = useState(true);
  const dc = DIFF_COLORS[example.difficulty];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(example.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLike = async () => {
    try {
      const res = await api.likeExample(example._id);
      if (res.data) setLikes(res.data.likeCount);
    } catch {}
  };

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {/* Card header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-3 min-w-0">
          <Terminal className="w-4 h-4 text-muted-foreground shrink-0" />
          <div className="min-w-0">
            <p className="font-medium text-sm truncate">{example.title}</p>
            {example.description && (
              <p className="text-xs text-muted-foreground truncate">{example.description}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className={cn("text-[10px] px-2 py-0.5 rounded-full border font-medium capitalize", dc.bg, dc.text, dc.border)}>
            {example.difficulty}
          </span>
          <button onClick={() => setOpen(!open)} className="p-1.5 rounded hover:bg-accent transition-colors">
            {open ? <ChevronUp className="w-3.5 h-3.5 text-muted-foreground" /> : <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />}
          </button>
        </div>
      </div>

      {open && (
        <>
          {/* Code */}
          <div className="relative bg-code-bg">
            <div className="flex items-center justify-between px-4 py-2 border-b border-border/50">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-wide">{example.codeLanguage}</span>
              <button onClick={handleCopy} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
              <code className="font-mono text-[#abb2bf]">{example.code}</code>
            </pre>
          </div>

          {/* Expected output */}
          {example.expectedOutput && (
            <div className="px-4 py-3 border-t border-border bg-muted/30">
              <p className="text-xs text-muted-foreground mb-1.5 font-medium uppercase tracking-wide">Output</p>
              <pre className="text-xs font-mono text-green-400">{example.expectedOutput}</pre>
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between px-4 py-2.5 border-t border-border">
            <div className="flex flex-wrap gap-1">
              {example.tags.map((tag) => (
                <span key={tag} className="text-[10px] bg-muted text-muted-foreground px-1.5 py-0.5 rounded">
                  #{tag}
                </span>
              ))}
            </div>
            <button onClick={handleLike} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-red-400 transition-colors">
              <Heart className="w-3.5 h-3.5" />
              {likes}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export function ExamplesPanel({ examples }: { examples: Example[] }) {
  if (!examples.length) return null;

  return (
    <div className="mt-10">
      <div className="flex items-center gap-2 mb-5">
        <div className="h-4 w-1 rounded-full bg-primary" />
        <h2 className="font-mono font-bold text-lg">Code Examples</h2>
        <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full ml-1">{examples.length}</span>
      </div>
      <div className="space-y-4">
        {examples.sort((a, b) => a.order - b.order).map((ex) => (
          <ExampleCard key={ex._id} example={ex} />
        ))}
      </div>
    </div>
  );
}
