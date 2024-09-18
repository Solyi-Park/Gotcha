"use client";
import { SaleProductsResponse } from "@/services/product";
import Link from "next/link";
import VerticalProductCard from "./VerticalProductCard";
import { useSaleCategory } from "@/provider/CategoryProviderForSaleProducts";

type Props = {
  products: SaleProductsResponse[];
};

export default function SaleProductList({ products }: Props) {
  const { activeTab: activeTab } = useSaleCategory();

  const selectedList = products?.filter((list) =>
    activeTab === "all" ? list : list.name === activeTab
  );

  return (
    <ul className="grid grid-cols-2 lg:grid-cols-3 sm:gap-y-2">
      {selectedList?.length === 1
        ? selectedList[0]?.products.map((product) => (
            <li key={product.name}>
              <Link href={`/products/${product.id}`}>
                <VerticalProductCard product={product} />
              </Link>
            </li>
          ))
        : selectedList?.map((list) =>
            list.products.map((product) => (
              <li key={`all-${product.name}`}>
                <Link href={`/products/${product.id}`}>
                  <VerticalProductCard product={product} />
                </Link>
              </li>
            ))
          )}
    </ul>
  );
}
