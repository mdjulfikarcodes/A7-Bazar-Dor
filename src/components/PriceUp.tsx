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

  if (loading) {
    return (
      <section className="mx-auto max-w-6xl px-3 sm:px-4 py-6 sm:py-8">
        <h2 className="mb-4 sm:mb-5 text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
          <span className="text-red-500">▲</span> আজ দাম বেড়েছে
        </h2>
        <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse rounded-2xl border border-gray-200 bg-white p-4 h-32 sm:h-36 md:h-40"
            />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mx-auto max-w-6xl px-3 sm:px-4 py-6 sm:py-8">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 sm:p-5 text-center">
          <p className="text-sm sm:text-base font-semibold text-red-600">
            Product load করা যায়নি
          </p>
          <p className="mt-1 text-xs sm:text-sm text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-3 sm:px-4 py-6 sm:py-8">
      <h2 className="mb-4 sm:mb-5 text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
        <span className="text-red-500">▲</span> আজ দাম বেড়েছে
      </h2>
      <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default PriceUp;