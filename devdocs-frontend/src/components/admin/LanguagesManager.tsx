"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Plus,
  Pencil,
  Trash2,
  FolderOpen,
  RefreshCw,
  Search,
  ExternalLink,
  X,
  AlertCircle,
} from "lucide-react";
import { api } from "@/api/client";
import type { Language } from "@/types";
import {
  AdminCard,
  AdminPageHeader,
  AdminBtn,
  StatusBadge,
  AdminInput,
  AdminSelect,
} from "./admin-ui";
import { LanguageForm, emptyLanguageForm } from "./LanguageForm";

type FilterPublished = "all" | "true" | "false";
type ModalMode = "create" | "edit" | "delete" | null;

export function LanguagesManager() {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filterPublished, setFilterPublished] = useState<FilterPublished>("all");
  const [modal, setModal] = useState<ModalMode>(null);
  const [selected, setSelected] = useState<Language | null>(null);
  const [actionError, setActionError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.getLanguagesAdmin({
        search: search.trim() || undefined,
        published: filterPublished,
      });
      setLanguages(res.data || []);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to load languages");
      setLanguages([]);
    } finally {
      setLoading(false);
    }
  }, [search, filterPublished]);

  useEffect(() => {
    const t = window.setTimeout(load, search ? 300 : 0);
    return () => clearTimeout(t);
  }, [load, search]);

  const stats = useMemo(() => {
    const published = languages.filter((l) => l.isPublished).length;
    return { total: languages.length, published, drafts: languages.length - published };
  }, [languages]);

  const openCreate = () => {
    setSelected(null);
    setActionError("");
    setModal("create");
  };

  const openEdit = async (lang: Language) => {
    setActionError("");
    try {
      const res = await api.getLanguage(lang.slug);
      if (res.data?.language) {
        setSelected(res.data.language);
        setModal("edit");
      }
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : "Could not load language details");
    }
  };

  const openDelete = (lang: Language) => {
    setSelected(lang);
    setActionError("");
    setModal("delete");
  };

  const closeModal = () => {
    setModal(null);
    setSelected(null);
    setActionError("");
  };

  const handleCreate = async (body: Partial<Language>) => {
    await api.createLanguage(body);
    closeModal();
    await load();
  };

  const handleUpdate = async (body: Partial<Language>) => {
    if (!selected) return;
    await api.updateLanguage(selected.slug, body);
    closeModal();
    await load();
  };

  const handleDelete = async () => {
    if (!selected) return;
    setActionError("");
    try {
      await api.deleteLanguage(selected.slug);
      closeModal();
      await load();
    } catch (e: unknown) {
      setActionError(e instanceof Error ? e.message : "Delete failed");
    }
  };

  return (
    <div>
      <AdminPageHeader
        title="Languages"
        description="Manage all documentation tracks — create, edit, publish, or remove."
        actions={
          <>
            <AdminBtn type="button" variant="ghost" onClick={() => load()} disabled={loading}>
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </AdminBtn>
            <AdminBtn type="button" variant="primary" onClick={openCreate}>
              <Plus className="h-4 w-4" />
              Add language
            </AdminBtn>
          </>
        }
      />

      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        {[
          { label: "Total", value: stats.total },
          { label: "Published", value: stats.published },
          { label: "Drafts", value: stats.drafts },
        ].map((s) => (
          <AdminCard key={s.label} className="p-4">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="font-mono text-2xl font-bold mt-1">{loading ? "—" : s.value}</p>
          </AdminCard>
        ))}
      </div>

      <AdminCard className="mb-6 p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <AdminInput
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or description…"
              className="pl-9"
            />
          </div>
          <AdminSelect
            value={filterPublished}
            onChange={(e) => setFilterPublished(e.target.value as FilterPublished)}
            className="sm:w-44"
          >
            <option value="all">All statuses</option>
            <option value="true">Published only</option>
            <option value="false">Drafts only</option>
          </AdminSelect>
        </div>
      </AdminCard>

      {error && (
        <div className="mb-4 flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">Could not load languages</p>
            <p className="mt-1 opacity-90">{error}</p>
            <p className="mt-2 text-xs">
              Make sure the backend is running at{" "}
              <code className="rounded bg-black/20 px-1">{process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}</code>
            </p>
            <AdminBtn type="button" variant="ghost" className="mt-3 !text-destructive" onClick={() => load()}>
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
                <th className="px-4 py-3 font-medium">Language</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">Category</th>
                <th className="px-4 py-3 font-medium hidden sm:table-cell">Topics</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-muted-foreground">
                    Loading languages…
                  </td>
                </tr>
              ) : languages.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center">
                    <p className="text-muted-foreground">No languages found.</p>
                    <AdminBtn type="button" variant="primary" className="mt-4" onClick={openCreate}>
                      <Plus className="h-4 w-4" />
                      Add your first language
                    </AdminBtn>
                  </td>
                </tr>
              ) : (
                languages.map((lang) => (
                  <tr
                    key={lang._id}
                    className="border-b border-white/[0.06] last:border-0 hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg font-mono text-[10px] font-black"
                          style={{
                            background: `${lang.color}22`,
                            color: lang.color,
                            border: `1px solid ${lang.color}44`,
                          }}
                        >
                          {lang.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium truncate">{lang.name}</p>
                          <p className="text-xs text-muted-foreground truncate">/{lang.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell capitalize text-muted-foreground">
                      {lang.category}
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell text-muted-foreground">
                      {lang.totalTopics ?? 0}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge published={lang.isPublished} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap justify-end gap-1">
                        {lang.isPublished && (
                          <Link href={`/docs/${lang.slug}`} target="_blank">
                            <AdminBtn type="button" variant="ghost" className="!px-2" title="View on site">
                              <ExternalLink className="h-3.5 w-3.5" />
                            </AdminBtn>
                          </Link>
                        )}
                        <Link href={`/admin/languages/${lang.slug}/topics`}>
                          <AdminBtn type="button" variant="default" className="!px-2.5 !py-1.5 text-xs">
                            <FolderOpen className="h-3.5 w-3.5" />
                            <span className="hidden lg:inline">Topics</span>
                          </AdminBtn>
                        </Link>
                        <AdminBtn
                          type="button"
                          variant="ghost"
                          className="!px-2"
                          title="Edit"
                          onClick={() => openEdit(lang)}
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </AdminBtn>
                        <AdminBtn
                          type="button"
                          variant="danger"
                          className="!px-2"
                          title="Delete"
                          onClick={() => openDelete(lang)}
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

      {modal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={closeModal}
            aria-label="Close"
          />
          <div
            className="relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-white/[0.1] bg-card shadow-2xl"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-4 shrink-0">
              <h2 className="font-mono text-lg font-bold">
                {modal === "create" && "Add language"}
                {modal === "edit" && `Edit ${selected?.name}`}
                {modal === "delete" && "Delete language"}
              </h2>
              <button
                type="button"
                onClick={closeModal}
                className="rounded-lg p-2 text-muted-foreground hover:bg-white/[0.06] hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="overflow-y-auto p-5">
              {modal === "delete" && selected && (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Delete <strong className="text-foreground">{selected.name}</strong>? This only works if
                    the language has no topics. Delete all topics first.
                  </p>
                  {actionError && (
                    <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                      {actionError}
                    </p>
                  )}
                  <div className="flex gap-3">
                    <AdminBtn type="button" variant="danger" onClick={handleDelete}>
                      Delete permanently
                    </AdminBtn>
                    <AdminBtn type="button" variant="ghost" onClick={closeModal}>
                      Cancel
                    </AdminBtn>
                  </div>
                </div>
              )}

              {modal === "create" && (
                <LanguageForm
                  initial={emptyLanguageForm()}
                  submitLabel="Create language"
                  onCancel={closeModal}
                  onSubmit={handleCreate}
                />
              )}

              {modal === "edit" && selected && (
                <LanguageForm
                  initial={selected}
                  submitLabel="Save changes"
                  onCancel={closeModal}
                  onSubmit={handleUpdate}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
