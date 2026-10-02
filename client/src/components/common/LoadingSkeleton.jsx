function LoadingSkeleton({ count = 8 }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse overflow-hidden rounded-2xl border bg-white"
        >
          <div className="h-56 bg-slate-200" />
          <div className="space-y-3 p-5">
            <div className="h-4 w-3/4 rounded bg-slate-200" />
            <div className="h-4 w-1/3 rounded bg-slate-200" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default LoadingSkeleton;