import ProductGridSkeleton from "@/components/ProductGridSkeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#fcfcfc] p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Header Skeleton */}
        <div className="bg-white rounded-2xl p-6 flex items-center gap-4 shadow-sm border border-gray-100 animate-pulse">
          <div className="w-12 h-12 bg-gray-200 rounded-full" />
          <div className="space-y-2 flex-1">
            <div className="h-5 w-40 bg-gray-200 rounded" />
            <div className="h-3 w-56 bg-gray-100 rounded" />
          </div>
        </div>

        {/* Sort Bar Skeleton */}
        <div className="bg-white rounded-2xl p-4 flex justify-end shadow-sm border border-gray-100 animate-pulse">
          <div className="h-9 w-40 bg-gray-200 rounded-lg" />
        </div>

        {/* Title Skeleton */}
        <div className="h-4 w-48 bg-gray-200 rounded animate-pulse mt-8 mb-4" />

        {/* Product Grid Skeleton */}
        <ProductGridSkeleton count={6} />

      </div>
    </div>
  );
}