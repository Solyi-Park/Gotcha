import { OrderData } from "@/model/order";
import { getFormattedDate } from "@/utils/date";
import AngleRightIcon from "./icons/AngleRightIcon";

type Props = {
  order: OrderData;
  isClickable?: boolean;
  underline?: boolean;
};
export default function OrderDetailLink({
  order,
  isClickable = false,
  underline = false,
}: Props) {
  return (
    <div className={`flex ${underline && "border-b"} gap-5 pb-2 items-center`}>
      {isClickable ? (
        <a href={`/mypage/my-order/detail/${order.id}`}>
          주문일자
          <span className="font-bold ml-2">
            {getFormattedDate(order.createdAt)}
          </span>
        </a>
      ) : (
        <p>
          주문일자
          <span className="font-bold ml-2">
            {getFormattedDate(order.createdAt)}
          </span>
        </p>
      )}
      {isClickable ? (
        <a className="ml-4" href={`/mypage/my-order/detail/${order.id}`}>
          주문번호
          <span className="font-bold mr-2 ml-2">
            {order.displayOrderNumber}
          </span>
        </a>
      ) : (
        <p>
          주문번호
          <span className="font-bold mr-2 ml-2">
            {order.displayOrderNumber}
          </span>
        </p>
      )}

      {isClickable && <AngleRightIcon />}
    </div>
  );
}
