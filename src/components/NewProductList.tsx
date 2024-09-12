import Link from "next/link";
import HorizontalProductCard from "./HorizontalProductCard";
import SimpleProductCard from "./HomeSimpleProductCard";
import { FullProduct } from "@/model/product";
type Props = {
  products: FullProduct[];
};

export default function NewProductList({ products }: Props) {
  return (
    <ul className="flex flex-col gap-1">
      {products.map((product, index) => (
        <li
          key={product.name}
          className="border-b last:border-0 first:border-r"
        >
          <Link href={`/products/${product.id}`}>
            {index % 3 === 0 ? (
              <SimpleProductCard product={product} />
            ) : (
              <HorizontalProductCard product={product} />
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}
