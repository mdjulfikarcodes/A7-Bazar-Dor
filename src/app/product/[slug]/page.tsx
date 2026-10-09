import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

export const instant = false;

interface MarketPrice {
  market: string;
  division: string;
  min: number;
  max: number;
}

interface ProductDetails {
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
  markets?: MarketPrice[];
}

const getProductBySlug = async (
  slug: string
): Promise<ProductDetails | null> => {
  try {
    const res = await fetch(
      `https://api.abcz.workers.dev/api/bazardor/products/${slug}`,
      { cache: "no-store" }
    );

    if (res.ok) {
      const data = await res.json();

      if (data && data.slug) return data;
      if (data && data.product) return data.product;
      if (data && data.data) return data.data;
    }

    const listRes = await fetch(
      "https://api.abcz.workers.dev/api/bazardor/products",
      { cache: "no-store" }
    );

    if (listRes.ok) {
      const listData = await listRes.json();

      let products: ProductDetails[] = [];

      if (Array.isArray(listData)) products = listData;
      else if (listData?.products) products = listData.products;
      else if (listData?.data) products = listData.data;

      const found = products.find((p) => p.slug === slug);

      if (found) return found;
    }

    return null;
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return null;
  }
};

const getComparisonText = (
  label: string,
  today: number,
  compareValue: number
) => {
  const diff = today - compareValue;

  if (diff > 0) {
    return `${label} থেকে ৳ ${diff} বেশি`;
  } else if (diff < 0) {
    return `${label} থেকে ৳ ${Math.abs(diff)} কম`;
  } else {
    return `${label}ের সমান`;
  }
};

const ProductDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug: productSlug } = await params;
  const product = await getProductBySlug(productSlug);

  if (!product) {
    notFound();
  }

  const {
    nameBn,
    today,
    yesterday,
    lastWeek,
    lastMonth,
    unit,
    image,
    change,
    categoryNameBn,
    category,
    markets = [],
  } = product;

  const unitBn =
    unit === "kg" ? "কেজি" : unit === "ltr" ? "লিটার" : unit;

  const isUp = change?.dir === "up";
  const isDown = change?.dir === "down";
  const changePct = change?.pct || 0;

  // সর্বনিম্ন এবং সর্বোচ্চ দাম বের করা
  const allMins = markets
    .map((m) => Number(m.min))
    .filter((n) => !isNaN(n));

  const allMaxs = markets
    .map((m) => Number(m.max))
    .filter((n) => !isNaN(n));

  const lowestPrice =
    allMins.length > 0 ? Math.min(...allMins) : today;

  const highestPrice =
    allMaxs.length > 0 ? Math.max(...allMaxs) : today;

  // সারসংক্ষেপের গড় দাম
  const averagePrice = (lowestPrice + highestPrice) / 2;

  // সর্বনিম্ন এবং সর্বোচ্চ দামের বাজার
  const lowestMarket = markets.find(
    (m) => Number(m.min) === lowestPrice
  );

  const highestMarket = markets.find(
    (m) => Number(m.max) === highestPrice
  );

  // গতকালের সাথে তুলনা
  const yesterdayDiff = today - yesterday;

  const yesterdayText =
    yesterdayDiff > 0
      ? `গতকালের তুলনায় আজ দাম বেড়েছে · ${yesterdayDiff} টাকা`
      : yesterdayDiff < 0
        ? `গতকালের তুলনায় আজ দাম কমেছে · ${Math.abs(
          yesterdayDiff
        )} টাকা`
        : "গতকালের তুলনায় আজ দাম অপরিবর্তিত";

  const yesterdayColor =
    yesterdayDiff > 0
      ? "text-red-500"
      : yesterdayDiff < 0
        ? "text-green-600"
        : "text-gray-400";

  return (
    <div className="min-h-screen bg-[#fcfcfc] p-3 sm:p-4 md:p-6 lg:p-8 font-sans">
      <div className="max-w-5xl mt-5 mx-auto space-y-4 sm:space-y-5 md:space-y-6">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-gray-500">
          <Link href="/" className="hover:text-gray-800">
            হোম
          </Link>

          <span>›</span>

          <Link
            href={`/category/${category}`}
            className="hover:text-gray-800"
          >
            {categoryNameBn}
          </Link>

          <span>›</span>

          <span className="text-gray-800 font-medium truncate max-w-[140px] sm:max-w-none">
            {nameBn}
          </span>
        </nav>

        {/* Product Header Card */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gray-100 rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl sm:text-3xl md:text-4xl shrink-0">
                {image || "📦"}
              </div>

              <div className="min-w-0">
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                  {nameBn}
                </h1>

                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-2">
                  <span className="inline-flex items-center text-[10px] sm:text-xs font-medium text-gray-600 bg-gray-100 px-2 sm:px-2.5 py-1 rounded-full">
                    প্রতি {unitBn}
                  </span>

                  <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-medium text-green-700 bg-green-50 px-2 sm:px-2.5 py-1 rounded-full">
                    {product.categoryIcon} {categoryNameBn}
                  </span>
                </div>

                <p className={`text-[10px] sm:text-xs mt-2 sm:mt-3 font-medium ${yesterdayColor}`}>
                  {yesterdayText}
                </p>
              </div>
            </div>

            {/* Today's Rate */}
            <div className="bg-gray-50 rounded-xl p-3 sm:p-4 text-center w-full md:w-auto md:min-w-[140px] shrink-0">
              <p className="text-[10px] sm:text-xs text-gray-500 mb-1">
                আজকের রেট
              </p>

              <div className="flex items-baseline justify-center gap-1">
                <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {today.toLocaleString("bn-BD")}
                </span>

                <span className="text-[10px] sm:text-xs text-gray-600">
                  টাকা / {unitBn}
                </span>
              </div>

              <div className="mt-2 flex justify-center">
                {isUp && (
                  <div className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-medium text-red-600">
                    <span>▲</span>
                    <span>
                      {changePct.toLocaleString("bn-BD")}%
                    </span>
                  </div>
                )}

                {isDown && (
                  <div className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-medium text-green-600">
                    <span>▼</span>
                    <span>
                      {Math.abs(changePct).toLocaleString("bn-BD")}%
                    </span>
                  </div>
                )}

                {!isUp && !isDown && (
                  <div className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-medium text-gray-500">
                    <span>—</span>
                    <span>০.০%</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Price Summary Section */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 shadow-sm border border-gray-100">
          <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4 sm:mb-5">
            দামের সারসংক্ষেপ
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
            {/* Lowest Price */}
            <div className="border border-gray-100 rounded-xl p-4 sm:p-5 md:p-6">
              <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">
                সর্বনিম্ন দাম
              </p>

              <div className="flex items-baseline gap-1 sm:gap-2 text-green-600 font-bold flex-wrap">
                <span className="text-2xl sm:text-3xl md:text-4xl">
                  ৳ {lowestPrice.toLocaleString("bn-BD")}
                </span>

                <span className="text-xs sm:text-sm font-medium">টাকা</span>
              </div>

              <p className="text-[10px] sm:text-xs text-gray-600 mt-2 sm:mt-3">
                সবচেয়ে কম দামের বাজার
              </p>
            </div>

            {/* Highest Price */}
            <div className="border border-gray-100 rounded-xl p-4 sm:p-5 md:p-6">
              <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">
                সর্বাধিক দাম
              </p>

              <div className="flex items-baseline gap-1 sm:gap-2 text-red-500 font-bold flex-wrap">
                <span className="text-2xl sm:text-3xl md:text-4xl">
                  ৳ {highestPrice.toLocaleString("bn-BD")}
                </span>

                <span className="text-xs sm:text-sm font-medium">টাকা</span>
              </div>

              <p className="text-[10px] sm:text-xs text-gray-600 mt-2 sm:mt-3">
                প্রতি {unitBn}-এর হিসাবে
              </p>
            </div>

            {/* Average Price */}
            <div className="border border-gray-100 rounded-xl p-4 sm:p-5 md:p-6 sm:col-span-2 md:col-span-1">
              <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">
                গড় দাম
              </p>

              <div className="flex items-baseline gap-1 sm:gap-2 text-green-600 font-bold flex-wrap">
                <span className="text-2xl sm:text-3xl md:text-4xl">
                  ৳{" "}
                  {averagePrice.toLocaleString("bn-BD", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  })}
                </span>

                <span className="text-xs sm:text-sm font-medium">টাকা</span>
              </div>

              <p className="text-[10px] sm:text-xs text-gray-600 mt-2 sm:mt-3">
                প্রতি {unitBn}-এর হিসাবে
              </p>
            </div>
          </div>
        </div>

        {/* Market-wise Price Table */}
<div className="bg-white rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 shadow-sm border border-gray-100">
  <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-800 mb-3 sm:mb-4">
    বাজারভিত্তিক আজকের দাম
  </h2>

  {markets.length > 0 ? (
    <>
      {/* ===== Mobile View (< sm) — Card layout ===== */}
      <div className="sm:hidden space-y-2.5">
        {markets.map((market, idx) => {
          const currentPrice =
            (Number(market.min) + Number(market.max)) / 2;

          return (
            <div
              key={idx}
              className="border border-gray-100 rounded-xl p-3 bg-gray-50/40"
            >
              {/* Market + Division */}
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <p className="font-semibold text-xs text-gray-800 truncate">
                  {market.market}
                </p>
                <span className="text-[10px] text-gray-500 bg-white border border-gray-100 px-2 py-0.5 rounded-full shrink-0">
                  {market.division}
                </span>
              </div>

              {/* Price rows */}
              <div className="grid grid-cols-3 gap-1.5 text-center">
                <div className="bg-white rounded-lg py-2 px-1 border border-gray-100">
                  <p className="text-[9px] text-gray-500 mb-0.5">
                    সর্বনিম্ন
                  </p>
                  <p className="text-[11px] font-semibold text-gray-800">
                    ৳ {Number(market.min).toLocaleString("bn-BD")}
                  </p>
                </div>

                <div className="bg-white rounded-lg py-2 px-1 border border-gray-100">
                  <p className="text-[9px] text-gray-500 mb-0.5">
                    সর্বাধিক
                  </p>
                  <p className="text-[11px] font-semibold text-gray-800">
                    ৳ {Number(market.max).toLocaleString("bn-BD")}
                  </p>
                </div>

                <div className="bg-white rounded-lg py-2 px-1 border border-gray-100">
                  <p className="text-[9px] text-gray-500 mb-0.5">গড়</p>
                  <p className="text-[11px] font-semibold text-gray-800">
                    ৳{" "}
                    {currentPrice.toLocaleString("bn-BD", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ===== Tablet + Desktop View (sm+) — Table ===== */}
      <div className="hidden sm:block overflow-x-auto -mx-1 sm:mx-0 px-1 sm:px-0">
        <table className="w-full text-xs md:text-sm min-w-[520px]">
          <thead>
            <tr className="bg-gray-50 text-gray-600 text-left">
              <th className="py-2.5 md:py-3 px-2.5 sm:px-3 md:px-4 font-semibold rounded-l-lg whitespace-nowrap">
                বাজার
              </th>

              <th className="py-2.5 md:py-3 px-2.5 sm:px-3 md:px-4 font-semibold whitespace-nowrap">
                বিভাগ
              </th>

              <th className="py-2.5 md:py-3 px-2.5 sm:px-3 md:px-4 font-semibold whitespace-nowrap">
                সর্বনিম্ন
              </th>

              <th className="py-2.5 md:py-3 px-2.5 sm:px-3 md:px-4 font-semibold whitespace-nowrap">
                সর্বাধিক
              </th>

              <th className="py-2.5 md:py-3 px-2.5 sm:px-3 md:px-4 font-semibold rounded-r-lg whitespace-nowrap">
                গড়
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {markets.map((market, idx) => {
              const currentPrice =
                (Number(market.min) + Number(market.max)) / 2;

              return (
                <tr
                  key={idx}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="py-2.5 md:py-4 px-2.5 sm:px-3 md:px-4 text-gray-800 font-medium whitespace-nowrap">
                    {market.market}
                  </td>

                  <td className="py-2.5 md:py-4 px-2.5 sm:px-3 md:px-4 text-gray-500 whitespace-nowrap">
                    {market.division}
                  </td>

                  <td className="py-2.5 md:py-4 px-2.5 sm:px-3 md:px-4 text-gray-800 whitespace-nowrap">
                    {Number(market.min).toLocaleString("bn-BD")} টাকা
                  </td>

                  <td className="py-2.5 md:py-4 px-2.5 sm:px-3 md:px-4 text-gray-800 whitespace-nowrap">
                    {Number(market.max).toLocaleString("bn-BD")} টাকা
                  </td>

                  <td className="py-2.5 md:py-4 px-2.5 sm:px-3 md:px-4 text-gray-800 font-semibold whitespace-nowrap">
                    {currentPrice.toLocaleString("bn-BD", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 2,
                    })}{" "}
                    টাকা
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  ) : (
    <div className="text-center py-8 sm:py-10 text-gray-400 bg-gray-50 rounded-xl text-xs sm:text-sm">
      বাজারভিত্তিক দামের তথ্য পাওয়া যায়নি।
    </div>
  )}
</div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;