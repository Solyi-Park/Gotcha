"use client";
import NewProductList from "./NewProductList";
import { useQuery } from "@tanstack/react-query";

async function fetchNewProducts() {
  return await fetch("/api/products", {
    method: "GET",
  }).then((res) => res.json());
}

export default function NewArrivalsSection() {
  const {
    data: newProducts,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["newProducts"],
    queryFn: async () => await fetchNewProducts(),
    staleTime: 1000 * 60 * 15,
  });

  return (
    <section>
      {/* 타이틀 글자크기 줄이기 */}
      <h2 className="font-semibold text-2xl text-center italic my-2">
        New Arrivals
      </h2>
      <NewProductList products={newProducts && newProducts} />
    </section>
  );
}
