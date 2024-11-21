"use client";
import CancelList from "@/components/CancelList";
import CancelProgress from "@/components/CancelProgress";
import CancelReason from "@/components/CancelReason";
import ConfirmCancelDetail from "@/components/ConfirmCancelDetail";
import OrderCancelConfirmation from "@/components/OrderCancelConfirmation.";
import { OrderData } from "@/model/order";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "next/navigation";

async function fetchOrderData(orderId: string): Promise<OrderData> {
  return await fetch(`/api/order?orderId=${orderId}`, {
    method: "GET",
  }).then((res) => res.json());
}

export default function CancelDetailPage() {
  const searchParams = useSearchParams();
  const params = useParams();
  const orderId = params.slug as string;
  const step = searchParams.get("funnel-step") as string;
  // console.log("step", step);

  // 주문 데이터 가져오기
  const {
    data: order,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["order", orderId],
    queryFn: async () => fetchOrderData(orderId),
    staleTime: 6000 * 15,
  });
  // console.log("order data", order);

  return (
    <div className="w-full">
      <CancelProgress />
      <h3 className="text-lg font-bold border-b-[3px] border-black py-2">
        {getTitle(step)}
      </h3>
      {!isLoading && order && step === "취소상품 선택" && (
        <CancelList order={order} isLoading={isLoading} />
      )}
      {!isLoading && order && step === "취소사유 작성" && (
        <CancelReason orderId={order?.id} />
      )}
      {!isLoading && order && step === "취소정보 확인" && (
        <ConfirmCancelDetail order={order} />
      )}
      {!isLoading && order && step === "완료" && <OrderCancelConfirmation />}
    </div>
  );
}

const getTitle = (step: string) => {
  switch (step) {
    case "취소상품 선택":
      return "취소 상품 선택";
    case "취소사유 작성":
      return "취소 사유 작성";
    case "취소정보 확인":
      return "취소 정보 확인";
  }
};
