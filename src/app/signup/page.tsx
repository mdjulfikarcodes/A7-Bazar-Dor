'use client'
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

const SignUpPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());

        // ✅ validation toasts
        if (user.password !== user.confirmPassword) {
            toast.error("পাসওয়ার্ড দুইটা মিলছে না");
            return;
        }
        if (String(user.password).length < 8) {
            toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষর হতে হবে");
            return;
        }

        const toastId = toast.loading("অ্যাকাউন্ট তৈরি হচ্ছে...");
        setLoading(true);

        try {
            const { data, error } = await authClient.signUp.email({
                name: String(user.name),
                email: String(user.email),
                password: String(user.password),
                callbackURL: "/",
            });

            if (error) {
                console.log("Signup error:", error);

                // ✅ বাংলা message
                let banglaMessage = "সাইন আপ ব্যর্থ হয়েছে";

                if (error.status === 422 || error.message?.toLowerCase().includes("already")) {
                    banglaMessage = "এই ইমেইল দিয়ে অ্যাকাউন্ট আগেই আছে";
                } else if (error.status === 400) {
                    banglaMessage = "তথ্য সঠিকভাবে দিন";
                } else if (error.status === 429) {
                    banglaMessage = "অনেকবার চেষ্টা করেছেন, কিছুক্ষণ পর আবার চেষ্টা করুন";
                } else if (error.status === 500) {
                    banglaMessage = "সার্ভারে সমস্যা হয়েছে, পরে চেষ্টা করুন";
                }

                toast.error(banglaMessage, { id: toastId });
                return;
            }

            if (data) {
                console.log("Signup success:", data);
                toast.success("অ্যাকাউন্ট তৈরি হয়েছে!", { id: toastId });
                router.push("/");
            }
        } catch (err) {
            console.log("Catch error:", err);
            toast.error("কিছু একটা ভুল হয়েছে", { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    // ✅ Google Sign In with toast
    const handleGoogleSignIn = async () => {
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            });
        } catch (err) {
            console.log(err);
            toast.error("Google দিয়ে সাইন ইন ব্যর্থ হয়েছে");
        }
    };

    // ✅ GitHub Sign In with toast
    const handleGithubSignIn = async () => {
        try {
            await authClient.signIn.social({
                provider: "github",
                callbackURL: "/",
            });
        } catch (err) {
            console.log(err);
            toast.error("GitHub দিয়ে সাইন ইন ব্যর্থ হয়েছে");
        }
    };

    return (
        <div className="min-h-screen bg-base-200 flex flex-col items-center px-3 sm:px-4 py-8 sm:py-12 font-sans">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-base-content text-center">
                অ্যাকাউন্ট তৈরি করুন
            </h1>
            <p className="text-xs sm:text-sm text-base-content/60 text-center mt-2 sm:mt-3">
                বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
            </p>

            <div className="card w-full max-w-md bg-base-100 shadow-sm border border-base-300 mt-6 sm:mt-8">
                <div className="card-body p-5 sm:p-7 md:p-8">
                    <form onSubmit={onSubmit} className="space-y-4 sm:space-y-5">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-sm font-medium text-base-content">নাম</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                required
                                placeholder="আপনার নাম লিখুন"
                                className="input input-bordered w-full bg-base-200/40 focus:input-primary"
                            />
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-sm font-medium text-base-content">ইমেইল</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                required
                                placeholder="আপনার ইমেল লিখুন"
                                className="input input-bordered w-full bg-base-200/40 focus:input-primary"
                            />
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-sm font-medium text-base-content">পাসওয়ার্ড</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                required
                                placeholder="কমপক্ষে ৮ অক্ষর"
                                className="input input-bordered w-full bg-base-200/40 focus:input-primary"
                            />
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-sm font-medium text-base-content">পাসওয়ার্ড নিশ্চিত করুন</span>
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                required
                                placeholder="আবার লিখুন"
                                className="input input-bordered w-full bg-base-200/40 focus:input-primary"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn bg-[#05893e] hover:bg-[#047032] border-none w-full text-white font-semibold disabled:opacity-60"
                        >
                            {loading ? "অপেক্ষা করুন..." : "অ্যাকাউন্ট তৈরি করুন"}
                        </button>
                    </form>

                    {/* ✅ অথবা Divider */}
                    <div className="flex items-center gap-3 my-1">
                        <div className="flex-1 h-px bg-base-300" />
                        <span className="text-xs text-base-content/60">অথবা</span>
                        <div className="flex-1 h-px bg-base-300" />
                    </div>

                    {/* ✅ Social buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            type="button"
                            onClick={handleGoogleSignIn}
                            className="btn btn-outline flex-1"
                        >
                            {/* Google icon */}
                            <svg className="w-4 h-4" viewBox="0 0 48 48">
                                <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
                                <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
                                <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
                                <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
                            </svg>
                            Google
                        </button>

                        <button
                            type="button"
                            onClick={handleGithubSignIn}
                            className="btn btn-outline flex-1"
                        >
                            {/* GitHub icon */}
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.69-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.93 10.93 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.13 0 1.54-.01 2.78-.01 3.16 0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
                            </svg>
                            GitHub
                        </button>
                    </div>

                    <p className="text-center text-sm text-base-content/70 mt-5 sm:mt-6">
                        অ্যাকাউন্ট আছে?{" "}
                        <Link
                            href="/signin"
                            className="link text-[#05893e] font-semibold no-underline hover:underline"
                        >
                            সাইন ইন করুন
                        </Link>
                    </p>
                </div>
            </div>

            <Link
                href="/"
                className="text-xs sm:text-sm text-base-content/60 hover:text-base-content mt-6 sm:mt-8 transition-colors"
            >
                ← হোম পেজে ফিরে যান
            </Link>
        </div>
    );
};

export default SignUpPage;