import { OrderData } from "@/model/order";
import { getFormattedDate } from "@/utils/date";

type Props = {
  order: OrderData;
};
export default function OrderDetailLink({ order }: Props) {
  return (
    <div className="border-b pb-2">
      <a href={`/mypage/my-order/detail/${order.id}`}>
        주문일자
        <span className="font-bold ml-2">
          {getFormattedDate(order.createdAt ?? "")}
        </span>
      </a>
      <a className="ml-4" href={`/mypage/my-order/detail/${order.id}`}>
        주문번호
        <span className="font-bold mr-2 ml-2">{order.displayOrderNumber}</span>
        {">"}
      </a>
    </div>
  );
}
