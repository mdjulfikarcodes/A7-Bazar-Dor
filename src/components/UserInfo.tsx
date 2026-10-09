'use client'

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const UserInfo = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user;
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // ✅ dropdown-এর বাইরে click করলে বন্ধ হবে
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // ✅ sign out handler
    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    setOpen(false);
                    router.push("/");
                },
            },
        });
    };

    // ✅ avatar src resolve — null, undefined, empty string সব handle
    const getAvatarSrc = () => {
        const img = user?.image as string | undefined;
        if (img && img.trim() !== "") return img;
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(
            user?.name || "User"
        )}&background=05893e&color=fff`;
    };

    // ❌ login না থাকলে — Sign In / Sign Up button
    if (!user) {
        return (
            <div className="flex items-center gap-2 sm:gap-4 md:gap-6 shrink-0">
                <Link
                    href="/signin"
                    className="cursor-pointer text-xs sm:text-sm md:text-base whitespace-nowrap"
                >
                    সাইন ইন
                </Link>

                <Link
                    href="/signup"
                    className="p-1.5 sm:p-2 rounded-[8px] cursor-pointer bg-[#05893e] hover:bg-[#047032] text-white text-xs sm:text-sm md:text-base whitespace-nowrap"
                >
                    সাইন আপ
                </Link>
            </div>
        );
    }

    // ✅ login থাকলে — avatar + name + dropdown
    return (
        <div className="relative shrink-0" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className="flex items-center gap-2 sm:gap-3 cursor-pointer hover:opacity-90 transition-opacity"
                aria-label="User menu"
                aria-expanded={open}
            >
                {/* Avatar */}
                <div className="avatar">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-xl overflow-hidden bg-gray-100">
                        <img
                            alt={user.name || "User"}
                            src={getAvatarSrc()}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                // ✅ image load fail হলে fallback
                                (e.currentTarget as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                    user.name || "User"
                                )}&background=05893e&color=fff`;
                            }}
                        />
                    </div>
                </div>

                {/* Name */}
                <span className="text-sm sm:text-base font-medium text-gray-800 max-w-[90px] sm:max-w-[140px] truncate">
                    {user.name}
                </span>

                {/* Dropdown arrow */}
                <svg
                    className={`w-3 h-3 sm:w-4 sm:h-4 text-gray-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path d="M5.5 7.5l4.5 4.5 4.5-4.5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            {/* Dropdown menu */}
            {open && (
                <div className="absolute right-0 top-full mt-2 w-44 sm:w-48 bg-white border border-gray-100 rounded-xl shadow-lg py-2 z-50">
                    {/* Profile */}
                    <Link
                        href="/profile"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-800 hover:bg-gray-50 transition-colors"
                    >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                        প্রোফাইল
                    </Link>

                    {/* Sign Out */}
                    <button
                        type="button"
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left cursor-pointer"
                    >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                        সাইন আউট
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserInfo;