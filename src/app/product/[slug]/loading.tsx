export default function Loading() {
  return (
    <div className="min-h-screen bg-[#fcfcfc] p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Image Skeleton */}
            <div className="w-full md:w-1/3 h-48 md:h-64 bg-gray-200 rounded-2xl animate-pulse" />

            {/* Details Skeleton */}
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-1/2 bg-gray-100 rounded animate-pulse" />
              </div>

              <div className="pt-4 border-t border-gray-100 space-y-3">
                <div className="h-4 w-24 bg-gray-100 rounded animate-pulse" />
                <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
                <div className="h-7 w-48 bg-gray-100 rounded animate-pulse" />
              </div>

              <div className="pt-4 border-t border-gray-100 grid grid-cols-3 gap-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-3 w-16 bg-gray-100 rounded animate-pulse" />
                    <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}