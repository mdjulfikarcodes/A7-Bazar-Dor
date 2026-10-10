'use client'

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface ProfileClientProps {
  user: {
    id: string;
    name: string;
    email: string;
    image?: string | null;
    emailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
}

const ProfileClient = ({ user }: ProfileClientProps) => {
  const router = useRouter();
  const [name, setName] = useState<string>(user.name ?? "");
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    const toastId = toast.loading("সাইন আউট হচ্ছে...");
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সফলভাবে সাইন আউট হয়েছেন", { id: toastId });
          router.push("/");
        },
        onError: () => {
          toast.error("সাইন আউট ব্যর্থ হয়েছে", { id: toastId });
        },
      },
    });
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("নাম খালি রাখা যাবে না");
      return;
    }

    const toastId = toast.loading("আপডেট হচ্ছে...");
    try {
      setLoading(true);
      await authClient.updateUser({ name: name.trim() });
      toast.success("নাম সফলভাবে আপডেট হয়েছে", { id: toastId });
      router.refresh();
    } catch (err) {
      console.log(err);
      toast.error("আপডেট ব্যর্থ হয়েছে", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const avatarSrc =
    user.image ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      user.name || "User"
    )}&background=05893e&color=fff`;

  return (
    <div className="min-h-screen bg-base-200 py-8 sm:py-12 px-3 sm:px-4 font-sans">
      <div className="max-w-2xl mx-auto">

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-base-content text-center">
          আমার প্রোফাইল
        </h1>
        <p className="text-xs sm:text-sm text-base-content/60 text-center mt-2 sm:mt-3">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>

        <div className="card w-full bg-base-100 shadow-sm border border-base-300 mt-6 sm:mt-8">
          <div className="card-body p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

              <div className="flex items-center gap-3 sm:gap-4">
                <div className="avatar">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden bg-gray-100">
                    <Image
                      src={avatarSrc}
                      alt={user.name || "User"}
                      width={56}
                      height={56}
                      unoptimized
                      className="w-full h-full object-cover"
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
                  value={name}
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

export default ProfileClient;