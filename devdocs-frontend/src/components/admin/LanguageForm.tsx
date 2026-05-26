"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/api/client";
import type { Language } from "@/types";
import {
  AdminCard,
  AdminLabel,
  AdminInput,
  AdminTextarea,
  AdminSelect,
  AdminBtn,
} from "./admin-ui";

const defaultValues: Partial<Language> = {
  name: "",
  description: "",
  shortDescription: "",
  icon: "code",
  color: "#F7DF1E",
  category: "language",
  difficulty: "beginner",
  tags: [],
  version: "Latest",
  officialWebsite: "",
  logoUrl: "",
  isPublished: false,
  order: 0,
};

export function LanguageForm({ initial, slug }: { initial?: Language; slug?: string }) {
  const router = useRouter();
  const [form, setForm] = useState<Partial<Language>>(initial || defaultValues);
  const [tagsText, setTagsText] = useState((initial?.tags || []).join(", "));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const set = (key: keyof Language, value: unknown) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    const body = { ...form, tags: tagsText.split(",").map((t) => t.trim()).filter(Boolean) };
    try {
      if (slug) {
        await api.updateLanguage(slug, body);
        router.push("/admin/languages");
      } else {
        const res = await api.createLanguage(body);
        if (res.data) router.push(`/admin/languages/${res.data.slug}/topics`);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Save failed");
    }
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      {error && (
        <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      )}

      <AdminCard className="space-y-4 p-5">
        <div>
          <AdminLabel>Name *</AdminLabel>
          <AdminInput value={form.name || ""} onChange={(e) => set("name", e.target.value)} required />
        </div>
        <div>
          <AdminLabel>Short description *</AdminLabel>
          <AdminInput
            value={form.shortDescription || ""}
            onChange={(e) => set("shortDescription", e.target.value)}
            required
          />
        </div>
        <div>
          <AdminLabel>Full description *</AdminLabel>
          <AdminTextarea
            value={form.description || ""}
            onChange={(e) => set("description", e.target.value)}
            required
            rows={4}
          />
        </div>
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
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <AdminLabel>Brand color</AdminLabel>
            <AdminInput
              type="color"
              value={form.color || "#F7DF1E"}
              onChange={(e) => set("color", e.target.value)}
              className="h-10 cursor-pointer"
            />
          </div>
          <div>
            <AdminLabel>Version</AdminLabel>
            <AdminInput value={form.version || ""} onChange={(e) => set("version", e.target.value)} />
          </div>
        </div>
        <div>
          <AdminLabel>Tags (comma separated)</AdminLabel>
          <AdminInput value={tagsText} onChange={(e) => setTagsText(e.target.value)} />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={!!form.isPublished}
            onChange={(e) => set("isPublished", e.target.checked)}
            className="rounded border-border"
          />
          Published on docs site
        </label>
      </AdminCard>

      <div className="flex gap-3">
        <AdminBtn type="submit" variant="primary" disabled={saving}>
          {saving ? "Saving…" : slug ? "Update language" : "Create language"}
        </AdminBtn>
        <AdminBtn type="button" variant="ghost" onClick={() => router.back()}>
          Cancel
        </AdminBtn>
      </div>
    </form>
  );
}
