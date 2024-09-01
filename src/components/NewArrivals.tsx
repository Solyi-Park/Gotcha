import { getProducts } from "@/services/product";
import { cache } from "react";
import HomeProductList from "./HomeProductList";

const fetchNewArrivalProducts = cache(async () => {
  return await getProducts();
});

export default async function NewArrivals() {
  //TODO: 카테고리별로 받기
  const products = await fetchNewArrivalProducts();
  return (
    <section className="relative">
      {/* md:absolute 이거 첫번쨰들어가게하기 */}
      <h2 className="md:absolute font-semibold text-2xl text-center italic my-2">
        New Arrivals
      </h2>
      {/* 궅이 HomeProductList로 해야할지 생각해보기*/}
      <HomeProductList products={products} />
    </section>
  );
}
