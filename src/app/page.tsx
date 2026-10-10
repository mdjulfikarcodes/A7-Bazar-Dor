import AllProducts from "@/components/AllProducts";
import Banner from "@/components/Banner";

import PriceDown from "@/components/PriceDown";
import PriceUp from "@/components/PriceUp";

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
