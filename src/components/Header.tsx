"use client";

import Image from "next/image";
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
    <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 mt-3">
      {/* Logo + Website Name + Date */}
      <div className="flex items-center gap-2">
        <Image
          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#008a3e] p-2.5 shadow-sm"
          height={50}
          width={50}
          src="/logo-icon.png"
          alt="Bazar logo"
        />

        <div>
          <h2 className="font-bold text-[23px]">বাজার দর</h2>
          <p>{date}</p>
        </div>
      </div>

      {/* Sign In + Sign Up */}
      <div className="flex gap-6">
        <button className="cursor-pointer">
          সাইন ইন
        </button>

        <button className="p-2 rounded-[8px] cursor-pointer shadow-base-100 bg-[#05893e] text-white">
          সাইন আপ
        </button>
      </div>
    </div>
  );
};

export default Header;