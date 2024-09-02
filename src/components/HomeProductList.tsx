import Link from "next/link";
import HomeProductCard from "./HomeProductCard";
import SimpleProductCard from "./HomeSimpleProductCard";
type Props = {
  products: FullProduct[];
};

export default function HomeProductList({ products }: Props) {
  return (
    <ul className="flex flex-col gap-1">
      {products.map((product, index) => (
        <Link href={`/products/${product.id}`}>
          <li
            key={product.name}
            className="border-b last:border-0 first:border-r"
          >
            {index % 3 === 0 ? (
              <SimpleProductCard product={product} />
            ) : (
              <HomeProductCard product={product} />
            )}
          </li>
        </Link>
      ))}
    </ul>
  );
}
