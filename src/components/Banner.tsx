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
    <section className="mx-auto w-full max-w-7xl px-3 sm:px-4 sm:mt-3">
      <div className="mx-auto mt-10 flex w-full max-w-7xl flex-col md:flex-row items-center justify-between gap-5 sm:gap-6 md:gap-8 overflow-hidden rounded-2xl sm:rounded-3xl border border-gray-200 bg-white px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-7 md:py-8 shadow-sm">

        {/* ===== Left Content ===== */}
        <div className="w-full md:w-auto md:max-w-2xl text-center md:text-left order-2 md:order-1">
          
          {/* Date Badge */}
          <div className="mb-2 sm:mb-3 inline-block rounded-full bg-green-100 px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs md:text-sm font-medium text-green-700">
            <p>{date || "\u00A0"}</p>
          </div>

          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-gray-900">
            আজকের বাজারের দাম এক নজরে
          </h1>

          {/* Sub Text */}
          <p className="mt-3 sm:mt-4 max-w-xl mx-auto md:mx-0 text-xs sm:text-sm md:text-base leading-6 sm:leading-7 text-gray-500">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত তথ্য, দ্রুত সর্বশেষ এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          {/* Button */}
          <button
            onClick={handleScrollToProducts}
            className="mt-5 sm:mt-6 w-full sm:w-auto rounded-lg bg-green-600 px-6 sm:px-6 py-3 sm:py-3 text-sm sm:text-sm font-semibold text-white shadow-md transition hover:bg-green-700 cursor-pointer"
          >
            সব পণ্য দেখুন
          </button>
        </div>

        {/* ===== Right Image ===== */}
        <div className="shrink-0 w-full md:w-auto flex justify-center md:justify-end order-1 md:order-2">
          <Image
            src="/bazar-hero.png"
            alt="Bazar Dor"
            width={300}
            height={220}
            priority
            className="object-contain w-auto h-auto max-w-50 sm:max-w-60 md:max-w-65 lg:max-w-75 xl:max-w-85"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;