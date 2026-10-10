"use client";

import { useState } from "react";
import Link from "next/link";

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  today: number;
  unit: string;
  image: string;
  change: {
    dir: "up" | "down" | "neutral";
    pct: number;
  };
}

export default function ProductSort({ products }: { products: Product[] }) {
  const [sortType, setSortType] = useState("default");

  const sortedProducts = [...products].sort((a, b) => {
    if (sortType === "low-high") return a.today - b.today;
    if (sortType === "high-low") return b.today - a.today;
    return 0;
  });

  return (
    <>
      {/* Filter/Search Bar */}
      <div className="bg-white rounded-2xl p-3 sm:p-4 flex justify-end items-center gap-2 sm:gap-4 shadow-sm border border-gray-100">
        <span className="text-xs sm:text-sm text-gray-500 shrink-0">সাজান</span>
        <div className="relative">
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="appearance-none bg-white border border-gray-200 text-gray-700 py-1.5 sm:py-2 pl-3 sm:pl-4 pr-8 sm:pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent cursor-pointer text-xs sm:text-sm font-medium max-w-40 sm:max-w-none"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low-high">দাম: কম থেকে বেশি</option>
            <option value="high-low">দাম: বেশি থেকে কম</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 sm:px-3 text-gray-400">
            <svg
              className="fill-current h-3.5 w-3.5 sm:h-4 sm:w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Section Title */}
      <h2 className="text-xs sm:text-sm font-medium text-gray-500 mt-5 sm:mt-6 md:mt-8 mb-3 sm:mb-4">
        মোট {sortedProducts.length}টি পণ্য দেখানো হচ্ছে
      </h2>

      {/* ✅ Product Cards Grid — mobile-এ compact */}
      <div className="grid grid-cols-2 gap-1.5 sm:gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-6">
        {sortedProducts.length > 0 ? (
          sortedProducts.map((product, index) => {
            const { nameBn, today, unit, image, change } = product;

            const unitBn =
              unit === "kg" ? "কেজি" : unit === "ltr" ? "লিটার" : unit;

            const isUp = change?.dir === "up";
            const isDown = change?.dir === "down";
            const isNeutral = !isUp && !isDown;
            const changePct = change?.pct || 0;

            return (
              <Link
                href={`/product/${product.slug}`}
                key={product.id || index}
                className="bg-white rounded-xl sm:rounded-2xl p-2.5 sm:p-4 md:p-5 lg:p-6 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md hover:border-green-200 transition-all cursor-pointer w-full"
              >
                {/* Card Header */}
                <div className="flex items-center gap-1.5 sm:gap-3 md:gap-4 mb-2.5 sm:mb-5 md:mb-6">
                  <div className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 shrink-0 bg-gray-100 rounded-full flex items-center justify-center text-base sm:text-xl">
                    {image || "📦"}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-xs sm:text-base text-gray-800 leading-tight truncate">
                      {nameBn}
                    </h3>
                    <p className="text-[9px] sm:text-xs text-gray-900 truncate">
                      প্রতি {unitBn}
                    </p>
                  </div>
                </div>

                {/* Card Body */}
                <div className="flex justify-between items-end mt-auto gap-1.5 sm:gap-2">
                  <div className="min-w-0">
                    <p className="text-[9px] sm:text-xs text-gray-900 mb-0.5 sm:mb-1">
                      আজকের দাম
                    </p>
                    <div className="flex items-baseline gap-0.5 sm:gap-1">
                      <span className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900 truncate">
                        {today.toLocaleString("bn-BD")}
                      </span>
                      <span className="text-[9px] sm:text-xs md:text-sm font-medium text-gray-900">
                        টাকা
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-0.5 sm:gap-1 text-[9px] sm:text-xs md:text-sm font-medium shrink-0">
                    {isUp && (
                      <div className="flex items-center gap-0.5 sm:gap-1 text-green-600 bg-green-50 px-1 sm:px-2 py-0.5 sm:py-1 rounded-md">
                        <span className="text-[7px] sm:text-[10px]">▲</span>
                        <span>{changePct}%</span>
                      </div>
                    )}
                    {isDown && (
                      <div className="flex items-center gap-0.5 sm:gap-1 text-red-600 bg-red-50 px-1 sm:px-2 py-0.5 sm:py-1 rounded-md">
                        <span className="text-[7px] sm:text-[10px]">▼</span>
                        <span>{Math.abs(changePct)}%</span>
                      </div>
                    )}
                    {isNeutral && (
                      <div className="flex items-center gap-0.5 sm:gap-1 text-gray-500 bg-gray-50 px-1 sm:px-2 py-0.5 sm:py-1 rounded-md">
                        <span className="text-[7px] sm:text-[10px]">—</span>
                        <span>০.০%</span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <div className="col-span-full text-center py-12 sm:py-16 md:py-20 text-gray-500 bg-white rounded-2xl border border-gray-100">
            <p className="text-sm sm:text-base md:text-lg">
              এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
            </p>
          </div>
        )}
      </div>
    </>
  );
}