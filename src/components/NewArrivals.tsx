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
    <section>
      <h2 className="font-semibold text-lg italic mb-3">New Arrivals</h2>
      {/* 궅이 HomeProductList로 해야할지 생각해보기*/}
      <HomeProductList products={products} />;
    </section>
  );
}
