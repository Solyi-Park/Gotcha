import { getProducts } from "@/services/product";
import { cache } from "react";
import NewProductList from "./NewProductList";

const fetchNewArrivalProducts = cache(async () => {
  return await getProducts();
});

export default async function NewArrivalsSection() {
  //TODO: 카테고리별로 받기
  const newProducts = await fetchNewArrivalProducts();
  return (
    <section>
      {/* 타이틀 글자크기 줄이기 */}
      <h2 className="font-semibold text-2xl text-center italic my-2">
        New Arrivals
      </h2>
      <NewProductList products={newProducts} />
    </section>
  );
}
