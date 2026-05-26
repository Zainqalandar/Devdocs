import ts from "typescript";

/** Strip constructs that cannot run in the in-browser runner after transpile. */
export function preprocessTypeScriptSource(src: string): string {
  let out = src;
  out = out.replace(/^import\s+type\s+.+$/gm, "");
  out = out.replace(/^import\s+.+$/gm, "");
  out = out.replace(/^export\s+type\s+.+$/gm, "");
  out = out.replace(/^export\s+\{[^}]*\}\s*;?\s*$/gm, "");
  out = out.replace(/^export\s+(default\s+)?/gm, "");
  return out;
}

export interface TranspileTypeScriptResult {
  js: string;
  errors: string[];
}

export function transpileTypeScript(code: string): TranspileTypeScriptResult {
  const source = preprocessTypeScriptSource(code);
  const result = ts.transpileModule(source, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2020,
      module: ts.ModuleKind.None,
      strict: false,
      removeComments: false,
    },
    reportDiagnostics: true,
  });

  const errors: string[] = [];
  for (const d of result.diagnostics ?? []) {
    if (d.category === ts.DiagnosticCategory.Error) {
      errors.push(ts.flattenDiagnosticMessageText(d.messageText, "\n"));
    }
  }

  return { js: result.outputText, errors };
}
