const STORAGE_PREFIX = "devdocs-run:";
const PAYLOAD_TTL_MS = 60 * 60 * 1000; // 1 hour

const RUNNABLE = new Set([
  "javascript",
  "js",
  "html",
  "htm",
  "markup",
  "typescript",
  "ts",
  "jsx",
  "tsx",
  "react",
]);

export const RUN_MESSAGE_TYPE = "devdocs-run";

export interface RunMessage {
  type: typeof RUN_MESSAGE_TYPE;
  key: string;
  code: string;
  language: string;
}

interface StoredPayload {
  code: string;
  language: string;
  createdAt: number;
}

export type RunnerKind = "html" | "javascript" | "typescript" | "react";

export function getRunnerKind(language: string): RunnerKind {
  const lang = language.toLowerCase().trim();
  if (lang === "html" || lang === "htm" || lang === "markup") return "html";
  if (lang === "typescript" || lang === "ts") return "typescript";
  if (lang === "jsx" || lang === "tsx" || lang === "react") return "react";
  return "javascript";
}

export function isRunnableLanguage(lang?: string): boolean {
  if (!lang?.trim()) return true;
  return RUNNABLE.has(lang.toLowerCase().trim());
}

function storageKey(key: string): string {
  return `${STORAGE_PREFIX}${key}`;
}

function pruneExpiredPayloads(): void {
  if (typeof window === "undefined") return;
  const now = Date.now();
  for (let i = localStorage.length - 1; i >= 0; i--) {
    const name = localStorage.key(i);
    if (!name?.startsWith(STORAGE_PREFIX)) continue;
    try {
      const parsed = JSON.parse(localStorage.getItem(name) ?? "") as StoredPayload;
      if (!parsed.createdAt || now - parsed.createdAt > PAYLOAD_TTL_MS) {
        localStorage.removeItem(name);
      }
    } catch {
      localStorage.removeItem(name);
    }
  }
}

function saveRunnerPayload(key: string, code: string, language: string): void {
  const entry: StoredPayload = { code, language, createdAt: Date.now() };
  localStorage.setItem(storageKey(key), JSON.stringify(entry));
  pruneExpiredPayloads();
}

export function openCodeRunner(code: string, language?: string): void {
  const key =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `run-${Date.now()}`;
  const lang = (language || "javascript").toLowerCase();

  try {
    saveRunnerPayload(key, code, lang);
  } catch {
    // localStorage full or blocked — postMessage fallback still works
  }

  const url = `/run?key=${encodeURIComponent(key)}&lang=${encodeURIComponent(lang)}`;
  const origin = window.location.origin;
  const message: RunMessage = { type: RUN_MESSAGE_TYPE, key, code, language: lang };

  const child = window.open(url, "_blank");

  if (child) {
    const send = () => {
      try {
        child.postMessage(message, origin);
      } catch {
        /* child may not be ready yet */
      }
    };
    send();
    window.setTimeout(send, 50);
    window.setTimeout(send, 200);
  }
}

function escapeScriptClose(code: string): string {
  return code.replace(/<\/script/gi, "<\\/script");
}

function embedSource(code: string): string {
  return escapeScriptClose(code);
}

export function buildJavaScriptRunnerDocument(code: string): string {
  const safeCode = escapeScriptClose(code);
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  * { box-sizing: border-box; }
  body { margin: 0; padding: 12px; font-family: "IBM Plex Mono", ui-monospace, Menlo, monospace; font-size: 13px; line-height: 1.5; background: #1e1e1e; color: #d4d4d4; }
  #out { white-space: pre-wrap; word-break: break-word; }
  .err { color: #f48771; }
</style>
</head>
<body>
<div id="out"></div>
<script>
(function () {
  var out = document.getElementById("out");
  var lines = [];
  function append(text, isErr) {
    lines.push(isErr ? '<span class="err">' + text + '</span>' : text);
    out.innerHTML = lines.join("\\n");
  }
  var _log = console.log;
  var _err = console.error;
  console.log = function () {
    var msg = Array.prototype.slice.call(arguments).map(function (a) {
      try { return typeof a === "object" ? JSON.stringify(a) : String(a); } catch (e) { return String(a); }
    }).join(" ");
    append(msg, false);
    _log.apply(console, arguments);
  };
  console.error = function () {
    var msg = Array.prototype.slice.call(arguments).join(" ");
    append(msg, true);
    _err.apply(console, arguments);
  };
  try {
    ${safeCode}
  } catch (e) {
    append("Error: " + (e && e.message ? e.message : String(e)), true);
  }
})();
<\/script>
</body>
</html>`;
}

/** Static HTML for TypeScript compile errors (shown in the sandboxed output iframe). */
export function buildTypeScriptErrorDocument(errors: string[]): string {
  const lines = errors.map((e) => escapeHtml(e)).join("<br>");
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  body { margin: 0; padding: 12px; font-family: "IBM Plex Mono", ui-monospace, Menlo, monospace; font-size: 13px; line-height: 1.5; background: #1e1e1e; color: #f48771; }
</style>
</head>
<body>
<p><strong>TypeScript compile error</strong></p>
<p>${lines}</p>
</body>
</html>`;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildReactRunnerDocument(code: string, useTypeScript: boolean): string {
  const safeSource = embedSource(code);
  const presets = useTypeScript
    ? "['react', ['typescript', { onlyRemoveTypeImports: true }]]"
    : "['react']";
  const filename = useTypeScript ? "devdocs-runner.tsx" : "devdocs-runner.jsx";

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script crossorigin src="https://unpkg.com/react@18.3.1/umd/react.development.js"><\/script>
<script crossorigin src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js"><\/script>
<script src="https://unpkg.com/@babel/standalone@7.26.2/babel.min.js"><\/script>
<style>
  * { box-sizing: border-box; }
  body { margin: 0; padding: 12px; font-family: system-ui, -apple-system, sans-serif; background: #fff; color: #111; }
  #root { min-height: 24px; }
  #out { margin-top: 12px; padding-top: 12px; border-top: 1px solid #e5e5e5; white-space: pre-wrap; word-break: break-word; font-family: "IBM Plex Mono", ui-monospace, Menlo, monospace; font-size: 12px; color: #333; }
  .err { color: #c62828; }
</style>
</head>
<body>
<div id="root"></div>
<div id="out"></div>
<script type="text/plain" id="source">${safeSource}</script>
<script>
(function () {
  var out = document.getElementById("out");
  var lines = [];
  function append(text, isErr) {
    lines.push(isErr ? '<span class="err">' + text + '</span>' : text);
    out.innerHTML = lines.join("\\n");
  }
  var _log = console.log;
  var _warn = console.warn;
  var _err = console.error;
  console.log = function () {
    var msg = Array.prototype.slice.call(arguments).map(function (a) {
      try { return typeof a === "object" ? JSON.stringify(a) : String(a); } catch (e) { return String(a); }
    }).join(" ");
    if (msg) append(msg, false);
    _log.apply(console, arguments);
  };
  console.warn = function () {
    append(Array.prototype.slice.call(arguments).join(" "), false);
    _warn.apply(console, arguments);
  };
  console.error = function () {
    append(Array.prototype.slice.call(arguments).join(" "), true);
    _err.apply(console, arguments);
  };
  function preprocessReactSource(src) {
    src = src.replace(/^import\\s+type\\s+.+$/gm, "");
    src = src.replace(/import\\s*\\{([^}]+)\\}\\s*from\\s*['"]react-dom\\/client['"]\\s*;?/g, function (_, names) {
      var specifiers = names.split(",").map(function (n) { return n.trim(); }).filter(Boolean).join(", ");
      return specifiers ? "const {" + specifiers + "} = ReactDOM;" : "";
    });
    src = src.replace(/import\\s*\\{([^}]+)\\}\\s*from\\s*['"]react['"]\\s*;?/g, function (_, names) {
      var specifiers = names.split(",").map(function (n) { return n.trim(); }).filter(Boolean).join(", ");
      return specifiers ? "const {" + specifiers + "} = React;" : "";
    });
    src = src.replace(/import\\s+React\\s*,?\\s*\\{([^}]*)\\}\\s*from\\s*['"]react['"]\\s*;?/g, function (_, names) {
      var specifiers = names.split(",").map(function (n) { return n.trim(); }).filter(Boolean).join(", ");
      return specifiers ? "const {" + specifiers + "} = React;" : "";
    });
    src = src.replace(/import\\s+React\\s+from\\s*['"]react['"]\\s*;?/g, "");
    src = src.replace(/import\\s+.+from\\s*['"]react-router-dom['"]\\s*;?/g, "");
    src = src.replace(/^export\\s+(default\\s+)?/gm, "");
    var hasMount = /createRoot\\s*\\(|ReactDOM\\.(createRoot|render)\\s*\\(/.test(src);
    if (!hasMount) {
      var comps = [];
      var re = /function\\s+([A-Z][a-zA-Z0-9_]*)\\s*\\(/g;
      var m;
      while ((m = re.exec(src))) comps.push(m[1]);
      if (comps.length) {
        var comp = comps[comps.length - 1];
        src += "\\nvar __devdocsRoot = document.getElementById('root');\\n";
        src += "if (__devdocsRoot && typeof " + comp + " !== 'undefined') {\\n";
        src += "  ReactDOM.createRoot(__devdocsRoot).render(React.createElement(" + comp + "));\\n";
        src += "}\\n";
      }
    }
    return src;
  }
  try {
    var source = preprocessReactSource(document.getElementById("source").textContent);
    var transformed = Babel.transform(source, {
      presets: ${presets},
      filename: "${filename}",
      sourceType: "script",
    }).code;
    var run = new Function("React", "ReactDOM", transformed);
    run(React, ReactDOM);
  } catch (e) {
    append("Error: " + (e && e.message ? e.message : String(e)), true);
  }
})();
<\/script>
</body>
</html>`;
}

/** Build a self-contained HTML document for iframe preview / execution */
export function buildRunnerDocument(code: string, language: string): string {
  const lang = language.toLowerCase().trim();
  const kind = getRunnerKind(lang);

  if (kind === "html") {
    if (/<!DOCTYPE|<html/i.test(code)) {
      return code;
    }
    return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body>
${code}
</body>
</html>`;
  }

  if (kind === "typescript") {
    // TypeScript is transpiled in the parent page (RunPageClient) — sandboxed iframes
    // cannot load external compiler scripts from a CDN.
    return buildJavaScriptRunnerDocument(code);
  }

  if (kind === "react") {
    return buildReactRunnerDocument(code, true);
  }

  return buildJavaScriptRunnerDocument(code);
}

export function getRunnerOutputLabel(language: string): string {
  const kind = getRunnerKind(language);
  if (kind === "html") return "Preview";
  if (kind === "react") return "Preview & console";
  if (kind === "typescript") return "Output";
  return "Output";
}

export function getRunnerSubtitle(language: string): string {
  const kind = getRunnerKind(language);
  if (kind === "html") return "HTML preview";
  if (kind === "react") return "React preview — edit JSX and run again";
  if (kind === "typescript") return "TypeScript compiles in-browser, then runs";
  return "JavaScript output";
}

export function loadRunnerPayload(key: string): { code: string; language: string } | null {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem(storageKey(key));
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as StoredPayload;
    if (!parsed.code) return null;
    if (parsed.createdAt && Date.now() - parsed.createdAt > PAYLOAD_TTL_MS) {
      localStorage.removeItem(storageKey(key));
      return null;
    }
    return { code: parsed.code, language: parsed.language };
  } catch {
    localStorage.removeItem(storageKey(key));
    return null;
  }
}

export function isRunMessage(data: unknown): data is RunMessage {
  if (!data || typeof data !== "object") return false;
  const msg = data as RunMessage;
  return (
    msg.type === RUN_MESSAGE_TYPE &&
    typeof msg.key === "string" &&
    typeof msg.code === "string" &&
    typeof msg.language === "string"
  );
}
