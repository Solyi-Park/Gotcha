"use client";
import { authOptions } from "@/app/lib/auth";
import Button from "@/components/Button";
import MyOrderButtonGroup from "@/components/MyOrderButtonGroup";
import OrderDetailLink from "@/components/OrderDetailLink";
import OrderProductDetail from "@/components/OrderProductDetail";
import { OrderData, OrderItemWithProduct, OrderStatus } from "@/model/order";
import { getOrderDataByUserId } from "@/services/order";
import { getFormattedDate } from "@/utils/date";
import { formatOrderStatus } from "@/utils/orderStatus";
import { useQuery } from "@tanstack/react-query";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";

//진행상태: 입금대기>결제완료(취소접수, 문의)>배송준비중>배송시작>배송중>배송완료
async function fetchOrderData(userId: string): Promise<OrderData[]> {
  return await fetch(`/api/order/list`, {
    method: "GET",
  }).then((res) => res.json());
}

export default function OrderListPage() {
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
    <div>
      <h3>주문배송조회</h3>
      <section className="flex w-full border-black border-t-[3px] border-b-[1px] py-3 font-semibold">
        <div className="flex-[0.5] border-r-2 text-center">상품정보</div>
        <div className="flex-[0.16] border-r-2">배송비</div>
        <div className="flex-[0.16] border-r-2">진행상태</div>
        <div className="flex-[0.18] text-center">리뷰</div>
      </section>
      <ol>
        {!isLoading &&
          !error &&
          orders &&
          orders.map((order) => (
            <li key={order.id}>
              <div className="py-3 border-b-2 border-black">
                <OrderDetailLink order={order} />
                {/* 해당날짜로 주문한 아이템리스트 */}
                <ul>
                  {order.items?.map((item) => (
                    <li key={item.id} className="flex ">
                      <div>
                        <OrderProductDetail
                          item={item}
                          options={item.options}
                        />
                      </div>
                      <div>
                        <span>
                          {order.shippingCost > 0
                            ? `${order.shippingCost}원`
                            : "무료배송"}
                        </span>
                      </div>
                      <div>
                        <span className="text-2xl font-bold">
                          {formatOrderStatus(order.status)}
                        </span>
                      </div>
                      <div>
                        <MyOrderButtonGroup
                          status={order.status}
                          orderId={order.id}
                        />
                      </div>
                      <div>
                        <Button
                          text="리뷰작성"
                          color="black"
                          isVisible={
                            order.status === "Delivered" ||
                            order.status === "InTransit" ||
                            order.status === "ExchangeRequested" ||
                            order.status === "ExchangeCompleted"
                          }
                          href={""}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
      </ol>
      {/* 주문일짜별로 리스트 */}
    </div>
  );
}
