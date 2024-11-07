import { OrderStatus } from "@/model/order";

export function formatOrderStatus(status: OrderStatus) {
  if (!status) return "Pending";
  switch (status) {
    case "Pending":
      return "입금대기";
    case "Paid":
      return "결제완료";
    case "Preparing":
      return "배송준비중";
    case "InTransit":
      return "배송중";
    case "Delivered":
      return "배송완료";
    case "ExchangeRequested":
      return "교환접수";
    case "ExchangeCompleted":
      return "교환완료";
    case "ReturnRequested":
      return "반품접수";
    case "ReturnCompleted":
      return "반품완료";
    case "Confirmed":
      return "구매확정";
    case "Cancelled":
      return "취소완료";
  }
}
