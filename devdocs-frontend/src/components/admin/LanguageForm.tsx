"use client";

import { useEffect, useState } from "react";
import type { Language } from "@/types";
import {
  AdminCard,
  AdminLabel,
  AdminInput,
  AdminTextarea,
  AdminSelect,
  AdminBtn,
} from "./admin-ui";

export const emptyLanguageForm = (): Partial<Language> => ({
  name: "",
  description: "",
  shortDescription: "",
  icon: "code",
  color: "#F7DF1E",
  category: "language",
  difficulty: "beginner",
  tags: [],
  version: "ES2024",
  officialWebsite: "",
  logoUrl: "",
  isPublished: false,
  order: 0,
});

export function LanguageForm({
  initial,
  onSubmit,
  onCancel,
  submitLabel,
}: {
  initial?: Partial<Language>;
  onSubmit: (body: Partial<Language>) => Promise<void>;
  onCancel: () => void;
  submitLabel: string;
}) {
  const [form, setForm] = useState<Partial<Language>>(initial || emptyLanguageForm());
  const [tagsText, setTagsText] = useState((initial?.tags || []).join(", "));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (initial) {
      setForm(initial);
      setTagsText((initial.tags || []).join(", "));
    }
  }, [initial]);

  const set = (key: keyof Language, value: unknown) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const body = {
        ...form,
        tags: tagsText.split(",").map((t) => t.trim()).filter(Boolean),
      };
      await onSubmit(body);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      )}

      <AdminCard className="space-y-4 p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Basic info</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <AdminLabel>Name *</AdminLabel>
            <AdminInput
              value={form.name || ""}
              onChange={(e) => set("name", e.target.value)}
              placeholder="JavaScript"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <AdminLabel>Short description *</AdminLabel>
            <AdminInput
              value={form.shortDescription || ""}
              onChange={(e) => set("shortDescription", e.target.value)}
              placeholder="Shown on cards and listings"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <AdminLabel>Full description *</AdminLabel>
            <AdminTextarea
              value={form.description || ""}
              onChange={(e) => set("description", e.target.value)}
              placeholder="Overview on the language page"
              required
              rows={4}
            />
          </div>
        </div>
      </AdminCard>

      <AdminCard className="space-y-4 p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Classification</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <AdminLabel>Category *</AdminLabel>
            <AdminSelect
              value={form.category || "language"}
              onChange={(e) => set("category", e.target.value)}
            >
              {["language", "framework", "library", "database", "tool"].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </AdminSelect>
          </div>
          <div>
            <AdminLabel>Difficulty</AdminLabel>
            <AdminSelect
              value={form.difficulty || "beginner"}
              onChange={(e) => set("difficulty", e.target.value)}
            >
              {["beginner", "intermediate", "advanced"].map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </AdminSelect>
          </div>
          <div>
            <AdminLabel>Version label</AdminLabel>
            <AdminInput
              value={form.version || ""}
              onChange={(e) => set("version", e.target.value)}
              placeholder="ES2024"
            />
          </div>
          <div>
            <AdminLabel>Sort order</AdminLabel>
            <AdminInput
              type="number"
              value={form.order ?? 0}
              onChange={(e) => set("order", Number(e.target.value))}
            />
          </div>
          <div className="sm:col-span-2">
            <AdminLabel>Tags (comma separated)</AdminLabel>
            <AdminInput
              value={tagsText}
              onChange={(e) => setTagsText(e.target.value)}
              placeholder="web, frontend, scripting"
            />
          </div>
        </div>
      </AdminCard>

      <AdminCard className="space-y-4 p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Appearance & links</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <AdminLabel>Brand color</AdminLabel>
            <div className="flex gap-2">
              <AdminInput
                type="color"
                value={form.color || "#F7DF1E"}
                onChange={(e) => set("color", e.target.value)}
                className="h-10 w-14 cursor-pointer p-1"
              />
              <AdminInput
                value={form.color || "#F7DF1E"}
                onChange={(e) => set("color", e.target.value)}
                className="font-mono text-xs"
              />
            </div>
          </div>
          <div>
            <AdminLabel>Icon key</AdminLabel>
            <AdminInput
              value={form.icon || "code"}
              onChange={(e) => set("icon", e.target.value)}
              placeholder="code"
            />
          </div>
          <div className="sm:col-span-2">
            <AdminLabel>Official website</AdminLabel>
            <AdminInput
              type="url"
              value={form.officialWebsite || ""}
              onChange={(e) => set("officialWebsite", e.target.value)}
              placeholder="https://developer.mozilla.org/..."
            />
          </div>
          <div className="sm:col-span-2">
            <AdminLabel>Logo URL</AdminLabel>
            <AdminInput
              type="url"
              value={form.logoUrl || ""}
              onChange={(e) => set("logoUrl", e.target.value)}
              placeholder="https://..."
            />
          </div>
        </div>
        <label className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5 text-sm">
          <input
            type="checkbox"
            checked={!!form.isPublished}
            onChange={(e) => set("isPublished", e.target.checked)}
            className="rounded border-border"
          />
          <span>
            <span className="font-medium text-foreground">Published</span>
            <span className="block text-xs text-muted-foreground">Visible on the public docs site</span>
          </span>
        </label>
      </AdminCard>

      <div className="flex flex-wrap gap-3">
        <AdminBtn type="submit" variant="primary" disabled={saving}>
          {saving ? "Saving…" : submitLabel}
        </AdminBtn>
        <AdminBtn type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </AdminBtn>
      </div>
    </form>
  );
}
