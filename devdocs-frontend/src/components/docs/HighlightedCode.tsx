"use client";

import dynamic from "next/dynamic";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { normalizeLanguage } from "@/lib/normalize-language";
import { cn } from "@/lib/utils";

const SyntaxHighlighter = dynamic(
  () => import("react-syntax-highlighter/dist/esm/prism").then((m) => m.default),
  {
    ssr: false,
    loading: () => (
      <div className="overflow-x-auto p-4 text-sm leading-relaxed">
        <div className="h-24 animate-pulse rounded bg-muted/40" />
      </div>
    ),
  }
);

interface HighlightedCodeProps {
  code: string;
  language?: string;
  className?: string;
}

export function HighlightedCode({ code, language, className }: HighlightedCodeProps) {
  const lang = normalizeLanguage(language);

  return (
    <div className={cn("overflow-x-auto", className)}>
      <SyntaxHighlighter
        language={lang}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: "1rem",
          background: "hsl(222 47% 7%)",
          fontSize: "0.875rem",
          lineHeight: 1.625,
        }}
        codeTagProps={{
          style: {
            fontFamily: 'var(--font-mono, "IBM Plex Mono", ui-monospace, Menlo, monospace)',
          },
        }}
        PreTag="div"
        showLineNumbers={false}
      >
        {code.trimEnd()}
      </SyntaxHighlighter>
    </div>
  );
}
