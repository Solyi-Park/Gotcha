import NewArrivals from "@/components/NewArrivals";

export default function HomePage() {
  return (
    <div className="grid grid-cols-7 grid-rows-2 gap-3 h-full">
      <section className="col-span-2 row-span-2">
        <NewArrivals />
      </section>
      <section className="bg-purple-200 col-span-2 row-span-2">sale</section>
      <section className="bg-blue-200 col-span-3 row-span-1">interior</section>
      <section className="bg-rose-200 col-span-3 row-span-1">beauty</section>
    </div>
  );
}
