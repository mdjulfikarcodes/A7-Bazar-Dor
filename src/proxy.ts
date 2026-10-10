import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ✅ ১. যে রুটগুলো লগইন ছাড়া দেখা যাবে না
  const isProductRoute = pathname.startsWith("/product/");
  const isProfileRoute = pathname.startsWith("/profile");

  // ✅ ২. যদি কোনো সুরক্ষিত রুটে ইউজার ঢুকতে চায়
  if (isProductRoute || isProfileRoute) {
    const sessionCookie = getSessionCookie(request);

    // সেশন কুকি না থাকলে সাইন-ইন পেজে পাঠিয়ে দাও
    if (!sessionCookie) {
      const signInUrl = new URL("/signin", request.url);
      // লগইন করার পর যাতে আবার আগের পেজে ফিরে আসে
      signInUrl.searchParams.set("callbackURL", pathname);
      return NextResponse.redirect(signInUrl);
    }
  }

  // ✅ ৩. সব ঠিক থাকলে রিকোয়েস্ট এগিয়ে যেতে দাও
  return NextResponse.next();
}

// ✅ ৪. শুধু এই রুটগুলোতেই Proxy চলবে
export const config = {
  matcher: [
    "/product/:path*",  // /product/যেকোনো-কিছু
    "/profile",         // নিজের প্রোফাইল
    "/profile/update",  // প্রোফাইল আপডেট
  ],
};