const STORAGE_PREFIX = "devdocs-run:";
const PAYLOAD_TTL_MS = 60 * 60 * 1000; // 1 hour

const RUNNABLE = new Set(["javascript", "js", "html", "htm", "markup"]);

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

  // Do not use noopener — it returns null and blocks postMessage to the child window
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

/** Build a self-contained HTML document for iframe preview / execution */
export function buildRunnerDocument(code: string, language: string): string {
  const lang = language.toLowerCase().trim();

  if (lang === "html" || lang === "markup" || lang === "htm") {
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
