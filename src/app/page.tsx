import HomeSaleProducts from "@/components/HomeSaleProducts";
import NewArrivals from "@/components/NewArrivals";
import ReactQueryProvider from "@/provider/ReactQueryProvider";

export default function HomePage() {
  // TODO:비율 수정하기
  return (
    <div className=" flex flex-col bg-green-200">
      <div className="flex flex-col sm:grid sm:grid-cols-5 sm:gap-10 pt-2 ">
        <div className="col-span-2  bg-yellow-200">
          <NewArrivals />
        </div>
        <div className="col-span-3 bg-orange-200">
          <HomeSaleProducts />
        </div>
      </div>
    </div>
  );
}
