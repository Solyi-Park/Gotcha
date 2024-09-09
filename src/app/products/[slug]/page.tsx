//상품썸네일(멀티캐러셀), 상품정보
//상품설명(+이미지))
//리뷰
//QNA

import { authOptions } from "@/app/lib/auth";
import ProductHeader from "@/components/ProductHeader";
import ProductInfo from "@/components/ProductInfo";
import ProductQnA from "@/components/ProductQnA";
import ProductReviews from "@/components/ProductReviews";
import { FullProduct } from "@/model/product";
import { getProductById } from "@/services/product";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  if (!params.slug) return;
  const productId = params.slug;
  // console.log("productId", productId);
  const product: FullProduct = await getProductById(productId);
  if (!product) {
    redirect("/");
  }
  const { imageUrls } = product;

  const session = await getServerSession(authOptions);
  if (!session) return;
  const { user } = session;

  // console.log("상품정보", product);
  return (
    <>
      <ProductHeader product={product} user={user} />
      <ProductInfo imageUrls={imageUrls} />
      <ProductReviews />
      <ProductQnA />
    </>
  );
}
