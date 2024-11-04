"use client";
import LoadingSpinner from "@/components/LoadingSpinner";
import OrderProductDetail from "@/components/OrderProductDetail";
import { CARD_COMPANIES } from "@/constants/cardCompanies";
import { OrderItem } from "@/model/order";
import { Payment } from "@/model/payment";
import useOrderStore from "@/store/ortder";
import {
  getBankName,
  getCardCompanyName,
  getEasypayCompany,
} from "@/utils/payment";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SuccessPage() {
  const router = useRouter();
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

        console.log("paymentResult", json);
        setPaymentResult(json);

        await clearCart(json.orderId);

        // router.push(`/confirmed/${json.orderId}`);
      } catch (error) {
        console.error("결제 실패:", error);
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

  function getPaymentMethod(payment: Payment) {
    switch (payment.method) {
      case "간편결제":
        return getEasypayCompany(payment.easyPay!);
      case "카드":
        return getCardCompanyName(payment.card!);

      case "계좌이체":
        return getBankName(payment.transfer!);
    }
  }

  if (loading) {
    return (
      <div className="flex w-full h-[50%] justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      {paymentResult && (
        <div>
          {isOrderDataLoading && <LoadingSpinner />}
          {!isOrderDataLoading && !isOrderDataError && order && (
            <div>
              <section>
                <h2>주문이 완료되었습니다.</h2>
                <p>
                  주문번호
                  <span className="ml-1 font-bold text-rose-500">
                    {order?.displayOrderNumber}
                  </span>
                </p>
              </section>
              <section>
                <h3 className="font-semibold">
                  주문상품정보 / {order.items.length}개 상품
                </h3>
                <ul>
                  <li>
                    <div>
                      <span>상품</span>
                      <span>상품정보</span>
                    </div>
                    <div>수량</div>
                    <div>진행상태</div>
                  </li>
                  {order.items &&
                    order.items.map((item: OrderItem) => (
                      <li key={`${item.productId}-${item.options}`}>
                        {/* <OrderProductDetail product={item.product} /> */}
                      </li>
                    ))}
                </ul>
              </section>
              <section>
                <h3 className="font-semibold">결제정보</h3>
                <div>
                  <table className="border">
                    <tbody>
                      <tr>
                        <th>결제방법</th>
                        <td>{getPaymentMethod(paymentResult)}</td>
                      </tr>
                      <tr>
                        <th>주문상태</th>
                        <td>결제완료</td>
                      </tr>
                      <tr>
                        <th>주문접수일시</th>
                        <td>2024-10-10-12:22 PM</td>
                      </tr>
                      <tr>
                        <th>결제완료일시</th>
                        <td>2024-10-10-12:22 PM</td>
                      </tr>
                      <tr>
                        <th>배송비</th>
                        <td>3000원</td>
                      </tr>
                      {/* 마일리지썼으면 */}
                      <tr>
                        <th>마일리지 사용금액</th>
                        <td>1600P</td>
                      </tr>
                      <tr>
                        <th>결제금액</th>
                        <td>29400원</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
              <section>
                <h3>배송정보</h3>
                <div>
                  <table>
                    <tbody>
                      <tr>
                        <th>반으시는분</th>
                        <td>박솔이</td>
                      </tr>
                      <tr>
                        <th>휴대폰번호</th>
                        <td>010-1234-1234</td>
                      </tr>
                      <tr>
                        <th>주소</th>
                        <td>
                          서울특별시 성동구 아차산로 13길 11, 1층 (성수동2가,
                          무신사캠퍼스 엔1)
                        </td>
                      </tr>
                      <tr>
                        <th>배송요청사항</th>
                        <td>부재시 문앞에 놓아주세요.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
              <div>
                <Link href="/">계속 쇼핑하기</Link>
                <Link href="/mypage">주문/배송조회하기</Link>
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
    const res = await fetch(`/api/order/${orderId}?type=orders`, {
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
