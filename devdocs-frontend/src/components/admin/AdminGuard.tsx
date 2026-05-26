"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { api } from "@/api/client";
import { ShieldAlert, Loader2 } from "lucide-react";
import Link from "next/link";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, token, isAuthenticated, setAuth } = useAuthStore();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function verify() {
      if (!token) {
        if (!cancelled) {
          setChecking(false);
          router.replace(`/auth/login?redirect=${encodeURIComponent(pathname)}`);
        }
        return;
      }

      if (user?.role === "admin") {
        if (!cancelled) setChecking(false);
        return;
      }

      try {
        const res = await api.getMe();
        if (cancelled) return;
        if (res.data) {
          setAuth(res.data, token);
          if (res.data.role !== "admin") setChecking(false);
          else setChecking(false);
        } else setChecking(false);
      } catch {
        if (!cancelled) setChecking(false);
      }
    }

    verify();
    return () => {
      cancelled = true;
    };
  }, [token, user?.role, pathname, router, setAuth]);

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated || !token) return null;

  if (user?.role !== "admin") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6 text-center">
        <ShieldAlert className="h-12 w-12 text-amber-400" />
        <h1 className="font-mono text-xl font-bold">Admin access required</h1>
        <p className="max-w-md text-sm text-muted-foreground">
          Your account does not have admin privileges. Run the seed script or ask an administrator to
          promote your user role.
        </p>
        <Link href="/docs" className="text-sm text-primary hover:underline">
          Back to docs
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}
