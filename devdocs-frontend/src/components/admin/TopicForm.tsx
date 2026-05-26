"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/api/client";
import type { Topic } from "@/types";
import { AdminCard, AdminLabel, AdminInput, AdminTextarea, AdminBtn } from "./admin-ui";

export function TopicForm({
  langSlug,
  initial,
  topicSlug,
}: {
  langSlug: string;
  initial?: Topic;
  topicSlug?: string;
}) {
  const router = useRouter();
  const [form, setForm] = useState({
    title: initial?.title || "",
    description: initial?.description || "",
    icon: initial?.icon || "book",
    order: initial?.order ?? 0,
    isPublished: initial?.isPublished ?? false,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      if (topicSlug) {
        await api.updateTopic(langSlug, topicSlug, form);
        router.push(`/admin/languages/${langSlug}/topics`);
      } else {
        const res = await api.createTopic(langSlug, form);
        if (res.data)
          router.push(`/admin/languages/${langSlug}/topics/${res.data.slug}/sections`);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Save failed");
    }
    setSaving(false);
  };

  return (
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
          <AdminLabel>Description</AdminLabel>
          <AdminTextarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
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
            <AdminLabel>Icon key</AdminLabel>
            <AdminInput value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} />
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
      </AdminCard>
      <AdminBtn type="submit" variant="primary" disabled={saving}>
        {saving ? "Saving…" : topicSlug ? "Update topic" : "Create topic"}
      </AdminBtn>
    </form>
  );
}
