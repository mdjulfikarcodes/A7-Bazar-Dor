"use client";

import { useEffect, useState } from "react";

interface Product {
  id: number;
  nameBn: string;
  categoryIcon: string;
  unit: string;
  today: number;
  change: {
    dir: string;
    pct: number;
  };
}

const PriceUp = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "https://api.api-store.workers.dev/api/bazardor/products"
        );

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data: Product[] = await res.json();

        const topProducts = data
          .filter((product) => product.change.dir === "up")
          .sort((a, b) => b.change.pct - a.change.pct)
          .slice(0, 6);

        setProducts(topProducts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <h2 className="mb-5 text-2xl font-bold text-gray-800">
        <span className="text-red-500">▲</span> আজ দাম বেড়েছে
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 text-2xl">
                {product.categoryIcon}
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  {product.nameBn}
                </h3>

                <p className="text-xs text-gray-500">
                  প্রতি {product.unit}
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-end justify-between">
              <div>
                <p className="text-xs text-gray-500">আজকের দাম</p>

                <p className="text-xl font-bold text-gray-800">
                  {product.today} টাকা
                </p>
              </div>

              <div className="rounded-full bg-red-50 px-3 py-1">
                <span className="text-xs font-semibold text-red-500">
                  ▲ {product.change.pct}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PriceUp;