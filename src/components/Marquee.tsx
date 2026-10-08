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
          "https://api.api-store.workers.dev/api/bazardor/products"
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
    <div>
      <marquee>
        {products.map((product) => {
          const isUp = product.change.dir === "up";
          const isDown = product.change.dir === "down";

          return (
            <span key={product.id}>
              {product.categoryIcon} {product.nameBn}{" "}
              {product.today} টাকা/{product.unit}{" "}

              {isUp && (
                <span style={{ color: "green", fontWeight: "bold" }}>
                  ▲ {product.change.pct}%
                </span>
              )}

              {isDown && (
                <span style={{ color: "red", fontWeight: "bold" }}>
                  ▼ {product.change.pct}%
                </span>
              )}

              &nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;
            </span>
          );
        })}
      </marquee>
    </div>
  );
};

export default Marquee;