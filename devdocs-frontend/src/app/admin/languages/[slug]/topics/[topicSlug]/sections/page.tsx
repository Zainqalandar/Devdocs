"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Plus, Pencil, Trash2, ExternalLink, RefreshCw, AlertCircle } from "lucide-react";
import { api } from "@/api/client";
import type { Section } from "@/types";
import {
  AdminCard,
  AdminPageHeader,
  AdminBtn,
  StatusBadge,
} from "@/components/admin/admin-ui";

export default function AdminSectionsPage() {
  const { slug: langSlug, topicSlug } = useParams<{ slug: string; topicSlug: string }>();
  const [sections, setSections] = useState<Section[]>([]);
  const [topicTitle, setTopicTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(() => {
    setLoading(true);
    setError("");
    Promise.all([
      api.getSectionsAdmin(langSlug, topicSlug),
      api.getTopic(langSlug, topicSlug),
    ])
      .then(([secRes, topicRes]) => {
        const list = secRes.data || [];
        setSections([...list].sort((a, b) => a.order - b.order));
        setTopicTitle(topicRes.data?.topic.title || topicSlug);
      })
      .catch((e: unknown) => {
        setError(e instanceof Error ? e.message : "Failed to load sections");
        setSections([]);
      })
      .finally(() => setLoading(false));
  }, [langSlug, topicSlug]);

  useEffect(() => {
    load();
  }, [load]);

  const handleDelete = async (sectionSlug: string, title: string) => {
    if (!confirm(`Delete section "${title}"?`)) return;
    try {
      await api.deleteSection(langSlug, topicSlug, sectionSlug);
      load();
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : "Delete failed");
    }
  };

  const publishedCount = sections.filter((s) => s.isPublished).length;

  return (
    <div>
      <AdminPageHeader
        title={`${topicTitle} — Sections`}
        description="All documentation pages in this topic (published and drafts)."
        actions={
          <>
            <AdminBtn type="button" variant="ghost" onClick={load} disabled={loading}>
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </AdminBtn>
            <Link href={`/admin/languages/${langSlug}/topics/${topicSlug}/sections/new`}>
              <AdminBtn variant="primary">
                <Plus className="h-4 w-4" />
                Add section
              </AdminBtn>
            </Link>
          </>
        }
      />

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <Link
          href={`/admin/languages/${langSlug}/topics`}
          className="text-xs text-muted-foreground hover:text-primary"
        >
          ← Topics
        </Link>
        {!loading && (
          <span className="text-xs text-muted-foreground">
            {sections.length} section{sections.length !== 1 ? "s" : ""} · {publishedCount} published
          </span>
        )}
      </div>

      {error && (
        <div className="mb-4 flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">Could not load sections</p>
            <p className="mt-1 opacity-90">{error}</p>
            <AdminBtn type="button" variant="ghost" className="mt-2 !text-destructive" onClick={load}>
              Try again
            </AdminBtn>
          </div>
        </div>
      )}

      <AdminCard className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.08] bg-white/[0.02] text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-3 font-medium">Section</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">Order</th>
                <th className="px-4 py-3 font-medium hidden sm:table-cell">Read time</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-muted-foreground">
                    Loading sections…
                  </td>
                </tr>
              ) : sections.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center">
                    <p className="text-muted-foreground mb-4">No sections in this topic yet.</p>
                    <Link href={`/admin/languages/${langSlug}/topics/${topicSlug}/sections/new`}>
                      <AdminBtn variant="primary">
                        <Plus className="h-4 w-4" />
                        Create first section
                      </AdminBtn>
                    </Link>
                  </td>
                </tr>
              ) : (
                sections.map((section) => (
                  <tr
                    key={section._id}
                    className="border-b border-white/[0.06] last:border-0 hover:bg-white/[0.02]"
                  >
                    <td className="px-4 py-3">
                      <p className="font-medium">{section.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">/{section.slug}</p>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell text-muted-foreground tabular-nums">
                      {section.order}
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell text-muted-foreground">
                      {section.readingTimeMinutes} min
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        <StatusBadge published={section.isPublished} />
                        {!section.isFree && (
                          <span className="rounded-full border border-primary/25 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase text-primary">
                            Pro
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap justify-end gap-1">
                        {section.isPublished && (
                          <Link
                            href={`/docs/${langSlug}/topics/${topicSlug}/sections/${section.slug}`}
                            target="_blank"
                          >
                            <AdminBtn variant="ghost" className="!px-2" title="Preview on site">
                              <ExternalLink className="h-3.5 w-3.5" />
                            </AdminBtn>
                          </Link>
                        )}
                        <Link
                          href={`/admin/languages/${langSlug}/topics/${topicSlug}/sections/${section.slug}`}
                        >
                          <AdminBtn variant="primary" className="!px-2.5 !py-1.5 text-xs">
                            <Pencil className="h-3.5 w-3.5" />
                            Edit
                          </AdminBtn>
                        </Link>
                        <AdminBtn
                          variant="danger"
                          className="!px-2"
                          title="Delete"
                          onClick={() => handleDelete(section.slug, section.title)}
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
