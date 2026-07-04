export default function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-square shimmer-bg" />
      <div className="pt-3 space-y-2">
        <div className="h-3 shimmer-bg w-1/3" />
        <div className="h-4 shimmer-bg w-3/4" />
        <div className="h-3 shimmer-bg w-1/4" />
        <div className="h-4 shimmer-bg w-1/3 mt-2" />
        <div className="h-8 shimmer-bg w-full mt-3" />
      </div>
    </div>
  );
}
