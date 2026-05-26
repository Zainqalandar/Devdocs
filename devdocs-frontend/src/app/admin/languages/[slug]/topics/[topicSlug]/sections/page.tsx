"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Plus, Pencil, Trash2, ExternalLink } from "lucide-react";
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

  const load = () => {
    setLoading(true);
    Promise.all([
      api.getSectionsAdmin(langSlug, topicSlug),
      api.getTopic(langSlug, topicSlug),
    ])
      .then(([secRes, topicRes]) => {
        setSections(secRes.data || []);
        setTopicTitle(topicRes.data?.topic.title || topicSlug);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, [langSlug, topicSlug]);

  const handleDelete = async (sectionSlug: string, title: string) => {
    if (!confirm(`Delete section "${title}"?`)) return;
    try {
      await api.deleteSection(langSlug, topicSlug, sectionSlug);
      load();
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : "Delete failed");
    }
  };

  return (
    <div>
      <AdminPageHeader
        title={`${topicTitle} — Sections`}
        description="Documentation pages with content blocks."
        actions={
          <Link href={`/admin/languages/${langSlug}/topics/${topicSlug}/sections/new`}>
            <AdminBtn variant="primary">
              <Plus className="h-4 w-4" />
              Add section
            </AdminBtn>
          </Link>
        }
      />

      <div className="mb-4">
        <Link
          href={`/admin/languages/${langSlug}/topics`}
          className="text-xs text-muted-foreground hover:text-primary"
        >
          ← Topics
        </Link>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : (
        <div className="space-y-3">
          {sections.map((section) => (
            <AdminCard
              key={section._id}
              className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-medium">{section.title}</h3>
                  <StatusBadge published={section.isPublished} />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  /{section.slug} · {section.readingTimeMinutes} min read
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link
                  href={`/docs/${langSlug}/topics/${topicSlug}/sections/${section.slug}`}
                  target="_blank"
                >
                  <AdminBtn variant="ghost">
                    <ExternalLink className="h-3.5 w-3.5" />
                    Preview
                  </AdminBtn>
                </Link>
                <Link
                  href={`/admin/languages/${langSlug}/topics/${topicSlug}/sections/${section.slug}`}
                >
                  <AdminBtn variant="primary">
                    <Pencil className="h-3.5 w-3.5" />
                    Edit
                  </AdminBtn>
                </Link>
                <AdminBtn
                  variant="danger"
                  onClick={() => handleDelete(section.slug, section.title)}
                >
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
