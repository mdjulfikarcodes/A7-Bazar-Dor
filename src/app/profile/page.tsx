'use client'

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProfilePage = () => {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;
    const router = useRouter();

    const [name, setName] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const currentName = name ?? user?.name ?? "";

    // ✅ sign out handler
    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => router.push("/"),
            },
        });
    };

    // ✅ নাম update handler
    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!currentName.trim()) {
            alert("নাম খালি রাখা যাবে না");
            return;
        }

        try {
            setLoading(true);
            await authClient.updateUser({
                name: currentName.trim(),
            });
            alert("নাম সফলভাবে আপডেট হয়েছে ✅");
        } catch (err) {
            console.log(err);
            alert("আপডেট ব্যর্থ হয়েছে");
        } finally {
            setLoading(false);
        }
    };

    // ⏳ session load হচ্ছে
    if (isPending) {
        return (
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-[#05893e]" />
            </div>
        );
    }

    // ❌ login করা নেই
    if (!user) {
        return (
            <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center gap-4 px-4">
                <p className="text-base-content/70 text-center">
                    প্রোফাইল দেখতে সাইন ইন করুন।
                </p>
                <button
                    onClick={() => router.push("/signin")}
                    className="btn bg-[#05893e] hover:bg-[#047032] border-none text-white font-semibold"
                >
                    সাইন ইন করুন
                </button>
            </div>
        );
    }

    // ✅ avatar src
    const avatarSrc =
        (user.image as string) ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
            user.name || "User"
        )}&background=05893e&color=fff`;

    return (
        <div className="min-h-screen bg-base-200 py-8 sm:py-12 px-3 sm:px-4 font-sans">
            <div className="max-w-2xl mx-auto">

                {/* Heading */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-base-content text-center">
                    আমার প্রোফাইল
                </h1>
                <p className="text-xs sm:text-sm text-base-content/60 text-center mt-2 sm:mt-3">
                    আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
                </p>

                {/* Profile Card */}
                <div className="card w-full bg-base-100 shadow-sm border border-base-300 mt-6 sm:mt-8">
                    <div className="card-body p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                            {/* Avatar + Info */}
                            <div className="flex items-center gap-3 sm:gap-4">
                                <div className="avatar">
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden bg-gray-100">
                                        <img
                                            src={avatarSrc}
                                            alt={user.name || "User"}
                                            width={56}
                                            height={56}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                (e.currentTarget as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                                    user.name || "User"
                                                )}&background=05893e&color=fff`;
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="min-w-0">
                                    <p className="font-semibold text-base sm:text-lg text-gray-800 truncate">
                                        {user.name}
                                    </p>
                                    <p className="text-xs sm:text-sm text-gray-500 truncate">
                                        {user.email}
                                    </p>
                                </div>
                            </div>

                            {/* Sign Out */}
                            <button
                                type="button"
                                onClick={handleSignOut}
                                className="btn btn-outline border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 gap-2 self-start sm:self-auto"
                            >
                                <svg
                                    className="w-4 h-4"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                    <polyline points="16 17 21 12 16 7" />
                                    <line x1="21" y1="12" x2="9" y2="12" />
                                </svg>
                                সাইন আউট
                            </button>
                        </div>
                    </div>
                </div>

                {/* Update Card */}
                <div className="card w-full bg-base-100 shadow-sm border border-base-300 mt-5 sm:mt-6">
                    <div className="card-body p-5 sm:p-7">
                        <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4">
                            তথ্য
                        </h2>

                        <form onSubmit={handleUpdate} className="space-y-4">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text text-sm font-medium text-base-content">
                                        নাম
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    value={currentName}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="আপনার নাম লিখুন"
                                    className="input input-bordered w-full bg-base-200/40 focus:input-primary"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="btn bg-[#05893e] hover:bg-[#047032] border-none w-full text-white font-semibold disabled:opacity-60"
                            >
                                {loading ? "আপডেট হচ্ছে..." : "আপডেট"}
                            </button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProfilePage;