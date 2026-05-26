"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  FileText,
  Languages,
  LayoutDashboard,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { api } from "@/api/client";
import { useRouter } from "next/navigation";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/languages", label: "Languages", icon: Languages },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, clearAuth } = useAuthStore();

  const handleLogout = () => {
    api.logout();
    clearAuth();
    router.push("/");
  };

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="sidebar-surface hidden w-64 shrink-0 flex-col border-r border-white/[0.06] lg:flex">
        <div className="border-b border-white/[0.06] px-5 py-5">
          <Link href="/admin" className="font-mono text-lg font-bold">
            <span className="text-primary">&lt;</span>Admin<span className="text-primary">/&gt;</span>
          </Link>
          <p className="mt-1 text-xs text-muted-foreground">DevDocs content manager</p>
        </div>

        <nav className="flex-1 space-y-1 p-3">
          {NAV.map(({ href, label, icon: Icon, exact }) => {
            const active = exact ? pathname === href : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:bg-white/[0.04] hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="space-y-1 border-t border-white/[0.06] p-3">
          <Link
            href="/docs"
            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs text-muted-foreground hover:bg-white/[0.04] hover:text-foreground"
          >
            <BookOpen className="h-3.5 w-3.5" />
            View docs site
            <ExternalLink className="ml-auto h-3 w-3" />
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs text-muted-foreground hover:bg-white/[0.04] hover:text-foreground"
          >
            <LogOut className="h-3.5 w-3.5" />
            Sign out
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 items-center justify-between border-b border-white/[0.06] bg-background/90 px-4 backdrop-blur-xl lg:px-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground lg:hidden">
            <FileText className="h-4 w-4 text-primary" />
            <span className="font-mono font-semibold text-foreground">Admin</span>
          </div>
          <p className="hidden text-sm text-muted-foreground lg:block">
            Signed in as <span className="font-medium text-foreground">{user?.name}</span>
          </p>
          <div className="flex items-center gap-2">
            <Link href="/admin/languages" className="text-xs text-primary hover:underline lg:hidden">
              Languages
            </Link>
            <Link href="/docs" className="text-xs text-muted-foreground hover:text-foreground">
              Docs
            </Link>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
