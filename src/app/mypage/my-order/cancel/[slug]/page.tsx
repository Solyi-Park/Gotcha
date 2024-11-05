"use client";
import CancelProgress from "@/components/CancelProgress";
import OrderProductDetail from "@/components/OrderProductDetail";
import { OrderData } from "@/model/order";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

async function fetchOrderData(orderId: string): Promise<OrderData> {
  return await fetch(`/api/order?orderId=${orderId}`, {
    method: "GET",
  }).then((res) => res.json());
}

export default function cancelDetailPage() {
  const params = useParams();
  const orderId = params.slug as string;
  console.log("orderId?", orderId);

  const {
    data: order,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["order", orderId],
    queryFn: async () => fetchOrderData(orderId),
  });
  console.log("order data", order);

  return (
    <div>
      <CancelProgress />
      <div>
        <h3>취소 상품 선택</h3>
        <section className="flex w-full border-black border-t-[3px] border-b-[1px] py-3 font-semibold text-center">
          <div className="flex-[0.5] border-r-2 ">상품정보</div>

          <div className="flex-[0.16] border-r-2 ">진행상태</div>
          <div className="flex-[0.18] ">수량선택</div>
        </section>
      </div>
      <div>
        {order &&
          order.items?.map((item) => (
            <OrderProductDetail item={item} options={item.options} />
          ))}
      </div>
    </div>
  );
}
