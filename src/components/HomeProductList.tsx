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
        <li
          key={product.name}
          className="border-b last:border-0 first:border-r"
        >
          <Link href={`/products/${product.id}`}>
            {index % 3 === 0 ? (
              <SimpleProductCard product={product} />
            ) : (
              <HomeProductCard product={product} />
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}
