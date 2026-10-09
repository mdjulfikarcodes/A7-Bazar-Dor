"use client";

import { useEffect, useState } from "react";

interface Product {
  id: number;
  nameBn: string;
  categoryIcon: string;
  unit: string;
  today: number;
  change?: {
    dir: string;
    pct: number;
  };
}

const Marquee = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "https://api.abcz.workers.dev/api/bazardor/products"
        );
        if (!res.ok) throw new Error("Failed to fetch products");
        const data: Product[] = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="w-full border-b border-gray-100">
      {/* ✅ Inline CSS — কোনো config file লাগবে না */}
      <style>{`
        @keyframes marqueeScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .marquee-track {
          display: inline-flex;
          animation: marqueeScroll 40s linear infinite;
          will-change: transform;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="w-full overflow-hidden">
        <div className="marquee-track whitespace-nowrap py-1.5 sm:py-2 text-xs sm:text-sm md:text-base">
          {[...products, ...products].map((product, index) => {
            const isUp = product.change?.dir === "up";
            const isDown = product.change?.dir === "down";
            const changePct = product.change?.pct ?? 0;

            const unitBn =
              product.unit === "kg"
                ? "কেজি"
                : product.unit === "ltr"
                ? "লিটার"
                : product.unit;

            return (
              <span
                key={`${product.id}-${index}`}
                className="inline-flex items-center"
              >
                {product.categoryIcon} {product.nameBn}{" "}
                {product.today.toLocaleString("bn-BD")} টাকা/{unitBn}{" "}
                {isUp && (
                  <span style={{ color: "green", fontWeight: "bold" }}>
                    ▲ {changePct.toLocaleString("bn-BD")}%
                  </span>
                )}
                {isDown && (
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    ▼ {changePct.toLocaleString("bn-BD")}%
                  </span>
                )}
                <span className="inline-block w-6 sm:w-8 md:w-10" />
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Marquee;