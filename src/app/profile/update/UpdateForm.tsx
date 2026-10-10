'use client'

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface UpdateFormProps {
  initialName: string;
  email: string;
}

const UpdateForm = ({ initialName, email }: UpdateFormProps) => {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("নাম খালি রাখা যাবে না");
      return;
    }

    if (name.trim().length < 2) {
      toast.error("নাম কমপক্ষে ২ অক্ষর হতে হবে");
      return;
    }

    if (name.trim() === initialName) {
      toast.error("কোনো পরিবর্তন করা হয়নি");
      return;
    }

    const toastId = toast.loading("আপডেট হচ্ছে...");

    try {
      setLoading(true);
      await authClient.updateUser({ name: name.trim() });
      toast.success("নাম সফলভাবে আপডেট হয়েছে", { id: toastId });
      router.push("/profile");
      router.refresh();
    } catch (err) {
      console.log(err);
      toast.error("আপডেট ব্যর্থ হয়েছে", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">

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
          required
          className="input input-bordered w-full bg-base-200/40 focus:input-primary"
        />
      </div>

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text text-sm font-medium text-base-content">
            ইমেইল
          </span>
        </label>
        <input
          type="email"
          value={email}
          disabled
          readOnly
          className="input input-bordered w-full bg-base-200/40 opacity-60 cursor-not-allowed"
        />
        <label className="label">
          <span className="label-text-alt text-xs text-base-content/60">
            ইমেইল পরিবর্তন করা যাবে না
          </span>
        </label>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          type="button"
          onClick={() => router.push("/profile")}
          disabled={loading}
          className="btn btn-outline flex-1 order-2 sm:order-1"
        >
          বাতিল
        </button>

        <button
          type="submit"
          disabled={loading}
          className="btn bg-[#05893e] hover:bg-[#047032] border-none flex-1 order-1 sm:order-2 text-white font-semibold disabled:opacity-60"
        >
          {loading ? "আপডেট হচ্ছে..." : "আপডেট করুন"}
        </button>
      </div>

    </form>
  );
};

export default UpdateForm;