import { OrderItemWithProduct } from "@/model/order";
import OrderProductDetail from "./OrderProductDetail";
import Button from "./Button";
import { formatOrderItemStatus } from "@/utils/orderStatus";

type OrderItemProps = {
  item: OrderItemWithProduct;
  shippingCost: number;
  orderStatus: string;
  orderId: string;
};

export default function OrderItem({
  item,
  shippingCost,
  orderStatus,
  orderId,
}: OrderItemProps) {
  return (
    <div className="flex flex-col sm:flex-row py-4 min-h-40 w-full h-full">
      <div className="sm:hidden flex-[0.3] justify-center items-center mb-3 sm:mb-0">
        <span className="sm:text-2xl font-semibold sm:font-bold p-1 sm:p-0 text-sm bg-blue-100 sm:bg-inherit rounded-sm sm:rounded-none">
          {formatOrderItemStatus(orderStatus, item.status)}
        </span>
      </div>
      <div className="flex flex-[0.4] items-center">
        <OrderProductDetail item={item} options={item.options} />
      </div>
      <div className="hidden sm:block flex-[0.1] text-center sm:my-auto my-3 py-2 sm:py-0 border-y border-b-black sm:border-0">
        <span className="mr-1 sm:hidden ">배송비:</span>
        <span>
          {shippingCost > 0 ? `${shippingCost.toLocaleString()}원` : "무료배송"}
        </span>
      </div>
      <div className="hidden sm:flex flex-[0.3] justify-center items-center">
        <span className="text-2xl font-bold">
          {formatOrderItemStatus(orderStatus, item.status)}
        </span>
      </div>
      <div className="flex gap-4 p-1 flex-[0.2] items-center justify-between">
        <div className="flex flex-row sm:flex-col gap-1">
          <Button
            text="취소접수"
            color="black"
            isVisible={isVisibleButton(item.status, orderStatus, "cancel")}
            href={`/mypage/my-order/cancel/${orderId}?funnel-step=취소상품+선택`}
          />
          <Button
            text="취소상세"
            color="black"
            isVisible={isVisibleButton(
              item.status,
              orderStatus,
              "cancelDetail"
            )}
            href={``} //TODO: cancel data 사용하여 라우팅
            onClick={() => alert("서비스 준비중입니다!")}
          />
          <Button
            text="교환접수"
            isVisible={isVisibleButton(item.status, orderStatus, "exchange")}
            href=""
          />
          <Button
            text="반품접수"
            isVisible={isVisibleButton(item.status, orderStatus, "return")}
            href=""
          />
          <Button
            text="1:1문의"
            href=""
            onClick={() => alert("서비스 준비중입니다!")}
          />
        </div>
        <div className="mr-2 hidden sm:block">
          {isVisibleButton(item.status, orderStatus, "review") ? (
            <Button text="리뷰작성" color="black" isVisible href="" />
          ) : (
            <span className="font-extrabold">-</span>
          )}
        </div>
      </div>
      <div className="flex-[0.1] text-center sm:my-auto my-3 py-2 sm:py-0 border-y border-b-black sm:border-0">
        <span className="mr-1 sm:hidden ">배송비:</span>
        <span>
          {shippingCost > 0 ? `${shippingCost.toLocaleString()}원` : "무료배송"}
        </span>
      </div>
    </div>
  );
}

function isVisibleButton(
  itemStatus: string,
  orderStatus: string,
  type: string
): boolean {
  const visibilityRules: Record<string, () => boolean> = {
    cancel: () =>
      itemStatus !== "CANCELED" &&
      itemStatus !== "PARTIALLY_CANCELED" &&
      ["PENDING", "PAID", "PREPARING"].includes(orderStatus),

    exchange: () =>
      itemStatus !== "CANCELED" &&
      !["EXCHANGE_REQUESTED"].includes(itemStatus) &&
      [
        "SHIPPED",
        "IN_TRANSIT",
        "DELIVERED",
        "EXCHANGE_COMPLETED",
        "PARTICIALLY_CANCELED",
      ].includes(orderStatus),

    return: () =>
      itemStatus !== "CANCELED" &&
      !["RETURN_REQUESTED"].includes(itemStatus) &&
      [
        "SHIPPED",
        "IN_TRANSIT",
        "DELIVERED",
        "EXCHANGE_REQUESTED",
        "EXCHANGE_COMPLETED",
        "PARTICIALLY_CANCELED",
      ].includes(orderStatus),

    cancelDetail: () => ["CANCELED", "PARTIALLY_CANCELED"].includes(itemStatus),

    review: () => ["DELIVERED", "EXCHANGE_COMPLETED"].includes(orderStatus),
  };

  return visibilityRules[type]?.() || false;
}
