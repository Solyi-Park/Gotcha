"use client";
import { CancelStatus, OrderStatus } from "@/model/order";
import Button from "./Button";
import { useRouter } from "next/navigation";

type Props = {
  status: OrderStatus;
  cancellationStatus: CancelStatus;
  orderId: string;
};

export default function MyOrderButtonGroup({
  status,
  cancellationStatus,
  orderId,
}: Props) {
  return (
    <div className="grid grid-cols-2 grid-rows-2 h-16 gap-2">
      <Button
        text="교환접수"
        isVisible={
          status === "SHIPPED" ||
          status === "IN_TRANSIT" ||
          status === "DELIVERED" ||
          status === "EXCHANGE_COMPLETED"
        }
        href={""}
      />
      <Button
        text="반품접수"
        isVisible={
          status === "IN_TRANSIT" ||
          status === "DELIVERED" ||
          status === "EXCHANGE_REQUESTED" ||
          status === "EXCHANGE_COMPLETED"
        }
        href={""}
      />

      <Button
        text="취소상세"
        color="black"
        isVisible={status === "CANCELED"}
        href={""}
      />

      <Button text="1:1문의" href={""} />
    </div>
  );
}
