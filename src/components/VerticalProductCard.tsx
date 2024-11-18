import Image from "next/image";
import { getDiscountedPrice } from "@/utils/calculate";
import { SimpleProduct } from "@/model/product";
import LikeButton from "./buttons/LikeButton";

type Props = {
  product: SimpleProduct;
};

export default function VerticalProductCard({ product }: Props) {
  return (
    <div className="flex flex-col my-2">
      <div className="relative aspect-square">
        <Image
          src={product.thumbnailUrls![0]}
          alt={product.name}
          fill
          className="object-cover relative"
        />
        <div className="absolute right-2 bottom-2 text-white">
          <LikeButton product={product} />
        </div>
      </div>
      <div className="flex w-full px-2">
        <div className="flex flex-col justify-center w-full">
          <p className="font-semibold text-sm">{product.name}</p>
          <p className="flex items-center font-semibold text-xs sm:text-sm">
            {product.discountRate && (
              <>
                <span className="mr-2 text-rose-500">
                  {product.discountRate}%
                </span>
                <span className=" text-gray-400  text-[10px] sm:text-xs font-normal line-through mr-2">
                  {product.price.toLocaleString()}원
                </span>
              </>
            )}
            <span>
              {product.discountRate
                ? getDiscountedPrice(
                    product.price,
                    product.discountRate
                  ).toLocaleString()
                : product.price.toLocaleString()}
              원
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
