import HomeSaleProducts from "@/components/HomeSaleProducts";
import NewArrivals from "@/components/NewArrivals";
import ReactQueryProvider from "@/provider/ReactQueryProvider";

export default function HomePage() {
  // TODO:비율 수정하기
  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-col sm:grid grid-cols-5 grid-rows-2 gap-10 h-full mt-2">
        <div className="col-span-2 ">
          <NewArrivals />
        </div>
        <div className="col-span-3">
          <HomeSaleProducts />
        </div>
      </div>
    </div>
  );
}
