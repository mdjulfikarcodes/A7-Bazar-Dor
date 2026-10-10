"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const Banner = () => {
  const [date, setDate] = useState("");

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const today = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
      });

      setDate(today);
    }, 0);

    return () => window.clearTimeout(timeout);
  }, []);

  // ✅ "সব পণ্য দেখুন" এ ক্লিক করলে স্মুথলি স্ক্রল করবে
  const handleScrollToProducts = () => {
    const section = document.getElementById("all-products");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="mx-auto flex w-full max-w-7xl items-center justify-between px-3 sm:px-4 sm:mt-3">
      <div className="mx-auto mt-10 flex w-full max-w-7xl flex-col md:flex-row items-center justify-between gap-4 sm:gap-5 md:gap-6 overflow-hidden rounded-2xl sm:rounded-3xl border border-gray-200 bg-white px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-7 md:py-8 shadow-sm">

        {/* Left Content */}
        <div className="max-w-2xl w-full md:w-auto text-center md:text-left">
          <div className="mb-2 sm:mb-3 inline-block rounded-full bg-green-100 px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs md:text-sm font-medium text-green-700">
            <p>{date}</p>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight text-gray-900">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="mt-3 sm:mt-4 max-w-xl mx-auto md:mx-0 text-xs sm:text-sm md:text-base leading-6 sm:leading-7 text-gray-500">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত তথ্য, দ্রুত সর্বশেষ এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          {/* ✅ Button with scroll handler */}
          <button
            onClick={handleScrollToProducts}
            className="mt-4 sm:mt-6 rounded-lg bg-green-600 px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-white shadow-md transition hover:bg-green-700 cursor-pointer"
          >
            সব পণ্য দেখুন
          </button>
        </div>

        {/* Right Image — ✅ এখন mobile-এও দেখাবে */}
        <div className="shrink-0 w-full md:w-auto flex justify-center md:justify-end">
          <Image
            src="/bazar-hero.png"
            alt="Bazar Dor"
            width={300}
            height={220}
            priority
            className="object-contain w-auto h-auto max-w-50 sm:max-w-55 lg:max-w-65 xl:max-w-75"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;