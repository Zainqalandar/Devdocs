import { cn } from "@/lib/utils";

export function AdminCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-white/[0.08] bg-card/80 backdrop-blur-sm",
        className
      )}
    >
      {children}
    </div>
  );
}

export function AdminLabel({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-medium text-muted-foreground">
      {children}
    </label>
  );
}

export function AdminInput({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full rounded-lg border border-white/[0.08] bg-background/80 px-3 py-2 text-sm text-foreground outline-none transition-[border-color,box-shadow] focus:border-primary/50 focus:ring-2 focus:ring-primary/15",
        className
      )}
      {...props}
    />
  );
}

export function AdminTextarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "w-full rounded-lg border border-white/[0.08] bg-background/80 px-3 py-2 text-sm text-foreground outline-none transition-[border-color,box-shadow] focus:border-primary/50 focus:ring-2 focus:ring-primary/15 min-h-[88px] resize-y",
        className
      )}
      {...props}
    />
  );
}

export function AdminSelect({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "w-full rounded-lg border border-white/[0.08] bg-background/80 px-3 py-2 text-sm text-foreground outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/15",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}

export function AdminBtn({
  variant = "default",
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "primary" | "danger" | "ghost";
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed",
        variant === "primary" && "bg-primary text-primary-foreground hover:opacity-90",
        variant === "danger" && "bg-destructive/15 text-destructive border border-destructive/30 hover:bg-destructive/25",
        variant === "ghost" && "text-muted-foreground hover:bg-white/[0.05] hover:text-foreground",
        variant === "default" && "border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06]",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function StatusBadge({ published }: { published: boolean }) {
  return (
    <span
      className={cn(
        "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
        published
          ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25"
          : "bg-amber-500/15 text-amber-400 border border-amber-500/25"
      )}
    >
      {published ? "Published" : "Draft"}
    </span>
  );
}

export function AdminPageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="font-mono text-2xl font-bold tracking-tight">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}
