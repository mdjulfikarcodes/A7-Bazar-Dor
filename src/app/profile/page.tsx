import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ProfileClient from "./ProfileClient";

async function ProfileContent() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin?callbackURL=/profile&reason=auth-required");
  }

  return <ProfileClient user={session.user} />;
}

function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-base-200 py-8 sm:py-12 px-3 sm:px-4 font-sans">
      <div className="max-w-2xl mx-auto">

        <div className="h-8 w-48 bg-base-300 rounded animate-pulse mx-auto" />
        <div className="h-4 w-64 bg-base-300 rounded animate-pulse mx-auto mt-3" />

        <div className="card w-full bg-base-100 shadow-sm border border-base-300 mt-6 sm:mt-8">
          <div className="card-body p-4 sm:p-6">
            <div className="flex items-center gap-3 sm:gap-4 animate-pulse">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-base-300" />
              <div className="space-y-2 flex-1">
                <div className="h-4 w-32 bg-base-300 rounded" />
                <div className="h-3 w-48 bg-base-300 rounded" />
              </div>
            </div>
          </div>
        </div>

        <div className="card w-full bg-base-100 shadow-sm border border-base-300 mt-5 sm:mt-6">
          <div className="card-body p-5 sm:p-7">
            <div className="h-5 w-20 bg-base-300 rounded animate-pulse mb-4" />
            <div className="h-12 bg-base-300 rounded animate-pulse" />
            <div className="h-12 bg-base-300 rounded animate-pulse mt-4" />
          </div>
        </div>

      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <ProfileContent />
    </Suspense>
  );
}