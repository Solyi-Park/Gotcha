"use client";
import SectionTitle from "@/components/SectionTitle";
import VerticalProductCard from "@/components/VerticalProductCard";
import { useLikedProductsStore } from "@/store/likedProducts";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LikePage() {
  const router = useRouter();
  const { products } = useLikedProductsStore();

  return (
    <div>
      <SectionTitle title="좋아요" />
      {products.length > 0 ? (
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {products.map((product) => (
            <li key={product.id}>
              <Link href={`/products/${product.id}`}>
                <VerticalProductCard product={product} />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center my-10">
          <p className="text-lg font-semibold">좋아요 목록이 비어있네요.</p>
          <p className="text-sm text-gray-500">
            관심 가는 아이템을 발견하면 하트를 눌러 저장해보세요!
          </p>
          <button
            className="mt-4 px-6 py-2 bg-black text-white rounded-md hover:bg-gray-700"
            onClick={() => router.push("/")}
          >
            상품 보러 가기
          </button>
        </div>
      )}
    </div>
  );
}
