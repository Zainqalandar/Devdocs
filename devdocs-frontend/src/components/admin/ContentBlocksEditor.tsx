"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
import type { ContentBlockInput } from "@/types";
import { AdminBtn, AdminInput, AdminLabel, AdminSelect, AdminTextarea } from "./admin-ui";

const BLOCK_TYPES = [
  "heading",
  "text",
  "code",
  "note",
  "warning",
  "tip",
  "list",
  "table",
  "image",
] as const;

function AddBlockBar({ onAdd }: { onAdd: (type: ContentBlockInput["type"]) => void }) {
  const [type, setType] = useState<ContentBlockInput["type"]>("text");
  return (
    <div className="flex flex-wrap gap-2 pt-2">
      <AdminSelect
        className="max-w-[140px]"
        value={type}
        onChange={(e) => setType(e.target.value as ContentBlockInput["type"])}
      >
        {BLOCK_TYPES.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </AdminSelect>
      <AdminBtn type="button" variant="primary" onClick={() => onAdd(type)}>
        <Plus className="h-4 w-4" />
        Add block
      </AdminBtn>
    </div>
  );
}

const emptyBlock = (type: ContentBlockInput["type"], order: number): ContentBlockInput => ({
  type,
  content: "",
  order,
  language: type === "code" ? "javascript" : "",
  items: type === "list" ? [""] : undefined,
  headers: type === "table" ? ["Column 1", "Column 2"] : undefined,
  rows: type === "table" ? [["", ""]] : undefined,
});

export function ContentBlocksEditor({
  blocks,
  onChange,
}: {
  blocks: ContentBlockInput[];
  onChange: (blocks: ContentBlockInput[]) => void;
}) {
  const sorted = [...blocks].sort((a, b) => a.order - b.order);

  const update = (index: number, patch: Partial<ContentBlockInput>) => {
    const next = sorted.map((b, i) => (i === index ? { ...b, ...patch } : b));
    onChange(next);
  };

  const remove = (index: number) => {
    onChange(sorted.filter((_, i) => i !== index).map((b, i) => ({ ...b, order: i })));
  };

  const move = (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= sorted.length) return;
    const next = [...sorted];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next.map((b, i) => ({ ...b, order: i })));
  };

  const add = (type: ContentBlockInput["type"]) => {
    onChange([...sorted, emptyBlock(type, sorted.length)]);
  };

  return (
    <div className="space-y-3">
      {sorted.length === 0 && (
        <p className="rounded-lg border border-dashed border-white/[0.1] py-8 text-center text-sm text-muted-foreground">
          No content blocks yet. Add one below.
        </p>
      )}

      {sorted.map((block, index) => (
        <div
          key={block._id ?? `block-${index}`}
          className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4"
        >
          <div className="mb-3 flex items-center justify-between gap-2">
            <AdminSelect
              value={block.type}
              onChange={(e) =>
                update(index, emptyBlock(e.target.value as ContentBlockInput["type"], block.order))
              }
              className="max-w-[160px]"
            >
              {BLOCK_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </AdminSelect>
            <div className="flex gap-1">
              <AdminBtn type="button" variant="ghost" className="!p-1.5" onClick={() => move(index, -1)} disabled={index === 0}>
                <ChevronUp className="h-4 w-4" />
              </AdminBtn>
              <AdminBtn type="button" variant="ghost" className="!p-1.5" onClick={() => move(index, 1)} disabled={index === sorted.length - 1}>
                <ChevronDown className="h-4 w-4" />
              </AdminBtn>
              <AdminBtn type="button" variant="danger" className="!p-1.5" onClick={() => remove(index)}>
                <Trash2 className="h-4 w-4" />
              </AdminBtn>
            </div>
          </div>

          {(block.type === "heading" || block.type === "text" || block.type === "code" || block.type === "image" ||
            block.type === "note" || block.type === "warning" || block.type === "tip") && (
            <div>
              <AdminLabel>{block.type === "code" ? "Code" : "Content"}</AdminLabel>
              <AdminTextarea
                value={block.content}
                onChange={(e) => update(index, { content: e.target.value })}
                rows={block.type === "code" ? 8 : 4}
                className="font-mono text-xs"
              />
            </div>
          )}

          {block.type === "code" && (
            <div className="mt-2">
              <AdminLabel>Language</AdminLabel>
              <AdminInput
                value={block.language || ""}
                onChange={(e) => update(index, { language: e.target.value })}
                placeholder="javascript"
              />
            </div>
          )}

          {block.type === "image" && (
            <div className="mt-2">
              <AdminLabel>Caption</AdminLabel>
              <AdminInput
                value={block.caption || ""}
                onChange={(e) => update(index, { caption: e.target.value })}
              />
            </div>
          )}

          {block.type === "list" && (
            <div className="space-y-2">
              <AdminLabel>List items (one per line)</AdminLabel>
              <AdminTextarea
                value={(block.items || []).join("\n")}
                onChange={(e) =>
                  update(index, {
                    content: block.content || "List",
                    items: e.target.value.split("\n").filter(Boolean),
                  })
                }
                rows={5}
              />
            </div>
          )}

          {block.type === "table" && (
            <div className="space-y-2">
              <AdminLabel>Table JSON (headers + rows)</AdminLabel>
              <AdminTextarea
                value={JSON.stringify({ headers: block.headers || [], rows: block.rows || [] }, null, 2)}
                onChange={(e) => {
                  try {
                    const parsed = JSON.parse(e.target.value) as { headers: string[]; rows: string[][] };
                    update(index, {
                      content: block.content || "Table",
                      headers: parsed.headers,
                      rows: parsed.rows,
                    });
                  } catch {
                    /* ignore invalid json while typing */
                  }
                }}
                rows={6}
                className="font-mono text-xs"
              />
            </div>
          )}
        </div>
      ))}

      <AddBlockBar onAdd={add} />
    </div>
  );
}
