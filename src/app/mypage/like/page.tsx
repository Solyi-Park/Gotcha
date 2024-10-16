"use client";

import VerticalProductCard from "@/components/VerticalProductCard";
import { useLikedProductsStore } from "@/store/likedProducts";
import { usePathname } from "next/navigation";

export default function LikePage() {
  // TODO: /maypage 일때도 likePage가 가장 먼저 보이게

  const { products } = useLikedProductsStore();
  const pathName = usePathname();
  console.log("path", pathName);

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <VerticalProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
