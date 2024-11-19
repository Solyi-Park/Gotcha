export function formatOrderStatus(status: string) {
  console.log("status:", status);
  if (!status) return "PENDING";
  switch (status) {
    case "PENDING":
      return "입금대기";
    case "PAID":
      return "결제완료";
    case "PREPARING":
      return "배송준비중";
    case "SHIPPED":
      return "배송시작";
    case "IN_TRANSIT":
      return "배송중";
    case "DELIVERED":
      return "배송완료";
    case "EXCHANGE_REQUESTED":
      return "교환접수";
    case "EXCHANGE_COMPLETED":
      return "교환완료";
    case "RETURN_REQUESTED":
      return "반품접수";
    case "RETURN_COMPLETED":
      return "반품완료";
    case "CONFIRMED":
      return "구매확정";
    case "CANCELED":
      return "취소완료";
    case "PARTICIALLY_CANCELED":
      return "부분취소완료";
  }
}

export function formatOrderItemStatus(
  orderStatus: string,
  itemsStatus: string
) {
  console.log("orderStatus:", orderStatus);
  console.log("orderStitemsStatusatus:", itemsStatus);

  switch (itemsStatus) {
    case "ACTIVE":
      return formatOrderStatus(orderStatus);
    case "CANCELED":
      return "취소완료";
    case "PARTICIALLY_CANCELED":
      return "부분취소완료";
  }
}
