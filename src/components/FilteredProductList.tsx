"use client";
import { useQuery } from "@tanstack/react-query";
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
  return (
    <div className="flex w-full">
      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 w-full gap-4 ml-10">
        {productList?.map((product: FullProduct) => (
          <li key={product.id}>
            <Link href={`/products/${product.id}`}>
              <VerticalProductCard product={product} likeCount />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
