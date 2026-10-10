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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "https://api.abcz.workers.dev/api/bazardor/products"
        );
        if (!res.ok) throw new Error("Failed to fetch products");
        const data: Product[] = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // ===== Loading Skeleton =====
  if (loading) {
    return (
      <div className="w-full border-b border-gray-100 bg-white">
        <div className="w-full overflow-hidden">
          <div className="flex items-center gap-4 py-1.5 sm:py-2 animate-pulse">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-3 sm:h-4 w-32 sm:w-40 bg-gray-200 rounded shrink-0"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ===== Empty State =====
  if (products.length === 0) {
    return null;
  }

  return (
    <div className="w-full border-b border-gray-100 bg-white">
      {/* ✅ Inline CSS — responsive speed */}
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
        /* ✅ Mobile-এ দ্রুত scroll (কম দূরত্ব → বেশি loop) */
        @media (max-width: 640px) {
          .marquee-track {
            animation-duration: 25s;
          }
        }
        /* ✅ Reduced motion সাপোর্ট */
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
          }
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
                className="inline-flex items-center gap-1 sm:gap-1.5"
              >
                {/* Icon — ছোট screen এ ছোট */}
                <span className="text-[11px] sm:text-sm md:text-base leading-none">
                  {product.categoryIcon}
                </span>

                {/* Product name + price */}
                <span className="text-[11px] sm:text-sm md:text-base">
                  {product.nameBn}{" "}
                  <span className="font-semibold text-gray-900">
                    {product.today.toLocaleString("bn-BD")}
                  </span>{" "}
                  টাকা/{unitBn}
                </span>

                {/* Change indicator */}
                {isUp && (
                  <span className="text-green-600 font-bold text-[11px] sm:text-sm md:text-base">
                    ▲ {changePct.toLocaleString("bn-BD")}%
                  </span>
                )}
                {isDown && (
                  <span className="text-red-600 font-bold text-[11px] sm:text-sm md:text-base">
                    ▼ {changePct.toLocaleString("bn-BD")}%
                  </span>
                )}

                {/* Separator */}
                <span className="inline-block w-4 sm:w-6 md:w-8 text-gray-300">
                  •
                </span>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Marquee;