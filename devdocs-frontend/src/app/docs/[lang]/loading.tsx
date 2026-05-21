export default function LangLoading() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 animate-pulse">
      <div className="flex items-start gap-5 mb-10 pb-10 border-b border-border">
        <div className="w-16 h-16 rounded-2xl bg-muted shrink-0" />
        <div className="flex-1">
          <div className="h-9 bg-muted rounded-lg w-56 mb-3" />
          <div className="h-4 bg-muted rounded w-full mb-2" />
          <div className="h-4 bg-muted rounded w-4/5" />
        </div>
      </div>
      <div className="space-y-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-16 bg-muted rounded-xl" />
        ))}
      </div>
    </div>
  );
}
