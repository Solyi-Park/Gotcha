import { getProductsByCategory } from "@/services/product";
import { cache } from "react";
import ProductCard from "./ProductCard";
import Image from "next/image";
import SimpleProductCard from "./SimpleProductCard";

const fetchNewArrivalProducts = cache(async () => {
  return await getProductsByCategory(1);
});
export default async function NewArrivals() {
  const res = await fetchNewArrivalProducts();
  console.log("res2==>", res);
  return (
    <ul className="flex flex-col">
      {res.map((product, index) => (
        <li key={product.name} className="last:border-0 border-b">
          {index === 0 ? (
            <SimpleProductCard product={product} />
          ) : (
            <ProductCard product={product} />
          )}
        </li>
      ))}
    </ul>
  );
}
