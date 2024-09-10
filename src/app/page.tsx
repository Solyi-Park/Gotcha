import NewArrivalsSection from "@/components/NewArrivalsSection";
import SaleProductSection from "@/components/SaleProductSection";

export default async function HomePage() {
  // TODO:비율 수정하기
  return (
    <div className=" flex flex-col">
      <div className="flex flex-col sm:grid sm:grid-cols-5 sm:gap-10 pt-2 ">
        <div className="col-span-2">
          <NewArrivalsSection />
        </div>
        <div className="col-span-3">
          <SaleProductSection />
        </div>
      </div>
    </div>
  );
}
