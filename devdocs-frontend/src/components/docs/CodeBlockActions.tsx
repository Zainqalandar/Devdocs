"use client";

import { useState } from "react";
import { Check, Copy, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { isRunnableLanguage, openCodeRunner } from "@/lib/run-code";

interface CodeBlockActionsProps {
  code: string;
  language?: string;
  /** Override auto-detect; examples use backend `isRunnable` */
  runnable?: boolean;
  className?: string;
}

export function CodeBlockActions({ code, language, runnable, className }: CodeBlockActionsProps) {
  const [copied, setCopied] = useState(false);
  const canRun = runnable ?? isRunnableLanguage(language);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = () => {
    openCodeRunner(code, language);
  };

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {canRun && (
        <button
          type="button"
          onClick={handleRun}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded hover:bg-white/5"
        >
          <Play className="w-3.5 h-3.5 text-green-400" />
          Run
        </button>
      )}
      <button
        type="button"
        onClick={handleCopy}
        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded hover:bg-white/5"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}
