import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import UpdateForm from "./UpdateForm";

async function UpdateContent() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin?callbackURL=/profile/update&reason=auth-required");
  }

  return (
    <div className="min-h-screen bg-base-200 py-8 sm:py-12 px-3 sm:px-4 font-sans">
      <div className="max-w-2xl mx-auto">

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-base-content text-center">
          প্রোফাইল আপডেট
        </h1>
        <p className="text-xs sm:text-sm text-base-content/60 text-center mt-2 sm:mt-3">
          আপনার নাম পরিবর্তন করুন।
        </p>

        <div className="card w-full bg-base-100 shadow-sm border border-base-300 mt-6 sm:mt-8">
          <div className="card-body p-5 sm:p-7 md:p-8">
            <UpdateForm
              initialName={session.user.name || ""}
              email={session.user.email || ""}
            />
          </div>
        </div>

      </div>
    </div>
  );
}

function UpdateSkeleton() {
  return (
    <div className="min-h-screen bg-base-200 py-8 sm:py-12 px-3 sm:px-4">
      <div className="max-w-2xl mx-auto">
        <div className="h-8 w-48 bg-base-300 rounded animate-pulse mx-auto" />
        <div className="card w-full bg-base-100 border border-base-300 mt-6 sm:mt-8">
          <div className="card-body p-5 sm:p-7">
            <div className="h-12 bg-base-300 rounded animate-pulse" />
            <div className="h-12 bg-base-300 rounded animate-pulse mt-4" />
            <div className="h-12 bg-base-300 rounded animate-pulse mt-4" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function UpdatePage() {
  return (
    <Suspense fallback={<UpdateSkeleton />}>
      <UpdateContent />
    </Suspense>
  );
}