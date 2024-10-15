"use client";
import Link from "next/link";
import HorizontalProductCard from "./HorizontalProductCard";
import SimpleProductCard from "./SimpleProductCard";
import { SimpleProduct } from "@/model/product";
import { useQuery } from "@tanstack/react-query";

async function fetchNewProducts() {
  const data = await fetch("/api/products", {
    method: "GET",
  }).then((res) => res.json());
  return data as SimpleProduct[]; // TODO: 상품의 타입
}

export default function NewProductList() {
  const {
    data: products,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["newProducts"],
    queryFn: async () => await fetchNewProducts(),
    staleTime: 1000 * 60 * 15,
  });

  return (
    <ul className="flex flex-col gap-1">
      {products?.map((product, index) => (
        <li
          key={product.name}
          className="border-b last:border-0 first:border-r"
        >
          <Link href={`/products/${product.id}`}>
            {index % 3 === 0 ? (
              <SimpleProductCard product={product} />
            ) : (
              <HorizontalProductCard product={product} />
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}
