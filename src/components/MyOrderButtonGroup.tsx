import { OrderStatus } from "@/model/order";
import Button from "./Button";

export default function MyOrderButtonGroup({
  status,
}: {
  status: OrderStatus;
}) {
  return (
    <div className="grid grid-cols-2 grid-rows-2 h-16 gap-2">
      <Button
        text="취소접수"
        color="black"
        isVisible={
          status === "Pending" || status === "Paid" || status === "Preparing"
        }
      />
      <Button
        text="교환접수"
        isVisible={
          status === "Shipped" ||
          status === "InTransit" ||
          status === "Delivered" ||
          status === "ExchangeCompleted"
        }
      />
      <Button
        text="반품접수"
        isVisible={
          status === "InTransit" ||
          status === "Delivered" ||
          status === "ExchangeRequested" ||
          status === "ExchangeCompleted"
        }
      />

      <Button
        text="취소상세"
        color="black"
        isVisible={status === "Cancelled"}
      />

      <Button text="1:1문의" />
    </div>
  );
}
