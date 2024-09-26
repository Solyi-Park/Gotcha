import Image from "next/image";
import HeartIcon from "./icons/HeartIcon";
import { FullProduct, SimpleProduct } from "@/model/product";
import LikeButton from "./LikeButton";

type Props = {
  product: SimpleProduct;
};
export default function SimpleProductCard({ product }: Props) {
  // 컴포넌트명 변경하기 - 카드 유형에 따라
  console.log("simple card product", product);
  return (
    <>
      {product && (
        <div className="relative h-60 w-full">
          <Image
            src={product.thumbnailUrls![0]}
            alt={product.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end p-4 text-white">
            <p className="font-semibold text-xl">{product.name}</p>
            <p className="text-sm">{product.description}</p>
            <p className="font-bold text-lg">
              {product.discountRate && <span>{product.discountRate}% </span>}
              {product.price.toLocaleString()}
            </p>
          </div>
          {/* TODO: ProductCard 좋아요 버튼 중복코드 추출하기 */}
          <div className="absolute flex flex-col justify-end right-0 bottom-0 p-5 gap-1 text-white">
            <LikeButton product={product} />
            <span className="text-center text-xs">{60}</span>
          </div>
        </div>
      )}
    </>
  );
}
