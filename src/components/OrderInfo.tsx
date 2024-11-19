import { OrderData } from "@/model/order";
import OrderDetailLink from "./OrderDetailLink";
import OrderProgress from "./OrderProgress";
import SectionTitle from "./SectionTitle";

type Props = {
  order: OrderData;
};

export default function OrderInfo({ order }: Props) {
  return (
    <div className="min-w-[640px]">
      <div>
        {/* TODO: 제목만 분리 */}
        <SectionTitle title="주문상세내역" />
        <div className="mt-4">
          <OrderDetailLink order={order} />
        </div>
        <div className="flex justify-center py-10">
          <OrderProgress />
        </div>
      </div>
    </div>
  );
}
