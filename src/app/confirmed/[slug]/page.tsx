"use client";
import LoadingSpinner from "@/components/LoadingSpinner";
import OrderProductDetail from "@/components/OrderProductDetail";
import { OrderDetails, OrderItem } from "@/model/order";
import useOrderStore from "@/store/ortder";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

async function fetchOrderItems(orderId: string) {
  try {
    const res = await fetch(`/api/order/${orderId}?type=items`, {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch order items with orderId:${orderId}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
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

export default function ConfirmedPage() {
  const params = useParams();
  const orderId = params.slug as string;

  const {
    data: order,
    isLoading: isOrderLoading,
    isError: isOrderError,
  } = useQuery({
    queryKey: ["confirmed", "order", orderId],
    queryFn: async () => fetchOrderData(orderId),
  });
  const {
    data: items,
    isLoading: isItemsLoading,
    isError: isItemsError,
  } = useQuery({
    queryKey: ["confirmed", "items", orderId],
    queryFn: async () => fetchOrderItems(orderId),
  });

  return (
    <div>
      {isItemsLoading && <LoadingSpinner />}
      {!isItemsLoading && !isItemsError && items && (
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
              주문상품정보 / {items.length}개 상품
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
              {items &&
                items.map((item: OrderItem) => (
                  <li key={item.productId}>
                    {/* <OrderProductDetail
                      productId={item.productId}
                      order={order}
                    /> */}
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
                    <td>토스페이</td>
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
  );
}
//
