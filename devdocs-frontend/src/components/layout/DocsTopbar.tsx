"use client";

import Link from "next/link";
import { Menu, Search, ChevronRight, User, LogOut } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { api } from "@/api/client";
import { useRouter } from "next/navigation";

interface DocsTopbarProps {
  langName: string;
  langSlug: string;
  topicTitle?: string;
  topicSlug?: string;
  sectionTitle?: string;
  onMenuClick: () => void;
}

export function DocsTopbar({
  langName,
  langSlug,
  topicTitle,
  topicSlug,
  sectionTitle,
  onMenuClick,
}: DocsTopbarProps) {
  const { user, isAuthenticated, clearAuth } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    api.logout();
    clearAuth();
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b border-white/[0.06] bg-background/85 px-4 backdrop-blur-xl">
      {/* Mobile menu */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-1.5 rounded-md hover:bg-accent transition-colors"
      >
        <Menu className="w-4 h-4" />
      </button>

      {/* Logo */}
      <Link href="/" className="font-mono font-bold text-sm hidden lg:flex items-center gap-1">
        <span className="text-primary">&lt;</span>DevDocs<span className="text-primary">/&gt;</span>
      </Link>

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground overflow-hidden min-w-0">
        <Link href="/docs" className="hover:text-foreground transition-colors shrink-0">Docs</Link>
        <ChevronRight className="w-3 h-3 shrink-0" />
        <Link href={`/docs/${langSlug}`} className="hover:text-foreground transition-colors shrink-0 font-medium text-foreground">
          {langName}
        </Link>
        {topicTitle && topicSlug && (
          <>
            <ChevronRight className="w-3 h-3 shrink-0" />
            <Link href={`/docs/${langSlug}/topics/${topicSlug}`} className="hover:text-foreground transition-colors truncate hidden sm:block">
              {topicTitle}
            </Link>
          </>
        )}
        {sectionTitle && (
          <>
            <ChevronRight className="w-3 h-3 shrink-0 hidden sm:block" />
            <span className="text-foreground truncate hidden md:block">{sectionTitle}</span>
          </>
        )}
      </nav>

      {/* Right side */}
      <div className="ml-auto flex items-center gap-2">
        {user?.role === "admin" && (
          <Link
            href="/admin"
            className="text-xs font-medium text-primary hover:underline hidden sm:inline"
          >
            Admin
          </Link>
        )}
        <Link href="/search" className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
          <Search className="w-4 h-4" />
        </Link>

        {isAuthenticated ? (
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">
              {user?.name?.[0]?.toUpperCase() ?? "U"}
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              title="Sign out"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <Link
            href="/auth/login"
            className="text-xs bg-primary text-primary-foreground px-3 py-1.5 rounded-md font-medium hover:bg-primary/90 transition-colors hidden sm:inline-flex items-center gap-1"
          >
            <User className="w-3 h-3" /> Sign in
          </Link>
        )}
      </div>
    </header>
  );
}
