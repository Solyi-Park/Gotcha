import Image from "next/image";
import HeartIcon from "./icons/HeartIcon";

type Props = {
  product: FullProduct;
};
export default function HomeProductCard({ product }: Props) {
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
            {product.discountRate && <span>{product.discountRate}</span>}
            {product.price.toLocaleString()}원
          </p>
        </div>
        <div className="sm:hidden md:flex flex-col justify-center p-5 gap-1">
          <button>
            <HeartIcon />
          </button>
          <span className="text-center text-xs">{60}</span>
        </div>
      </div>
    </div>
  );
}
