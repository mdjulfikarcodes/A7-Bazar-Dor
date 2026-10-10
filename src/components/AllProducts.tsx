import { connection } from "next/server";
import ProductCard, { Product } from "./ProductCard";

const getAllProducts = async (): Promise<Product[]> => {
  try {
    const res = await fetch(
      "https://api.abcz.workers.dev/api/bazardor/products",
      { cache: "no-store" }
    );

    if (!res.ok) {
      console.error("API Error:", res.status);
      return [];
    }

    const data = await res.json();

    // ✅ সব সম্ভাব্য স্ট্রাকচার হ্যান্ডেল করি
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.products)) return data.products;
    if (data && Array.isArray(data.data)) return data.data;

    return [];
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
};

const AllProducts = async () => {
  // ✅ request-time render নিশ্চিত করে
  await connection();

  const products = await getAllProducts();

  return (
    <div
      id="all-products"
      className="min-h-screen bg-[#fcfcfc] p-3 sm:p-4 md:p-6 lg:p-8 font-sans scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto space-y-4 sm:space-y-5 md:space-y-6">

        {/* Section Header */}
        <div>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
            সব পণ্য
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            মোট {products.length}টি পণ্য দেখানো হচ্ছে
          </p>
        </div>

{/* ✅ Product Cards Grid — mobile-এ compact */}
<div className="grid grid-cols-2 gap-1.5 sm:gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-6">
  {products.length > 0 ? (
    products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))
  ) : (
    <div className="col-span-full text-center py-12 sm:py-16 md:py-20 text-gray-500 bg-white rounded-2xl border border-gray-100">
      <p className="text-sm sm:text-base md:text-lg">
        কোনো পণ্য পাওয়া যায়নি।
      </p>
    </div>
  )}
</div>

      </div>
    </div>
  );
};

export default AllProducts;