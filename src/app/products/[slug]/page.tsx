"use client";
import LoadingSpinner from "@/components/LoadingSpinner";
import ProductDetailHeader from "@/components/ProductDetailHeader";
import ProductInfo from "@/components/ProductInfo";
import ProductQnA from "@/components/ProductQnA";
import ProductReviews from "@/components/ProductReviews";
import { FullProduct } from "@/model/product";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

async function FetchProductById(productId: string): Promise<FullProduct> {
  //TODO: api 요청 경로 변경 - query string 사용
  return await fetch(`/api/products/${productId}`, {
    method: "GET",
  }).then((res) => res.json());
}

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  if (!params.slug) return;
  const productId = params.slug;

  const {
    data: product,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: async () => await FetchProductById(productId),
    staleTime: 1000 * 60 * 15,
  });

  return (
    <section className="">
      {isLoading && (
        <div className="flex justify-center my-10">
          <LoadingSpinner />
        </div>
      )}
      {product && (
        <div className="flex flex-col items-center">
          <ProductDetailHeader product={product} />
          <ProductInfo imageUrls={product.imageUrls} />
          <ProductReviews />
          <ProductQnA />
        </div>
      )}
    </section>
  );
}
