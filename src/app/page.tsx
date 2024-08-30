import HomeSaleProducts from "@/components/HomeSaleProducts";
import NewArrivals from "@/components/NewArrivals";
import ReactQueryProvider from "@/provider/ReactQueryProvider";

export default function HomePage() {
  return (
    <div className="grid grid-cols-5 grid-rows-2 gap-3 h-full">
      <div className="col-span-2">
        <NewArrivals />
      </div>
      <div className="col-span-3">
        <HomeSaleProducts />
      </div>
    </div>
  );
}
// TODO:비율 수정하기
