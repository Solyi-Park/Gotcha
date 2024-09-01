import HomeProductCard from "./HomeProductCard";
import SimpleProductCard from "./HomeSimpleProductCard";
type Props = {
  products: FullProduct[];
};

export default function HomeProductList({ products }: Props) {
  return (
    <ul className="grid md:grid-cols-2 sm:grid-row-10 gap-1">
      {products.map((product, index) => (
        <li
          key={product.name}
          className={`border-b last:border-0 first:border-r first:row-start-2 row-span-2${
            index % 2 !== 0 ? "" : ""
          }`}
        >
          {/* {index % 3 === 0 ? ( */}
          <SimpleProductCard product={product} />
          {/* // ) : ( */}
          {/* <HomeProductCard product={product} /> */}
          {/* // )} */}
        </li>
      ))}
    </ul>
  );
}
