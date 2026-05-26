"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Plus, Pencil, Trash2, FileText, RefreshCw, AlertCircle } from "lucide-react";
import { api } from "@/api/client";
import type { Topic } from "@/types";
import {
  AdminCard,
  AdminPageHeader,
  AdminBtn,
  StatusBadge,
} from "@/components/admin/admin-ui";

export default function AdminTopicsPage() {
  const { slug: langSlug } = useParams<{ slug: string }>();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [langName, setLangName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(() => {
    setLoading(true);
    setError("");
    Promise.all([api.getTopicsAdmin(langSlug), api.getLanguage(langSlug)])
      .then(([topicsRes, langRes]) => {
        setTopics((topicsRes.data || []).sort((a, b) => a.order - b.order));
        setLangName(langRes.data?.language.name || langSlug);
      })
      .catch((e: unknown) => {
        setError(e instanceof Error ? e.message : "Failed to load topics");
      })
      .finally(() => setLoading(false));
  }, [langSlug]);

  useEffect(() => {
    load();
  }, [load]);

  const handleDelete = async (topicSlug: string, title: string) => {
    if (!confirm(`Delete topic "${title}"? All sections must be removed first.`)) return;
    try {
      await api.deleteTopic(langSlug, topicSlug);
      load();
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : "Delete failed");
    }
  };

  const totalSections = topics.reduce((sum, t) => sum + (t.totalSections ?? 0), 0);

  return (
    <div>
      <AdminPageHeader
        title={`${langName} — Topics`}
        description="Chapters or modules within this language."
        actions={
          <>
            <AdminBtn type="button" variant="ghost" onClick={load} disabled={loading}>
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </AdminBtn>
            <Link href={`/admin/languages/${langSlug}/topics/new`}>
              <AdminBtn variant="primary">
                <Plus className="h-4 w-4" />
                Add topic
              </AdminBtn>
            </Link>
          </>
        }
      />

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <Link href="/admin/languages" className="text-xs text-muted-foreground hover:text-primary">
          ← All languages
        </Link>
        {!loading && (
          <span className="text-xs text-muted-foreground">
            {topics.length} topic{topics.length !== 1 ? "s" : ""} · {totalSections} section
            {totalSections !== 1 ? "s" : ""} total
          </span>
        )}
      </div>

      {error && (
        <div className="mb-4 flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      )}

      <AdminCard className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.08] bg-white/[0.02] text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-3 font-medium">Topic</th>
                <th className="px-4 py-3 font-medium hidden sm:table-cell">Order</th>
                <th className="px-4 py-3 font-medium">Sections</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-muted-foreground">
                    Loading topics…
                  </td>
                </tr>
              ) : topics.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-muted-foreground">
                    No topics yet. Add one to get started.
                  </td>
                </tr>
              ) : (
                topics.map((topic) => (
                  <tr
                    key={topic._id}
                    className="border-b border-white/[0.06] last:border-0 hover:bg-white/[0.02]"
                  >
                    <td className="px-4 py-3">
                      <p className="font-mono font-semibold">{topic.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">/{topic.slug}</p>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell text-muted-foreground tabular-nums">
                      {topic.order}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1.5 rounded-md bg-white/[0.05] px-2 py-1 font-mono text-xs font-semibold tabular-nums">
                        <FileText className="h-3 w-3 text-primary" />
                        {topic.totalSections ?? 0}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge published={topic.isPublished} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap justify-end gap-1">
                        <Link href={`/admin/languages/${langSlug}/topics/${topic.slug}/sections`}>
                          <AdminBtn variant="default" className="!px-2.5 !py-1.5 text-xs">
                            <FileText className="h-3.5 w-3.5" />
                            Sections
                          </AdminBtn>
                        </Link>
                        <Link href={`/admin/languages/${langSlug}/topics/${topic.slug}/edit`}>
                          <AdminBtn variant="ghost" className="!px-2" title="Edit topic">
                            <Pencil className="h-3.5 w-3.5" />
                          </AdminBtn>
                        </Link>
                        <AdminBtn
                          variant="danger"
                          className="!px-2"
                          title="Delete topic"
                          onClick={() => handleDelete(topic.slug, topic.title)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </AdminBtn>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </AdminCard>
    </div>
  );
}
