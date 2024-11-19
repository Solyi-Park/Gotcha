"use client";
import VerticalProductCard from "@/components/VerticalProductCard";
import { useLikedProductsStore } from "@/store/likedProducts";
import { usePathname } from "next/navigation";

export default function LikePage() {
  const { products } = useLikedProductsStore();

  return (
    <div>
      <h3 className="border-b-4 border-black pb-8 text-lg font-semibold">
        좋아요
      </h3>
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
