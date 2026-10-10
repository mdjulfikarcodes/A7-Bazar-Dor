import AllProducts from "@/components/AllProducts";
import Banner from "@/components/Banner";

import PriceDown from "@/components/PriceDown";
import PriceUp from "@/components/PriceUp";

import { Suspense } from "react";
import ProductGridSkeleton from "@/components/ProductGridSkeleton";


export default function Home() {
  return (
    <div>
      <Banner/>
      <PriceUp/>
      <PriceDown/>

      <Suspense fallback={<AllProductsSkeleton />}>
        <AllProducts/>
      </Suspense>

    </div>
  );
}


// ✅ শুধু এই অংশটুকু নতুন যোগ করা
function AllProductsSkeleton() {
  return (
    <div className="min-h-screen bg-[#fcfcfc] p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-4 sm:space-y-5 md:space-y-6">
        
        {/* Section Header Skeleton */}
        <div className="space-y-2 animate-pulse">
          <div className="h-6 w-32 bg-gray-200 rounded" />
          <div className="h-4 w-48 bg-gray-100 rounded" />
        </div>

        {/* Product Grid Skeleton */}
        <ProductGridSkeleton count={6} />
      </div>
    </div>
  );
}