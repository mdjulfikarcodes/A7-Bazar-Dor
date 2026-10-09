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

const Marquee = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "https://api.abcz.workers.dev/api/bazardor/products"
        );

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data: Product[] = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="w-full border-b border-gray-100 ">
      <div className="w-full overflow-hidde">
      <marquee className="block w-full text-xs sm:text-sm md:text-base py-1.5 sm:py-2">
        {products.map((product) => {
          const isUp = product.change.dir === "up";
          const isDown = product.change.dir === "down";

          const unitBn =
            product.unit === "kg"
              ? "কেজি"
              : product.unit === "ltr"
              ? "লিটার"
              : product.unit;

          return (
            <span key={product.id}>
              {product.categoryIcon} {product.nameBn}{" "}
              {product.today.toLocaleString("bn-BD")} টাকা/{unitBn}{" "}

              {isUp && (
                <span style={{ color: "green", fontWeight: "bold" }}>
                  ▲ {product.change.pct.toLocaleString("bn-BD")}%
                </span>
              )}

              {isDown && (
                <span style={{ color: "red", fontWeight: "bold" }}>
                  ▼ {product.change.pct.toLocaleString("bn-BD")}%
                </span>
              )}

              <span className="inline-block w-6 sm:w-8 md:w-10" />
            </span>
          );
        })}
      </marquee>
    </div>
    </div>
  );
};

export default Marquee;