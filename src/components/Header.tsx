"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import UserInfo from "./UserInfo";

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
    <header className="w-full border-b border-gray-100 bg-white sticky top-0 z-50 shadow-sm">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-2 sm:gap-4 px-3 sm:px-4 py-3 sm:py-3">

        {/* ===== Logo + Website Name + Date ===== */}
        <Link
          href="/"
          className="flex items-center gap-1.5 sm:gap-2 hover:opacity-90 transition-opacity min-w-0 flex-1"
        >
          <Image
            className="h-9 w-9 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-xl sm:rounded-2xl bg-[#008a3e] p-2 sm:p-2.5 shadow-sm shrink-0"
            height={50}
            width={50}
            src="/logo-icon.png"
            alt="Bazar logo"
            priority
          />

          <div className="min-w-0">
            <h2 className="font-bold text-sm sm:text-lg md:text-[23px] leading-tight truncate">
              বাজার দর
            </h2>
            <p className="text-[9px] sm:text-xs md:text-sm text-gray-600 truncate leading-tight">
              {date || "\u00A0"}
            </p>
          </div>
        </Link>

        {/* ===== User Info ===== */}
        <div className="shrink-0">
          <UserInfo />
        </div>
      </div>
    </header>
  );
};

export default Header;