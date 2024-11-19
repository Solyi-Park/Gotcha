"use client";
import SectionTitle from "@/components/SectionTitle";
import VerticalProductCard from "@/components/VerticalProductCard";
import { useLikedProductsStore } from "@/store/likedProducts";
import { usePathname } from "next/navigation";

export default function LikePage() {
  const { products } = useLikedProductsStore();

  return (
    <div>
      <SectionTitle title="좋아요" />
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {products.map((product) => (
          <li key={product.id}>
            <VerticalProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
}
