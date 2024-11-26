"use client";
import { useQuery } from "@tanstack/react-query";
import VerticalProductCard from "./VerticalProductCard";
import { FullProduct } from "@/model/product";
import Link from "next/link";
import ProductListGrid from "./ProductListGrid";

type Props = {
  largeCode: string | null;
  mediumCode: string | null;
  smallCode: string | null;
};

export default function FilteredProductList({
  largeCode,
  mediumCode,
  smallCode,
}: Props) {
  const { data: products } = useQuery({
    queryKey: [`products`, { largeCode, mediumCode, smallCode }],
    queryFn: async () => {
      const data = await fetch(
        `/api/products?categoryMediumCode=${mediumCode}&categorySmallCode=${smallCode}`
      ).then((res) => res.json());
      return data;
    },
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  const productList = products && [
    ...products,
    ...products,
    ...products,
    ...products,
  ];
  console.log("products data???", products);
  return <ProductListGrid products={productList} />;
}
