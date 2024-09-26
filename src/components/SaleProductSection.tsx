"use client";
import SaleProductList from "./SaleProductList";
import { CategoryProviderForSaleProducts } from "@/provider/CategoryProviderForSaleProducts";
import SaleCategoryBar from "./SaleCategoryBar";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { SaleProductsResponse } from "@/services/product";

// const fetchSaleProducts = cache(async () => {
//   return await getSaleProducts();
// });

async function fetchSaleProducts() {
  return await fetch("/api/products/sale", {
    method: "GET",
  }).then((res) => res.json());
}
export default function SaleProductSection() {
  // const saleProducts = await fetchSaleProducts();

  const {
    data: saleProducts,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["saleProducts"],
    queryFn: async () => await fetchSaleProducts(),
    staleTime: 1000 * 60 * 15,
  });

  return (
    <section>
      <h2 className="font-semibold text-2xl text-center italic mt-2 mb-4">
        Sale
      </h2>
      {/* TODO: nav bar 중복 */}
      <CategoryProviderForSaleProducts>
        <SaleCategoryBar />
        <SaleProductList products={saleProducts && saleProducts} />
      </CategoryProviderForSaleProducts>
    </section>
  );
}
