import Image from "next/image";
import HeartIcon from "./icons/HeartIcon";

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
          className="object-cover"
        />
      </div>
      <div className="flex w-full">
        <div className="flex flex-col justify-center w-full">
          <p className="font-semibold">{product.name}</p>
          <p className="text-sm font-semibold">
            <span className="mr-2 text-orange-600">
              {product.discountRate}%
            </span>
            <span>{product.price.toLocaleString()}원</span>
          </p>
        </div>
      </div>
      <button>
        <HeartIcon />
      </button>
    </div>
  );
}
