"use client";
import NewProductList from "./NewProductList";

export default function NewArrivalsSection() {
  return (
    <section>
      {/* 타이틀 글자크기 줄이기 */}
      <h2 className="font-semibold text-2xl text-center italic my-2">
        New Arrivals
      </h2>
      <NewProductList />
    </section>
  );
}
