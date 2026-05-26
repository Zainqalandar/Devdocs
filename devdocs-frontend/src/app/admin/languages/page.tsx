"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, FolderOpen } from "lucide-react";
import { api } from "@/api/client";
import type { Language } from "@/types";
import {
  AdminCard,
  AdminPageHeader,
  AdminBtn,
  StatusBadge,
} from "@/components/admin/admin-ui";

export default function AdminLanguagesPage() {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = () => {
    setLoading(true);
    api
      .getLanguagesAdmin()
      .then((res) => setLanguages(res.data || []))
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (slug: string, name: string) => {
    if (!confirm(`Delete language "${name}"? This only works if it has no topics.`)) return;
    try {
      await api.deleteLanguage(slug);
      load();
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : "Delete failed");
    }
  };

  return (
    <div>
      <AdminPageHeader
        title="Languages"
        description="Documentation languages, frameworks, and tools."
        actions={
          <Link href="/admin/languages/new">
            <AdminBtn variant="primary">
              <Plus className="h-4 w-4" />
              Add language
            </AdminBtn>
          </Link>
        }
      />

      {error && (
        <p className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      )}

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : languages.length === 0 ? (
        <AdminCard className="p-8 text-center text-muted-foreground text-sm">No languages yet.</AdminCard>
      ) : (
        <div className="space-y-3">
          {languages.map((lang) => (
            <AdminCard key={lang._id} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4 min-w-0">
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-mono text-xs font-black"
                  style={{
                    background: `${lang.color}22`,
                    color: lang.color,
                    border: `1px solid ${lang.color}44`,
                  }}
                >
                  {lang.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-mono font-semibold truncate">{lang.name}</h3>
                    <StatusBadge published={lang.isPublished} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">
                    /{lang.slug} · {lang.totalTopics} topics
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 shrink-0">
                <Link href={`/admin/languages/${lang.slug}/topics`}>
                  <AdminBtn variant="default">
                    <FolderOpen className="h-3.5 w-3.5" />
                    Topics
                  </AdminBtn>
                </Link>
                <Link href={`/admin/languages/${lang.slug}/edit`}>
                  <AdminBtn variant="ghost">
                    <Pencil className="h-3.5 w-3.5" />
                    Edit
                  </AdminBtn>
                </Link>
                <AdminBtn variant="danger" onClick={() => handleDelete(lang.slug, lang.name)}>
                  <Trash2 className="h-3.5 w-3.5" />
                </AdminBtn>
              </div>
            </AdminCard>
          ))}
        </div>
      )}
    </div>
  );
}
