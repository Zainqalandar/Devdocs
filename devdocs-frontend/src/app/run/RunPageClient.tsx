"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Play, Terminal, ArrowLeft } from "lucide-react";
import { buildRunnerDocument, isRunMessage, loadRunnerPayload } from "@/lib/run-code";
import { CodeEditor } from "@/components/docs/CodeEditor";

type LoadState = "loading" | "ready" | "missing";

export function RunPageClient() {
  const searchParams = useSearchParams();
  const key = searchParams.get("key");
  const langParam = searchParams.get("lang") || "javascript";

  const [payload, setPayload] = useState<{ code: string; language: string } | null>(null);
  const [editorCode, setEditorCode] = useState("");
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [runKey, setRunKey] = useState(0);

  useEffect(() => {
    if (!key) {
      setLoadState("missing");
      return;
    }

    let settled = false;

    const applyPayload = (data: { code: string; language: string }) => {
      if (settled) return;
      settled = true;
      setPayload(data);
      setEditorCode(data.code);
      setLoadState("ready");
    };

    const tryStorage = () => {
      const data = loadRunnerPayload(key);
      if (data) applyPayload(data);
      return !!data;
    };

    if (tryStorage()) {
      return;
    }

    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      if (!isRunMessage(event.data) || event.data.key !== key) return;
      applyPayload({ code: event.data.code, language: event.data.language });
    };

    window.addEventListener("message", onMessage);

    const retryTimers = [0, 50, 150, 400].map((delay) =>
      window.setTimeout(() => {
        if (!settled) tryStorage();
      }, delay)
    );

    const failTimer = window.setTimeout(() => {
      if (!settled) {
        settled = true;
        setLoadState("missing");
      }
    }, 800);

    return () => {
      window.removeEventListener("message", onMessage);
      retryTimers.forEach(clearTimeout);
      clearTimeout(failTimer);
    };
  }, [key]);

  const language = payload?.language ?? langParam;

  const runnerHtml = useMemo(() => {
    if (!editorCode) return "";
    return buildRunnerDocument(editorCode, language);
  }, [editorCode, language, runKey]);

  const handleRun = useCallback(() => {
    setRunKey((k) => k + 1);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        handleRun();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleRun]);

  if (!key) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
        <p className="text-muted-foreground text-center">
          No code to run. Use the <strong className="text-foreground">Run</strong> button on a code block in the docs.
        </p>
      </div>
    );
  }

  if (loadState === "loading") {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
        <p className="text-muted-foreground text-sm">Loading code…</p>
      </div>
    );
  }

  if (loadState === "missing" || !payload) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
        <p className="text-muted-foreground text-center max-w-md">
          Code session expired or not found. Go back to the docs and click{" "}
          <strong className="text-foreground">Run</strong> again.
        </p>
      </div>
    );
  }

  const isHtml = ["html", "markup", "htm"].includes(language.toLowerCase());

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="flex items-center justify-between gap-4 px-4 py-3 border-b border-border bg-code-bg shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <Terminal className="w-4 h-4 text-primary shrink-0" />
          <div className="min-w-0">
            <h1 className="font-mono font-bold text-sm truncate">DevDocs Runner</h1>
            <p className="text-xs text-muted-foreground truncate">
              Edit code, then run — {isHtml ? "HTML preview" : "JavaScript output"}
            </p>
          </div>
          <span className="text-[10px] font-mono uppercase tracking-wide text-muted-foreground border border-border px-2 py-0.5 rounded shrink-0">
            {language}
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[10px] text-muted-foreground hidden md:inline">Ctrl+Enter</span>
          <button
            type="button"
            onClick={handleRun}
            className="flex items-center gap-1.5 text-xs font-medium bg-primary text-primary-foreground px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity"
          >
            <Play className="w-3.5 h-3.5" />
            Run
          </button>
          <button
            type="button"
            onClick={() => window.close()}
            className="text-xs text-muted-foreground hover:text-foreground px-2 py-1.5 hidden sm:block"
          >
            Close tab
          </button>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row min-h-0">
        <section className="lg:w-1/2 border-b lg:border-b-0 lg:border-r border-border flex flex-col min-h-[320px] lg:min-h-0">
          <div className="px-4 py-2 border-b border-border bg-muted/30 flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Editor</p>
            <p className="text-[10px] text-muted-foreground">Editable</p>
          </div>
          <div className="flex-1 min-h-0 overflow-hidden bg-[#282c34]">
            <CodeEditor value={editorCode} onChange={setEditorCode} language={language} />
          </div>
        </section>

        <section className="lg:w-1/2 flex flex-col min-h-[320px] lg:min-h-0 flex-1">
          <div className="px-4 py-2 border-b border-border bg-muted/30">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              {isHtml ? "Preview" : "Output"}
            </p>
          </div>
          <div className="flex-1 bg-[#1e1e1e] p-0 min-h-0">
            <iframe
              key={runKey}
              title="Code output"
              sandbox="allow-scripts"
              srcDoc={runnerHtml}
              className="w-full h-full min-h-[280px] border-0 bg-white"
            />
          </div>
        </section>
      </div>

      <footer className="px-4 py-2 border-t border-border text-center shrink-0">
        <Link
          href="/docs"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-3 h-3" />
          Back to docs
        </Link>
      </footer>
    </div>
  );
}
