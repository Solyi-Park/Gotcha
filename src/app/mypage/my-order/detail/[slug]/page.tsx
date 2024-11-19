"use client";
import BuyerInfo from "@/components/BuyerInfo";
import CancelInfo from "@/components/CancelInfo";
import LoadingSpinner from "@/components/LoadingSpinner";
import OrderInfo from "@/components/OrderInfo";
import PaymentInfo from "@/components/PaymentInfo";
import ShippingInfo from "@/components/ShippingInfo";
import { OrderData } from "@/model/order";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

//TODO: 반복로직 분리
async function fetchOrderData(orderId: string): Promise<OrderData> {
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
        <div>
          <OrderInfo order={order} />
          <BuyerInfo />
          <PaymentInfo />
          {order.cancellationStatus === "CANCELED" ||
            (order.cancellationStatus === "PARTIALLY_CANCELED" && (
              <CancelInfo />
            ))}

          <ShippingInfo />
        </div>
      )}
    </>
  );
}
