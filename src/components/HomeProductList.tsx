import HomeProductCard from "./HomeProductCard";
import SimpleProductCard from "./HomeSimpleProductCard";
type Props = {
  products: FullProduct[];
};

export default function HomeProductList({ products }: Props) {
  return (
    <ul className="flex flex-col">
      {products.map((product, index) => (
        <li key={product.name} className="last:border-0 border-b">
          {index % 3 === 0 ? (
            <SimpleProductCard product={product} />
          ) : (
            <HomeProductCard product={product} />
          )}
        </li>
      ))}
    </ul>
  );
}
