"use client";
import CancelInfo from "@/components/CancelInfo";
import LoadingSpinner from "@/components/LoadingSpinner";
import Order from "@/components/Order";
import OrderInfo from "@/components/OrderInfo";
import OrderListHeader from "@/components/OrderListHeader";
import PaymentInfo from "@/components/PaymentInfo";
import SectionTitle from "@/components/SectionTitle";
import ShippingInfo from "@/components/ShippingInfo";
import { OrderData, OrderOutputForOrderDetail } from "@/model/order";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

//TODO: 반복로직 분리
async function fetchOrderData(
  orderId: string
): Promise<OrderOutputForOrderDetail> {
  const res = await fetch(`/api/order/${orderId}?type=order`, {
    method: "GET",
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch order data with orderId:${orderId}`);
  }
  const data = await res.json();
  return data;
}
export default function MyOrderDetailPage() {
  const params = useParams();
  const orderId = params.slug as string;

  const {
    data: order,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["orderId", orderId],
    queryFn: async () => await fetchOrderData(orderId),
  });
  console.log("data", order);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {!isLoading && order && (
        <div className="flex flex-col gap-14">
          <OrderInfo order={order} />
          <div>
            <SectionTitle title="주문상품정보" />
            <OrderListHeader />
            <Order order={order} />
          </div>
          <PaymentInfo order={order} />
          {order.cancellationStatus === "CANCELED" ||
            (order.cancellationStatus === "PARTIALLY_CANCELED" && (
              <CancelInfo />
            ))}
          <ShippingInfo order={order} />
        </div>
      )}
    </>
  );
}
