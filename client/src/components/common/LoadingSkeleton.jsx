function LoadingSkeleton({ count = 8 }) {
  return (
    <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-[0.82] rounded-[2rem] bg-[#cfd7d9]" />
          <div className="space-y-3 px-1 pt-4">
            <div className="h-4 w-3/4 rounded-full bg-[#c7d0d2]" />
            <div className="h-3 w-1/3 rounded-full bg-[#c7d0d2]" />
          </div>
        </div>
      ))}
    </div>
  );
}
export default LoadingSkeleton;
