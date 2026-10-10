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
  const [openForPath, setOpenForPath] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const pathname = usePathname();
  const open = openForPath === pathname;

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

  const closeMenu = () => setOpenForPath(null);

  const isActive = (slug: string) => {
    return pathname === `/category/${slug}`;
  };

  return (
    <div className="w-full border-b border-gray-200 bg-white sticky top-14.25 sm:top-16.25 md:top-18.25 z-40">
      <nav className="mx-auto w-full max-w-7xl px-3 sm:px-4 md:px-6 md:pl-8">
        {/* ===== Top bar ===== */}
        <div className="flex items-center justify-between py-3 sm:py-4 md:block md:py-0 md:pt-4 md:pb-4">

          {/* Hamburger button — Mobile only */}
          <button
            type="button"
            onClick={() => setOpenForPath((prev) => (prev === pathname ? null : pathname))}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="md:hidden inline-flex items-center gap-2 text-sm sm:text-base font-medium text-gray-800 hover:text-green-600 transition-colors cursor-pointer"
          >
            {/* Hamburger icon */}
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

            {/* Chevron — open state এর জন্য */}
            <svg
              className={`w-3.5 h-3.5 transition-transform duration-300 ${
                open ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Active category badge — Mobile এ right side */}
          {!open && pathname?.startsWith("/category/") && (
            <span className="md:hidden text-xs text-green-600 font-medium truncate max-w-30">
              {categories.find((c) => isActive(c.slug))?.nameBn || ""}
            </span>
          )}

          {/* Desktop links */}
          <div className="hidden md:flex items-center justify-start gap-6 md:gap-7 overflow-x-auto whitespace-nowrap scrollbar-hide text-sm sm:text-base">
            {categories.map((category) => {
              const active = isActive(category.slug);

              return (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className={`shrink-0 transition-colors pb-1 border-b-2 ${
                    active
                      ? "text-green-600 font-semibold border-green-600"
                      : "border-transparent hover:text-green-600 hover:border-green-300"
                  }`}
                >
                  {category.icon} {category.nameBn}
                </Link>
              );
            })}
          </div>
        </div>

        {/* ===== Mobile dropdown menu ===== */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            open ? "max-h-125 opacity-100 pb-3" : "max-h-0 opacity-0 pb-0"
          }`}
        >
          <div className="flex flex-col gap-1 bg-white border border-gray-100 rounded-2xl p-2 shadow-sm">

            {/* Loading skeleton */}
            {loading && (
              <div className="flex flex-col gap-1.5 p-1">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-9 bg-gray-100 rounded-lg animate-pulse"
                  />
                ))}
              </div>
            )}

            {/* Error */}
            {error && !loading && (
              <p className="text-xs text-red-500 px-3 py-2 bg-red-50 rounded-lg">
                {error}
              </p>
            )}

            {/* Category links */}
            {!loading &&
              !error &&
              categories.map((category) => {
                const active = isActive(category.slug);

                return (
                  <Link
                    key={category.id}
                    href={`/category/${category.slug}`}
                    onClick={closeMenu}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                      active
                        ? "bg-green-50 text-green-700 font-semibold"
                        : "text-gray-800 hover:bg-green-50 hover:text-green-700 active:bg-green-100"
                    }`}
                  >
                    <span className="text-base">{category.icon}</span>
                    <span>{category.nameBn}</span>
                    {active && (
                      <span className="ml-auto text-green-600 text-xs">✓</span>
                    )}
                  </Link>
                );
              })}

            {/* Empty state */}
            {!loading && !error && categories.length === 0 && (
              <p className="text-xs text-gray-500 px-3 py-2 text-center">
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