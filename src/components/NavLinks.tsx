"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Category = {
  id: number;
  slug: string;
  icon: string;
  nameBn: string;
};

const NavLinks = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const pathname = usePathname(); // ✅ current path

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          "https://api.abcz.workers.dev/api/bazardor/categories",
          {
            headers: { Accept: "application/json" },
            cache: "no-store",
          }
        );

        if (!res.ok) {
          throw new Error(`Categories API Error: ${res.status}`);
        }

        const text = await res.text();

        let data: Category[];

        try {
          data = JSON.parse(text);
        } catch {
          console.error("Categories API Response:", text);
          throw new Error("Categories API থেকে valid JSON পাওয়া যায়নি।");
        }

        setCategories(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Categories load করা যায়নি");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // mobile menu বন্ধ করার function
  const closeMenu = () => setOpen(false);

  // ✅ active link check করার helper
  const isActive = (slug: string) => {
    return pathname === `/category/${slug}`;
  };

  return (
    // ✅ Full-width wrapper — border পুরো width জুড়ে থাকবে
    <div className="w-full border-b border-gray-200 pb-3 sm:pb-4">
      <nav className="mx-auto mt-4 sm:mt-5 w-full max-w-7xl px-3 sm:px-4 md:px-6 md:pl-8">
        {/* Top bar — Mobile: Hamburger + label | Desktop: full links */}
        <div className="flex items-center justify-between md:block">
          {/* Hamburger button — শুধু mobile/tablet-এ দেখাবে */}
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="md:hidden inline-flex items-center gap-2 text-sm sm:text-base font-medium text-gray-800 hover:text-green-600 transition-colors cursor-pointer"
          >
            {/* Hamburger icon (open হলে X হয়ে যাবে) */}
            <span className="relative inline-block w-5 h-4">
              <span
                className={`absolute left-0 top-0 h-0.5 w-5 bg-current rounded transition-all duration-300 ${
                  open ? "translate-y-1.75 rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-1.75 h-0.5 w-5 bg-current rounded transition-all duration-300 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 top-3.5 h-0.5 w-5 bg-current rounded transition-all duration-300 ${
                  open ? "-translate-y-1.75 -rotate-45" : ""
                }`}
              />
            </span>
            <span>ক্যাটাগরি</span>
          </button>

          {/* Desktop links — md+ এ horizontal nav */}
          <div className="hidden md:flex items-center justify-start gap-6 md:gap-7 overflow-x-auto whitespace-nowrap scrollbar-hide text-sm sm:text-base">
            {categories.map((category) => {
              const active = isActive(category.slug);

              return (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className={`shrink-0 transition-colors ${
                    active
                      ? "text-green-600 font-semibold border-b-2 border-green-600 pb-1"
                      : "hover:text-green-600"
                  }`}
                >
                  {category.icon} {category.nameBn}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Mobile dropdown menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            open ? "max-h-125 opacity-100 mt-3" : "max-h-0 opacity-0 mt-0"
          }`}
        >
          <div className="flex flex-col gap-2 bg-white border border-gray-100 rounded-2xl p-3 shadow-sm">
            {loading && (
              <p className="text-xs text-gray-500 px-2 py-1">লোড হচ্ছে...</p>
            )}

            {error && !loading && (
              <p className="text-xs text-red-500 px-2 py-1">{error}</p>
            )}

            {!loading &&
              !error &&
              categories.map((category) => {
                const active = isActive(category.slug);

                return (
                  <Link
                    key={category.id}
                    href={`/category/${category.slug}`}
                    onClick={closeMenu}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                      active
                        ? "bg-green-50 text-green-700 font-semibold"
                        : "text-gray-800 hover:bg-green-50 hover:text-green-700"
                    }`}
                  >
                    <span>{category.icon}</span>
                    <span>{category.nameBn}</span>
                  </Link>
                );
              })}

            {!loading && !error && categories.length === 0 && (
              <p className="text-xs text-gray-500 px-2 py-1">
                কোনো ক্যাটাগরি পাওয়া যায়নি।
              </p>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavLinks;