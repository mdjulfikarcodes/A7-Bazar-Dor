"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Header = () => {
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
    <div className="w-full border-b border-gray-100 pb-0 sm:pb-2">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-2 sm:gap-4 px-3 sm:px-4 mt-2 sm:mt-3  ">
      {/* Logo + Website Name + Date - ক্লিক করলে হোম পেজে যাবে */}
      <Link
        href="/"
        className="flex items-center gap-1.5 sm:gap-2 cursor-pointer hover:opacity-90 transition-opacity min-w-0"
      >
        <Image
          className="flex h-9 w-9 sm:h-10 sm:w-10 md:h-12 md:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-[#008a3e] p-2 sm:p-2.5 shadow-sm shrink-0"
          height={50}
          width={50}
          src="/logo-icon.png"
          alt="Bazar logo"
        />

        <div className="min-w-0">
          <h2 className="font-bold text-base sm:text-lg md:text-[23px] leading-tight truncate">
            বাজার দর
          </h2>
          <p className="text-[10px] sm:text-xs md:text-sm text-gray-600 truncate">
            {date}
          </p>
        </div>
      </Link>

      {/* Sign In + Sign Up */}
      <div className="flex items-center gap-2 sm:gap-4 md:gap-6 shrink-0">
        <button className="cursor-pointer text-xs sm:text-sm md:text-base whitespace-nowrap">
          সাইন ইন
        </button>

        <button className="p-1.5 sm:p-2 rounded-[8px] cursor-pointer shadow-base-100 bg-[#05893e] text-white text-xs sm:text-sm md:text-base whitespace-nowrap">
          সাইন আপ
        </button>
      </div>

    </div>
    </div>
  );
};

export default Header;