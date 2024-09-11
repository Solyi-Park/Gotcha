import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import VerticalProductCard from "./VerticalProductCard";
import { FullProduct } from "@/model/product";
import Link from "next/link";

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
  //데이터 관리 생각해보기. 캐시, staleTime
  const { data: products } = useQuery({
    queryKey: [`products`, { largeCode, mediumCode, smallCode }],
    queryFn: async () => {
      const data = await fetch(
        `/api/products?categoryMediumCode=${mediumCode}&categorySmallCode=${smallCode}`
      ).then((res) => res.json());
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
  console.log("products data???", products);
  return (
    <div className="bg-blue-100 flex w-full">
      <ul className="grid grid-cols-3">
        {products?.map((product: FullProduct) => (
          <li key={product.id}>
            <Link href={`/products/${product.id}`}>
              <VerticalProductCard product={product} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
