import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fcfcfc] p-4 text-center">
      <h1 className="text-6xl font-bold text-gray-800">৪০৪</h1>
      <p className="text-lg text-gray-500 mt-4">
        দুঃখিত, পেজটি খুঁজে পাওয়া যায়নি।
      </p>
      <Link
        href="/"
        className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
      >
        🏠 হোমে ফিরে যান
      </Link>
    </div>
  );
}