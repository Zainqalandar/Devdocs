export default function DocsLoading() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-10 animate-pulse">
      {/* Header skeleton */}
      <div className="mb-8 pb-6 border-b border-border">
        <div className="h-10 bg-muted rounded-lg w-2/3 mb-4" />
        <div className="flex gap-4">
          <div className="h-4 bg-muted rounded w-24" />
          <div className="h-4 bg-muted rounded w-20" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="space-y-4">
        <div className="h-4 bg-muted rounded w-full" />
        <div className="h-4 bg-muted rounded w-5/6" />
        <div className="h-4 bg-muted rounded w-4/6" />
      </div>

      {/* Code block skeleton */}
      <div className="my-6 rounded-xl border border-border overflow-hidden">
        <div className="h-10 bg-muted/50 border-b border-border" />
        <div className="p-4 space-y-2 bg-code-bg">
          <div className="h-4 bg-muted/30 rounded w-3/4" />
          <div className="h-4 bg-muted/30 rounded w-2/3" />
          <div className="h-4 bg-muted/30 rounded w-5/6" />
          <div className="h-4 bg-muted/30 rounded w-1/2" />
        </div>
      </div>

      <div className="space-y-3 mt-4">
        <div className="h-4 bg-muted rounded w-full" />
        <div className="h-4 bg-muted rounded w-5/6" />
        <div className="h-4 bg-muted rounded w-3/4" />
      </div>
    </div>
  );
}
