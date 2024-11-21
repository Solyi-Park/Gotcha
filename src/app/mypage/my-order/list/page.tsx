"use client";
import { authOptions } from "@/app/lib/auth";
import Button from "@/components/Button";
import MyOrderButtonGroup from "@/components/MyOrderButtonGroup";
import Order from "@/components/Order";
import OrderDetailLink from "@/components/OrderDetailLink";
import OrderListHeader from "@/components/OrderListHeader";
import OrderProductDetail from "@/components/OrderProductDetail";
import SectionTitle from "@/components/SectionTitle";
import { OrderData, OrderItemWithProduct, OrderStatus } from "@/model/order";
import { getOrderDataByUserId } from "@/services/order";
import { getFormattedDate } from "@/utils/date";
import { formatOrderItemStatus, formatOrderStatus } from "@/utils/orderStatus";
import { useQuery } from "@tanstack/react-query";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

//진행상태: 입금대기>결제완료(취소접수, 문의)>배송준비중>배송시작>배송중>배송완료
async function fetchOrderData(userId: string): Promise<OrderData[]> {
  return await fetch(`/api/order/list`, {
    method: "GET",
  }).then((res) => res.json());
}

export default function OrderListPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;
  const {
    data: orders,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["orders", user?.id],
    queryFn: async () => fetchOrderData(user?.id),
  });

  console.log("orders", orders);

  return (
    <div className="min-w-[640px]">
      <SectionTitle title="주문배송조회" />
      <OrderListHeader />
      {orders?.length === 0 && (
        <div className="text-center my-10">
          <p className="text-lg font-semibold">
            아직 주문하신 내역이 없습니다.
          </p>
          <p className="text-sm text-gray-500">
            원하시는 상품을 찾아 지금 바로 주문해보세요!
          </p>
          <button
            className="mt-4 px-6 py-2 bg-black text-white rounded-md hover:bg-gray-700"
            onClick={() => router.push("/")}
          >
            상품 보러 가기
          </button>
        </div>
      )}
      <ol>
        {!isLoading &&
          !error &&
          orders &&
          orders.map((order) => (
            <li key={order.id}>
              <ol>
                {orders.map((order) => (
                  <div className="py-3 border-b-2 border-black">
                    <OrderDetailLink order={order} underline isClickable />
                    <li key={order.id}>
                      <Order key={order.id} order={order} />
                    </li>
                  </div>
                ))}
              </ol>
            </li>
          ))}
      </ol>
      {/* 주문일짜별로 리스트 */}
    </div>
  );
}
