"use client";

import VerticalProductCard from "@/components/VerticalProductCard";
import { useLikedProductsStore } from "@/store/likedProducts";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function LikePage() {
  // TODO: /maypage 일때도 likePage가 가장 먼저 보이게
  const { data: session } = useSession();
  const user = session?.user;

  const { products } = useLikedProductsStore();
  const pathName = usePathname();
  console.log("path", pathName);

  return (
    <div className="p-5">
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <li key={product.id}>
            <VerticalProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
}
