// import { authOptions } from "@/app/lib/auth";
// import ProductHeader from "@/components/ProductHeader";
// import ProductInfo from "@/components/ProductInfo";
// import ProductQnA from "@/components/ProductQnA";
// import ProductReviews from "@/components/ProductReviews";
// import { FullProduct } from "@/model/product";
// import { getProductById } from "@/services/product";
// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";

// export default async function ProductDetailPage({
//   params,
// }: {
//   params: { slug: string };
// }) {
//   if (!params.slug) return;
//   const productId = params.slug;

//   const product: FullProduct = await getProductById(productId);
//   if (!product) {
//     redirect("/");
//   }
//   const { imageUrls } = product;

//   return (
//     <>
//       <ProductHeader product={product} />
//       <ProductInfo imageUrls={imageUrls} />
//       <ProductReviews />
//       <ProductQnA />
//     </>
//   );
// }

"use client";
import ProductHeader from "@/components/ProductHeader";
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

  if (isLoading) {
    return <p>로딩중..</p>;
  }
  if (!product) {
    redirect("/");
  }
  const { imageUrls } = product;

  return (
    <>
      <ProductHeader product={product && product} />
      <ProductInfo imageUrls={imageUrls} />
      <ProductReviews />
      <ProductQnA />
    </>
  );
}
