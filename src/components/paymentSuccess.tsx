"use client";
import LoadingSpinner from "@/components/LoadingSpinner";
import OrderProductDetail from "@/components/OrderProductDetail";
import { OrderItemWithProduct } from "@/model/order";
import { Payment } from "@/model/payment";
import { getFormattedDate } from "@/utils/date";
import { formatOrderStatus } from "@/utils/orderStatus";
import { getPaymentMethod } from "@/utils/payment";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaymentSuccess() {
  const params = useSearchParams();

  const orderId = params.get("orderId");
  const paymentKey = params.get("paymentKey");
  const amount = params.get("amount");

  const [loading, setLoading] = useState(true);
  const [paymentResult, setPaymentResult] = useState<Payment | null>(null);

  useEffect(() => {
    const confirm = async () => {
      try {
        const requestData = {
          paymentKey,
          orderId,
          amount: Number(amount),
        };

        const response = await fetch("/api/confirm", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });
        const json = await response.json();

        if (!response.ok) {
          // 결제 실패 비즈니스 로직을 구현하세요.
          throw new Error(json.message || "결제 실패");
        }

        // console.log("paymentResult", json);
        setPaymentResult(json);

        await clearCart(json.orderId);

        // router.push(`/confirmed/${json.orderId}`);
      } catch (error) {
        // console.error("결제 실패:", error);
        //TODO: 결제 실패 페이지
        // router.push(`/fail?message=${error}`);
      } finally {
        setLoading(false); // 로딩 중지
      }
    };
    confirm();
    // }
  }, []);

  const {
    data: order,
    isLoading: isOrderDataLoading,
    isError: isOrderDataError,
  } = useQuery({
    queryKey: ["confirmed", "order", orderId],
    queryFn: async () => fetchOrderData(paymentResult?.orderId!),
    enabled: !!paymentResult?.orderId,
  });
  // console.log("order?", order.payments);

  if (loading) {
    return (
      <div className="flex w-full h-[50%] justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      {order && (
        <div className="min-w-96">
          {isOrderDataLoading && (
            <div>
              <LoadingSpinner />
            </div>
          )}
          {!isOrderDataLoading && !isOrderDataError && order && (
            <div className="flex flex-col gap-10 max-w-[1024px] items-center w-full mx-auto">
              <section className="w-full text-center p-10 my-5">
                <h2 className="text-3xl font-semibold mb-5">
                  주문이 완료되었습니다.
                </h2>
                <div>
                  <span>주문번호</span>
                  <span className="ml-1 font-bold text-rose-500">
                    {order?.displayOrderNumber}
                  </span>
                </div>
              </section>

              <section className="w-full">
                <h3 className="font-semibold pb-2 border-b-2 border-black">
                  주문상품정보 / {order.items.length}개 상품
                </h3>
                <ul>
                  <li>
                    <section className="grid grid-cols-12 w-full border-black border-b-[1px] py-2 text-xs">
                      <div className="col-span-4 ml-5">상품</div>
                      <div className="col-span-4">상품정보</div>
                      <div className="col-span-2">수량</div>
                      <div className="col-span-2">진행상태</div>
                    </section>
                  </li>
                  {order.items &&
                    order.items.map((item: OrderItemWithProduct) => (
                      <li key={`${item.id}`}>
                        <div className="grid grid-cols-12 items-center py-3 border-b last:border-none">
                          <div className="col-span-8">
                            <OrderProductDetail
                              item={item}
                              options={item.options}
                            />
                          </div>
                          <span className="col-span-2 text-lg font-bold">
                            {order.orderQuantity}개
                          </span>
                          <span className="col-span-2 text-lg font-bold">
                            {formatOrderStatus(order.status)}
                          </span>
                        </div>
                      </li>
                    ))}
                </ul>
              </section>

              <section className="w-full">
                <h3 className="text-lg font-semibold pb-2 border-b-2 border-black">
                  결제정보
                </h3>
                <div>
                  <table className="w-full text-sm">
                    <tbody>
                      <tr className="border-b">
                        <th className="w-1/4 border-r py-2 font-normal">
                          결제방법
                        </th>
                        <td className="pl-5">
                          {getPaymentMethod(order.payments)}
                        </td>
                      </tr>
                      <tr className="border-b">
                        <th className="w-1/4 border-r py-2 font-normal">
                          주문상태
                        </th>
                        <td className="w-3/4 pl-5">
                          {formatOrderStatus(order.status)}
                        </td>
                      </tr>
                      <tr className="border-b">
                        <th className="w-1/4 border-r py-2 font-normal">
                          주문접수일시
                        </th>
                        <td className="w-3/4 pl-5">
                          {getFormattedDate(order.createdAt)}
                        </td>
                      </tr>
                      <tr className="border-b">
                        <th className="w-1/4 border-r py-2 font-normal">
                          결제완료일시
                        </th>
                        <td className="w-3/4 pl-5">
                          {getFormattedDate(order.payments.approvedAt)}
                        </td>
                      </tr>
                      <tr className="border-b">
                        <th className="w-1/4 border-r py-2 font-normal">
                          배송비
                        </th>
                        <td className="w-3/4 pl-5">
                          {order.shippingCost.toLocaleString()}원
                        </td>
                      </tr>
                      {/* <tr className="border-b">
                  <th className="w-1/4 border-r py-2 font-normal">
                    마일리지 사용금액
                  </th>
                  <td className="w-3/4 pl-5">1600P</td>
                </tr> */}
                      <tr className="border-b">
                        <th className="w-1/4 border-r py-2 font-normal">
                          결제금액
                        </th>
                        <td className="w-3/4 pl-5">
                          {order.totalAmount.toLocaleString()}원
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="w-full">
                <h3 className="text-lg font-semibold pb-2 border-b-2 border-black">
                  배송정보
                </h3>
                <table className="w-full">
                  <tbody>
                    <tr className="border-b text-sm">
                      <th className="border-r font-normal" scope="row">
                        받는사람
                      </th>
                      <td className="py-3 px-5" colSpan={3}>
                        {order.recipient}
                      </td>
                    </tr>
                    <tr className="border-b text-sm">
                      <th className="border-r font-normal" scope="row">
                        휴대폰
                      </th>
                      <td className="py-3 px-5">{order.contact1}</td>
                    </tr>
                    <tr className="border-b text-sm">
                      <th className="border-r font-normal" scope="row">
                        주소
                      </th>
                      <td className="py-3 px-5" colSpan={3}>
                        {order.fullAddress}
                      </td>
                    </tr>
                    <tr className="border-b text-sm">
                      <th className="border-r font-normal" scope="row">
                        배송요청사항
                      </th>
                      <td className="py-3 px-5" colSpan={3}>
                        {order.customDeliveryNote !== ""
                          ? order.customDeliveryNote
                          : order.deliveryNote || "-"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>

              <div className="flex items-center gap-2 mb-10">
                <Link
                  href="/"
                  className="bg-white border border-neutral-400 w-60 py-2 text-center font-semibold"
                >
                  계속 쇼핑하기
                </Link>
                <Link
                  href="/mypage/my-order/list"
                  className="bg-black text-white w-60 py-2 border border-black text-center font-semibold"
                >
                  주문/배송조회하기
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

async function fetchOrderData(orderId: string) {
  try {
    const res = await fetch(`/api/order/${orderId}?type=order`, {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch order data with orderId:${orderId}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function clearCart(orderId: string) {
  try {
    const response = await fetch(`/api/cart/clear`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ orderId }),
    });

    if (!response.ok) {
      throw new Error("Failed to clear cart");
    }

    console.log("Cart cleared successfully");
  } catch (error) {
    console.error("Error clearing cart:", error);
  }
}
