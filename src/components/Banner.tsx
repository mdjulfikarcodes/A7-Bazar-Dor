"use client"
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
  return (
    <section className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 mt-3">
      <div className="mx-auto flex min-h-[255px] max-w-[1440px] items-center justify-between overflow-hidden rounded-3xl border border-gray-200 bg-white px-8 py-8 shadow-sm md:px-12">
        
        {/* Left Content */}
        <div className="max-w-2xl">
          {/* Date */}
          <div className="mb-3 inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
            <p>{date}</p>
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-bold leading-tight text-gray-900 md:text-4xl lg:text-5xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          {/* Description */}
          <p className="mt-4 max-w-xl text-sm leading-7 text-gray-500 md:text-base">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত তথ্য, দ্রুত সর্বশেষ এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          {/* Button */}
          <button className="mt-6 rounded-lg bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-green-700 cursor-pointer">
            সব পণ্য দেখুন
          </button>
        </div>

        {/* Right Image */}
        <div className="hidden md:block">
          <Image
            src="/bazar-hero.png"
            alt="Bazar Dor"
            width={300}
            height={220}
            priority
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;