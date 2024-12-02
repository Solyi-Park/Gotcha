import Image from "next/image";
import { SimpleProduct } from "@/model/product";
import LikeButton from "./buttons/LikeButton";
import { useQuery } from "@tanstack/react-query";
import { getDiscountedPrice } from "@/utils/calculate";

type Props = {
  product: SimpleProduct;
};

export default function HorizontalProductCard({ product }: Props) {
  return (
    <div className="flex gap-2 my-2">
      <div className="relative w-40 aspect-square">
        <Image
          src={product.thumbnailUrls![0]}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex w-full">
        <div className="flex flex-col justify-center w-full text-sm">
          <p className="font-semibold">{product.name}</p>
          <p>{product.description}</p>
          <p className="font-semibold">
            {/* {product.discountRate && <span>{product.discountRate}</span>}
            {product.price.toLocaleString()}원 */}
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
          </p>
        </div>
        <div className="sm:hidden md:flex flex-col justify-center p-5 gap-1">
          <LikeButton product={product} />
          <span className="text-center text-xs">{product.likeCount}</span>
        </div>
      </div>
    </div>
  );
}
