import { notFound } from "next/navigation";
import ProductSort from "./ProductSort";

interface CategoryProduct {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "neutral";
    pct: number;
  };
}

const getCategoryProducts = async (
  categorySlug: string
): Promise<CategoryProduct[]> => {
  const res: Response = await fetch(
    `https://api.abcz.workers.dev/api/bazardor/products?category=${categorySlug}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();

  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.products)) return data.products;
  if (data && Array.isArray(data.data)) return data.data;

  return [];
};

const CategoryProducts = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug: categorySlug } = await params;
  const products = await getCategoryProducts(categorySlug);

  // ✅ কোনো পণ্য না থাকলে 404
  if (!products || products.length === 0) {
    notFound();
  }

  const headerTitle = products[0]?.categoryNameBn || categorySlug || "পণ্য";
  const headerIcon = products[0]?.categoryIcon || "📦";
  const totalProducts = products.length;

  return (
    <div className="min-h-screen bg-[#fcfcfc] p-3 sm:p-4 md:p-6 lg:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-4 mt-5 sm:space-y-5 md:space-y-6">

        {/* Top Header Card */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 md:p-6 flex items-center gap-3 sm:gap-4 shadow-sm border border-gray-100">
          <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 shrink-0 bg-gray-100 rounded-full flex items-center justify-center text-xl sm:text-2xl">
            {headerIcon}
          </div>
          <div className="min-w-0">
            <h1 className="text-lg sm:text-xl font-bold text-gray-800 truncate">
              {headerTitle}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              {totalProducts}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>

        {/* ✅ Client Component — sorting এখানে */}
        <ProductSort products={products} />
      </div>
    </div>
  );
};

export default CategoryProducts;