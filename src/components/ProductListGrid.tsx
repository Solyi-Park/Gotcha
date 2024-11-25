import { FullProduct } from "@/model/product";
import Link from "next/link";
import VerticalProductCard from "./VerticalProductCard";

type Props = {
  products: FullProduct[];
};
export default function ProductListGrid({ products }: Props) {
  return (
    <div className="flex w-full mb-10 sm:mt-9">
      <ul className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 w-full gap-y-10 sm:gap-y-16 sm:gap-x-4">
        {products?.map((product: FullProduct) => (
          <li key={product.id}>
            <Link href={`/products/${product.id}`}>
              <VerticalProductCard product={product} likeCount />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
