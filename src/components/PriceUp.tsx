"use client";

import { useEffect, useState } from "react";
import ProductCard, { Product } from "./ProductCard";

const PriceUp = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          "https://api.abcz.workers.dev/api/bazardor/products",
          {
            headers: { Accept: "application/json" },
            cache: "no-store",
          }
        );

        if (!res.ok) throw new Error(`API Error: ${res.status}`);

        const data: Product[] = await res.json();

        const topProducts = data
          .filter((p) => p.change && p.change.dir === "up")
          .sort((a, b) => b.change.pct - a.change.pct)
          .slice(0, 6);

        setProducts(topProducts);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Product load করা যায়নি");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ===== Loading Skeleton =====
  if (loading) {
    return (
      <section className="mx-auto max-w-6xl px-3 sm:px-4 py-4 sm:py-8">
        <h2 className="mb-3 sm:mb-5 text-base sm:text-xl md:text-2xl font-bold text-gray-800">
          <span className="text-red-500">▲</span> আজ দাম বেড়েছে
        </h2>

        {/* ✅ Mobile-এ compact grid */}
        <div className="grid grid-cols-2 gap-1.5 sm:gap-3 md:gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse rounded-xl sm:rounded-2xl border border-gray-200 bg-white p-3 sm:p-4 h-24 sm:h-32 md:h-40"
            >
              {/* Icon + Title skeleton */}
              <div className="flex items-center gap-1.5 sm:gap-3 mb-2 sm:mb-3">
                <div className="w-7 h-7 sm:w-10 sm:h-10 bg-gray-200 rounded-full shrink-0" />
                <div className="space-y-1 flex-1 min-w-0">
                  <div className="h-3 sm:h-4 w-16 sm:w-24 bg-gray-200 rounded" />
                  <div className="h-2 sm:h-3 w-10 sm:w-14 bg-gray-100 rounded" />
                </div>
              </div>

              {/* Price skeleton */}
              <div className="flex justify-between items-end gap-1.5">
                <div className="h-4 sm:h-6 w-14 sm:w-20 bg-gray-200 rounded" />
                <div className="h-4 sm:h-6 w-10 sm:w-12 bg-gray-100 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // ===== Error State =====
  if (error) {
    return (
      <section className="mx-auto max-w-6xl px-3 sm:px-4 py-4 sm:py-8">
        <div className="rounded-xl sm:rounded-2xl border border-red-200 bg-red-50 p-4 sm:p-5 text-center">
          <p className="text-sm sm:text-base font-semibold text-red-600">
            Product load করা যায়নি
          </p>
          <p className="mt-1 text-xs sm:text-sm text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  // ===== Empty State =====
  if (products.length === 0) {
    return null; // অথবা section hide করে দিন
  }

  // ===== Success State =====
  return (
    <section className="mx-auto max-w-6xl px-3 sm:px-4 py-4 sm:py-8">
      <h2 className="mb-3 sm:mb-5 text-base sm:text-xl md:text-2xl font-bold text-gray-800">
        <span className="text-red-500">▲</span> আজ দাম বেড়েছে
      </h2>

      {/* ✅ Mobile-এ compact grid — ২ কলাম, ছোট gap */}
      <div className="grid grid-cols-2 gap-1.5 sm:gap-3 md:gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default PriceUp;