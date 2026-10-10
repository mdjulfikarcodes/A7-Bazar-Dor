import ProductCardSkeleton from "./ProductCardSkeleton";

interface Props {
  count?: number;
}

export default function ProductGridSkeleton({ count = 6 }: Props) {
  return (
    <div className="grid grid-cols-2 gap-1.5 sm:gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}