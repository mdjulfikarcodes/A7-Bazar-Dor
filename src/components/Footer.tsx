const Footer = () => {
  return (
    <footer className="w-full mt-10">
      <div className="w-full bg-linear-to-b from-[#fafcfa] to-[#fafcfa] border-t
      border-[#b6b5b5]">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 px-3 sm:px-6 md:px-8 py-4 sm:py-5 text-xs sm:text-sm text-gray-800">
          {/* Left - Brand tagline */}
          <p className="text-center sm:text-left">
            বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </p>

          {/* Right - Disclaimer */}
          <p className="text-center sm:text-right text-gray-700">
            সকল দাম স্মাতব্য; বাজার অবস্থার উপর নির্ভর করে পরিবর্তিত হয়।
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;