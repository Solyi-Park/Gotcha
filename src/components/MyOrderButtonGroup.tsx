"use client";
import { OrderStatus } from "@/model/order";
import Button from "./Button";
import { useRouter } from "next/navigation";

type Props = {
  status: OrderStatus;
  orderId: string;
};

export default function MyOrderButtonGroup({ status, orderId }: Props) {
  return (
    <div className="grid grid-cols-2 grid-rows-2 h-16 gap-2">
      <Button
        text="취소접수"
        color="black"
        isVisible={
          status === "Pending" || status === "Paid" || status === "Preparing"
        }
        href={`/mypage/my-order/cancel/${orderId}?funnel-step=취소상품+선택`}
      />
      <Button
        text="교환접수"
        isVisible={
          status === "Shipped" ||
          status === "InTransit" ||
          status === "Delivered" ||
          status === "ExchangeCompleted"
        }
        href={""}
      />
      <Button
        text="반품접수"
        isVisible={
          status === "InTransit" ||
          status === "Delivered" ||
          status === "ExchangeRequested" ||
          status === "ExchangeCompleted"
        }
        href={""}
      />

      <Button
        text="취소상세"
        color="black"
        isVisible={status === "Cancelled"}
        href={""}
      />

      <Button text="1:1문의" href={""} />
    </div>
  );
}
