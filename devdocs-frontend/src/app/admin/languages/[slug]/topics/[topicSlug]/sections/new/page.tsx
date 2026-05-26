"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/api/client";
import {
  AdminCard,
  AdminPageHeader,
  AdminLabel,
  AdminInput,
  AdminTextarea,
  AdminBtn,
} from "@/components/admin/admin-ui";

export default function NewSectionPage() {
  const { slug: langSlug, topicSlug } = useParams<{ slug: string; topicSlug: string }>();
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    metaDescription: "",
    order: 0,
    readingTimeMinutes: 5,
    isPublished: false,
    isFree: true,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await api.createSection(langSlug, topicSlug, {
        ...form,
        contentBlocks: [
          { type: "heading", content: form.title, order: 0 },
          { type: "text", content: "Add your content here.", order: 1 },
        ],
      });
      if (res.data)
        router.push(
          `/admin/languages/${langSlug}/topics/${topicSlug}/sections/${res.data.slug}`
        );
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Create failed");
    }
    setSaving(false);
  };

  return (
    <div>
      <AdminPageHeader title="New section" />
      <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
        {error && (
          <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </p>
        )}
        <AdminCard className="space-y-4 p-5">
          <div>
            <AdminLabel>Title *</AdminLabel>
            <AdminInput
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>
          <div>
            <AdminLabel>Meta description</AdminLabel>
            <AdminTextarea
              value={form.metaDescription}
              onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <AdminLabel>Order</AdminLabel>
              <AdminInput
                type="number"
                value={form.order}
                onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
              />
            </div>
            <div>
              <AdminLabel>Reading time (min)</AdminLabel>
              <AdminInput
                type="number"
                value={form.readingTimeMinutes}
                onChange={(e) => setForm({ ...form, readingTimeMinutes: Number(e.target.value) })}
              />
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.isPublished}
              onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}
            />
            Published
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.isFree}
              onChange={(e) => setForm({ ...form, isFree: e.target.checked })}
            />
            Free (not PRO)
          </label>
        </AdminCard>
        <AdminBtn type="submit" variant="primary" disabled={saving}>
          {saving ? "Creating…" : "Create & edit content"}
        </AdminBtn>
      </form>
    </div>
  );
}
