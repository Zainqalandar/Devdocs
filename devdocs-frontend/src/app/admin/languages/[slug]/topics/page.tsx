"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Plus, Pencil, Trash2, FileText } from "lucide-react";
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

  const load = () => {
    setLoading(true);
    Promise.all([api.getTopicsAdmin(langSlug), api.getLanguage(langSlug)])
      .then(([topicsRes, langRes]) => {
        setTopics(topicsRes.data || []);
        setLangName(langRes.data?.language.name || langSlug);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, [langSlug]);

  const handleDelete = async (topicSlug: string, title: string) => {
    if (!confirm(`Delete topic "${title}"?`)) return;
    try {
      await api.deleteTopic(langSlug, topicSlug);
      load();
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : "Delete failed");
    }
  };

  return (
    <div>
      <AdminPageHeader
        title={`${langName} — Topics`}
        description="Chapters or modules within this language."
        actions={
          <Link href={`/admin/languages/${langSlug}/topics/new`}>
            <AdminBtn variant="primary">
              <Plus className="h-4 w-4" />
              Add topic
            </AdminBtn>
          </Link>
        }
      />

      <div className="mb-4">
        <Link href="/admin/languages" className="text-xs text-muted-foreground hover:text-primary">
          ← All languages
        </Link>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : (
        <div className="space-y-3">
          {topics.map((topic) => (
            <AdminCard
              key={topic._id}
              className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-mono font-semibold">{topic.title}</h3>
                  <StatusBadge published={topic.isPublished} />
                </div>
                <p className="text-xs text-muted-foreground mt-1">/{topic.slug}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link href={`/admin/languages/${langSlug}/topics/${topic.slug}/sections`}>
                  <AdminBtn variant="default">
                    <FileText className="h-3.5 w-3.5" />
                    Sections
                  </AdminBtn>
                </Link>
                <Link href={`/admin/languages/${langSlug}/topics/${topic.slug}/edit`}>
                  <AdminBtn variant="ghost">
                    <Pencil className="h-3.5 w-3.5" />
                  </AdminBtn>
                </Link>
                <AdminBtn variant="danger" onClick={() => handleDelete(topic.slug, topic.title)}>
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
