"use client";
import { authOptions } from "@/app/lib/auth";
import Button from "@/components/Button";
import MyOrderButtonGroup from "@/components/MyOrderButtonGroup";
import OrderDetailLink from "@/components/OrderDetailLink";
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
      <section className="flex w-full border-black border-b-[1px] py-3 font-semibold">
        <div className="flex-[0.4] text-center">상품정보</div>
        <div className="flex-[0.1] text-center">배송비</div>
        <div className="flex-[0.3] text-center">진행상태</div>
        <div className="flex-[0.2] text-center">리뷰</div>
      </section>
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
              <div className="py-3 border-b-2 border-black">
                <OrderDetailLink order={order} underline isClickable />
                {/* 해당날짜로 주문한 아이템리스트 */}
                <ul>
                  {order.items?.map((item) => (
                    <li
                      key={item.id}
                      className="flex py-4 min-h-40 w-full h-full "
                    >
                      <div className="flex flex-[0.4] items-center">
                        <OrderProductDetail
                          item={item}
                          options={item.options}
                        />
                      </div>
                      <div className="flex-[0.1] text-center my-auto ">
                        <span>
                          {order.shippingCost > 0
                            ? `${order.shippingCost.toLocaleString()}원`
                            : "무료배송"}
                        </span>
                      </div>
                      <div className="flex flex-[0.3] justify-center items-center">
                        <span className="text-2xl font-bold">
                          {formatOrderItemStatus(order.status, item.status)}
                        </span>
                      </div>
                      <div className="flex gap-4 p-1 flex-[0.2] items-center justify-between ">
                        <div className="flex flex-col gap-1">
                          <Button
                            text="취소접수"
                            color="black"
                            isVisible={isVisibleButton(
                              item.status,
                              order.status,
                              "cancel"
                            )}
                            href={`/mypage/my-order/cancel/${order.id}?funnel-step=취소상품+선택`}
                          />
                          <Button
                            text="취소상세"
                            color="black"
                            isVisible={isVisibleButton(
                              item.status,
                              order.status,
                              "cancelDetail"
                            )}
                            href={`/mypage/my-order/cancel-detail/${item.id}`}
                          />
                          <Button
                            text="교환접수"
                            isVisible={isVisibleButton(
                              item.status,
                              order.status,
                              "exchange"
                            )}
                            href={""}
                          />
                          <Button
                            text="반품접수"
                            isVisible={isVisibleButton(
                              item.status,
                              order.status,
                              "return"
                            )}
                            href=""
                          />
                          <Button text="1:1문의" href="" />
                        </div>
                        <div className=" mr-2">
                          {isVisibleButton(
                            item.status,
                            order.status,
                            "review"
                          ) ? (
                            <Button
                              text="리뷰작성"
                              color="black"
                              isVisible
                              href=""
                            />
                          ) : (
                            <span className="font-extrabold">-</span>
                          )}
                        </div>
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

function isVisibleButton(
  itemStatus: string,
  orderStatus: string,
  type: string
): boolean {
  const visibilityRules: Record<string, () => boolean> = {
    cancel: () =>
      itemStatus !== "CANCELED" &&
      itemStatus !== "PARTIALLY_CANCELED" &&
      ["PENDING", "PAID", "PREPARING"].includes(orderStatus),

    exchange: () =>
      itemStatus !== "CANCELED" &&
      !["EXCHANGE_REQUESTED"].includes(itemStatus) &&
      [
        "SHIPPED",
        "IN_TRANSIT",
        "DELIVERED",
        "EXCHANGE_COMPLETED",
        "PARTICIALLY_CANCELED",
      ].includes(orderStatus),

    return: () =>
      itemStatus !== "CANCELED" &&
      !["RETURN_REQUESTED"].includes(itemStatus) &&
      [
        "SHIPPED",
        "IN_TRANSIT",
        "DELIVERED",
        "EXCHANGE_REQUESTED",
        "EXCHANGE_COMPLETED",
        "PARTICIALLY_CANCELED",
      ].includes(orderStatus),

    cancelDetail: () => ["CANCELED", "PARTIALLY_CANCELED"].includes(itemStatus),

    review: () => ["DELIVERED", "EXCHANGE_COMPLETED"].includes(orderStatus),
  };

  return visibilityRules[type]?.() || false;
}
