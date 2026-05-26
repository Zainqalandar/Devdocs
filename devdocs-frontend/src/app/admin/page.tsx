"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, FileText, Languages, Plus } from "lucide-react";
import { api } from "@/api/client";
import type { Language } from "@/types";
import { AdminCard, AdminPageHeader, AdminBtn } from "@/components/admin/admin-ui";

export default function AdminDashboardPage() {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getLanguagesAdmin()
      .then((res) => setLanguages(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const published = languages.filter((l) => l.isPublished).length;

  return (
    <div>
      <AdminPageHeader
        title="Dashboard"
        description="Create and manage documentation content for DevDocs."
        actions={
          <Link href="/admin/languages/new">
            <AdminBtn variant="primary">
              <Plus className="h-4 w-4" />
              New language
            </AdminBtn>
          </Link>
        }
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        {[
          { label: "Languages", value: languages.length, icon: Languages },
          { label: "Published", value: published, icon: BookOpen },
          { label: "Drafts", value: languages.length - published, icon: FileText },
        ].map(({ label, value, icon: Icon }) => (
          <AdminCard key={label} className="p-5">
            <Icon className="mb-3 h-5 w-5 text-primary" />
            <p className="text-2xl font-bold font-mono">{loading ? "—" : value}</p>
            <p className="text-xs text-muted-foreground mt-1">{label}</p>
          </AdminCard>
        ))}
      </div>

      <AdminCard className="p-5">
        <h2 className="font-mono font-semibold mb-4">Quick start</h2>
        <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
          <li>Create or select a <strong className="text-foreground">language</strong></li>
          <li>Add <strong className="text-foreground">topics</strong> (chapters)</li>
          <li>Write <strong className="text-foreground">sections</strong> with content blocks</li>
          <li>Optionally add examples and quizzes per section</li>
        </ol>
        <div className="mt-6">
          <Link href="/admin/languages">
            <AdminBtn variant="primary">Manage languages</AdminBtn>
          </Link>
        </div>
      </AdminCard>
    </div>
  );
}
