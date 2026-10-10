export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl p-2.5 sm:p-4 md:p-5 lg:p-6 shadow-sm border border-gray-100 animate-pulse">
      {/* Header */}
      <div className="flex items-center gap-1.5 sm:gap-3 md:gap-4 mb-2.5 sm:mb-5 md:mb-6">
        <div className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-gray-200 rounded-full shrink-0" />
        <div className="space-y-1 sm:space-y-2 flex-1 min-w-0">
          <div className="h-3 sm:h-4 md:h-5 w-20 sm:w-24 md:w-28 bg-gray-200 rounded" />
          <div className="h-2 sm:h-3 w-12 sm:w-14 md:w-16 bg-gray-100 rounded" />
        </div>
      </div>

      {/* Price */}
      <div className="flex justify-between items-end gap-1.5 sm:gap-2">
        <div className="space-y-0.5 sm:space-y-1 min-w-0">
          <div className="h-2 sm:h-3 w-12 sm:w-16 bg-gray-100 rounded" />
          <div className="h-4 sm:h-5 md:h-6 lg:h-7 w-14 sm:w-16 md:w-18 lg:w-20 bg-gray-200 rounded" />
        </div>
        <div className="h-4 sm:h-5 md:h-6 lg:h-7 w-10 sm:w-12 md:w-14 bg-gray-200 rounded-md shrink-0" />
      </div>
    </div>
  );
}