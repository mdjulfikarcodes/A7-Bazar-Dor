import AllProducts from "@/components/AllProducts";
import Banner from "@/components/Banner";
import Marquee from "@/components/Marquee";
import PriceDown from "@/components/PriceDown";
import PriceUp from "@/components/PriceUp";
import ProductCard from "@/components/ProductCard";
import { Suspense } from "react";


export default function Home() {
  return (
    <div>
      <Banner/>
      <PriceUp/>
      <PriceDown/>
              <Suspense fallback={null}>
      <AllProducts/>
      
              </Suspense>

    </div>
  );
}
