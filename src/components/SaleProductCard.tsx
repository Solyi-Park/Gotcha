import Image from "next/image";
import HeartIcon from "./icons/HeartIcon";
import { getDiscountedPrice } from "@/utils/calculate";

type Props = {
  product: SimpleProduct;
};
export default function SaleProductCard({ product }: Props) {
  return (
    <div className="flex flex-col my-2">
      <div className="relative w-48 aspect-square">
        <Image
          src={product.thumbnailUrls![0]}
          alt={product.name}
          fill
          className="object-cover relative"
        />
        <button className="absolute right-2 bottom-2 text-white">
          <HeartIcon />
        </button>
      </div>
      <div className="flex w-full">
        <div className="flex flex-col justify-center w-full">
          <p className="font-semibold">{product.name}</p>
          <p className="flex items-center text-sm font-semibold">
            <span className="mr-2 text-orange-600">
              {product.discountRate}%
            </span>
            <span className="text-xs text-gray-400 font-normal line-through mr-2">
              {product.price.toLocaleString()}원
            </span>
            <span>
              {getDiscountedPrice(product.price, product.discountRate)}원
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
