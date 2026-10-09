import Link from "next/link";

// 🎯 Product Card এর ডেটা টাইপ
export interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "neutral";
    pct: number;
  };
}

interface ProductCardProps {
  product: Product;
  className?: string;      // কাস্টম ক্লাস (অপশনাল)
  showCategory?: boolean;  // ক্যাটাগরি দেখাবে কি না (অপশনাল)
}

const ProductCard = ({
  product,
  className = "",
  showCategory = false
}: ProductCardProps) => {
  const { slug, nameBn, today, unit, image, change, categoryNameBn } = product;

  // ইউনিট বাংলায় কনভার্ট
  const unitBn = unit === "kg" ? "কেজি" : unit === "ltr" ? "লিটার" : unit;

  // পরিবর্তনের দিক
  const isUp = change?.dir === "up";
  const isDown = change?.dir === "down";
  const changePct = change?.pct || 0;

  return (
    <Link
      href={`/product/${slug}`}
      className={`bg-white rounded-2xl p-3 sm:p-4 md:p-5 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md hover:border-green-200 transition-all cursor-pointer w-full ${className}`}
    >
      {/* Card Header - Icon + Name */}
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 md:mb-8">
        <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 shrink-0 bg-gray-50 rounded-full flex items-center justify-center text-lg sm:text-xl md:text-2xl">
          {image || "📦"}
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-sm sm:text-base text-gray-800 leading-tight truncate">
            {nameBn}
          </h3>
          <p className="text-[10px] sm:text-xs text-gray-900 mt-0.5 truncate">
            {showCategory ? categoryNameBn : `ভিত্তি ${unitBn}`}
          </p>
        </div>
      </div>

      {/* Card Body - Price + Change */}
      <div className="flex justify-between items-end mt-auto gap-2">
        <div className="min-w-0">
          <p className="text-[10px] sm:text-xs text-gray-900 mb-1">আজকের দাম</p>
          <div className="flex items-baseline gap-1">
            <span className="text-base sm:text-lg md:text-xl font-bold text-gray-900 truncate">
              {today.toLocaleString("bn-BD")}
            </span>
            <span className="text-[10px] sm:text-xs font-medium text-gray-900">
              টাকা
            </span>
          </div>
        </div>

        {/* Change Indicator */}
        <div className="flex items-center text-[10px] sm:text-xs font-semibold shrink-0">
          {isUp && (
            <div className="flex items-center gap-1 text-red-600 bg-red-50 px-1.5 sm:px-2 py-1 rounded-md">
              <span className="text-[8px] sm:text-[10px]">▲</span>
              <span>{changePct.toLocaleString("bn-BD")}%</span>
            </div>
          )}
          {isDown && (
            <div className="flex items-center gap-1 text-green-600 bg-green-50 px-1.5 sm:px-2 py-1 rounded-md">
              <span className="text-[8px] sm:text-[10px]">▼</span>
              <span>{Math.abs(changePct).toLocaleString("bn-BD")}%</span>
            </div>
          )}
          {!isUp && !isDown && (
            <div className="flex items-center gap-1 text-gray-500 bg-gray-50 px-1.5 sm:px-2 py-1 rounded-md">
              <span className="text-[8px] sm:text-[10px]">—</span>
              <span>০.০%</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;