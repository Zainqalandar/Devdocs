const ALIASES: Record<string, string> = {
  js: "javascript",
  ts: "typescript",
  py: "python",
  html: "markup",
  xml: "markup",
  sh: "bash",
  shell: "bash",
  yml: "yaml",
  md: "markdown",
};

/** Prism language ids supported by the default Prism bundle in react-syntax-highlighter */
const SUPPORTED = new Set([
  "javascript",
  "typescript",
  "jsx",
  "tsx",
  "markup",
  "css",
  "json",
  "bash",
  "python",
  "java",
  "csharp",
  "go",
  "rust",
  "php",
  "sql",
  "yaml",
  "markdown",
  "diff",
  "docker",
  "graphql",
]);

export function normalizeLanguage(lang?: string): string {
  if (!lang?.trim()) return "javascript";
  const key = lang.toLowerCase().trim();
  const normalized = ALIASES[key] ?? key;
  return SUPPORTED.has(normalized) ? normalized : "javascript";
}
