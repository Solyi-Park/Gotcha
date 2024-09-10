import CategoryBar from "./CategoryBar";
import SaleProductList from "./SaleProductList";
import { cache } from "react";
import { getSaleProducts } from "@/services/product";
import { CategoryProviderForSaleProducts } from "@/provider/CategoryProviderForSaleProducts";

const fetchSaleProducts = cache(async () => {
  return await getSaleProducts();
});

export default async function SaleProductSection() {
  const saleProducts = await fetchSaleProducts();

  return (
    <section>
      <h2 className="font-semibold text-2xl text-center italic mt-2 mb-4">
        Sale
      </h2>
      {/* TODO: nav bar 중복 */}
      <CategoryProviderForSaleProducts>
        <CategoryBar layout="horizontal" />
        <SaleProductList saleProducts={saleProducts} />
      </CategoryProviderForSaleProducts>
    </section>
  );
}
