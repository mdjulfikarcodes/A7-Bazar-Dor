import { createAuthClient } from "better-auth/react";
import toast from "react-hot-toast";

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_APP_URL || undefined,

    fetchOptions: {
        onError: async (ctx) => {
            const { response } = ctx;

            // 401 Unauthorized → Session expired
            if (response?.status === 401) {
                // শুধু protected page এ থাকলে redirect
                const currentPath = window.location.pathname;
                const publicPaths = ["/", "/signin", "/signup"];
                const isPublic = publicPaths.some((p) =>
                    currentPath === p || currentPath.startsWith(p + "/")
                );

                // Category/Product page গুলো public — redirect করার দরকার নেই
                const isCategoryOrProduct =
                    currentPath.startsWith("/category/") ||
                    currentPath.startsWith("/product/");

                if (!isPublic && !isCategoryOrProduct) {
                    toast.error("সেশনের মেয়াদ শেষ, আবার সাইন ইন করুন", {
                        icon: "⏰",
                        duration: 4000,
                    });

                    // 500ms delay যাতে toast দেখতে পারে
                    setTimeout(() => {
                        const signinUrl = new URL("/signin", window.location.origin);
                        signinUrl.searchParams.set("callbackURL", currentPath);
                        signinUrl.searchParams.set("reason", "session-expired");
                        window.location.href = signinUrl.toString();
                    }, 500);
                }
            }

            //  429 Too Many Requests
            if (response?.status === 429) {
                toast.error("অনেকবার চেষ্টা করেছেন, কিছুক্ষণ পর আবার চেষ্টা করুন", {
                    icon: "⏱️",
                });
            }

            // 500 Server Error
            if (response?.status === 500) {
                toast.error("সার্ভারে সমস্যা হয়েছে, পরে চেষ্টা করুন", {
                    icon: "⚠️",
                });
            }
        },
    },
});