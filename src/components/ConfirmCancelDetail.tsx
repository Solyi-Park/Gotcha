import useCancelStore from "@/store/cancel";
import OrderProductDetail from "./OrderProductDetail";
import { OrderData } from "@/model/order";
import { useState } from "react";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { getDiscountedPrice } from "@/utils/calculate";

type Props = {
  order: OrderData;
};

async function cancelOrder(
  paymentKey: string,
  cancelReason: string,
  cancelAmount?: number
) {
  const res = await fetch("/api/cancel", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ paymentKey, cancelReason, cancelAmount }),
  });
  const data = await res.json();
  return data;
}

async function updateOrderStatus(
  itemId: string,
  orderId: string,
  cancelQuantity: number
) {
  const res = await fetch("/api/order", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ itemId, orderId, cancelQuantity }),
  });
  const data = await res.json();
  return data;
}

export default function ConfirmCancelDetail({ order }: Props) {
  const router = useRouter();
  const { selectedItems, cancelReason, cancelReasonDetail, resetState } =
    useCancelStore();
  // console.log("현재 선택된 취소목록", selectedItems);
  const filteredItems = order.items
    .filter((item) => selectedItems[item.id] !== undefined)
    .map((item) => ({
      ...item,
      selectedQuantity: selectedItems[item.id],
    }));

  const productAmount = filteredItems.reduce((acc, cur) => {
    const price =
      getDiscountedPrice(cur.price, cur.products.discountRate) *
      cur.selectedQuantity;
    return (acc = acc + price);
  }, 0);

  async function handleCancelRequestSubmit() {
    try {
      //1. 결제취소로직
      const reason = `${cancelReason} ${
        cancelReasonDetail && ` / ${cancelReasonDetail}`
      }`;
      const cancelAmount =
        order.totalAmount - order.shippingCost === productAmount
          ? order.totalAmount - order.shippingCost
          : productAmount;

      const cancelRes = await cancelOrder(
        order.paymentKey!,
        reason,
        cancelAmount
      );
      // console.log("cancelRes", cancelRes);
      // console.log("취소요청 응답", cancelRes.message);

      const updateResponses = await Promise.all(
        filteredItems.map((item) =>
          updateOrderStatus(item.id, order.id, item.selectedQuantity)
        )
      );

      const failedUpdates = updateResponses.filter(
        (result) => result.status === "rejected"
      );

      if (failedUpdates.length > 0) {
        console.error("업데이트 실패:", failedUpdates);
        throw new Error("주문 상태 업데이트 중 일부가 실패했습니다.");
      }

      // console.log("모든 아이템 상태 업데이트 성공:", updateResponses);
      // TODO: /funnel-step=완료 화면으로 이동
      router.push(`/mypage/my-order/cancel/${order.id}?funnel-step=완료`);
    } catch (error: any) {
      console.error("취소 요청 중 에러 발생:", error.message);

      // TODO: 취소 실패 시 전역 상태 초기화 및 /mypage/my-order/list로 이동
      // router.push("/mypage/my-order/list");
    } finally {
      resetState();
    }
  }

  //TODO: persist 미들웨어 사용하여 새로고침시에도 전역상태 유지하기
  //TODO: price가 결제가격이 아니라 상품가격으로 표시됨 =>수정
  return (
    <div className="flex flex-col">
      <section>
        <h3 className="flex justify-center border-b py-3">상품정보</h3>
        <ul>
          {filteredItems.map((item) => (
            <li key={item.id}>
              <OrderProductDetail item={item} options={item.options} cancel />
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h3 className="flex justify-center text-lg font-bold border-b-[3px] border-black py-2">
          취소 / 환불 정보
        </h3>
        <div className="">
          <div className="w-full">
            <div className="flex border-b py-3 justify-between">
              <span>결제금액</span>
              <span className="font-semibold text-xl">
                {(productAmount + order.shippingCost).toLocaleString()}원
              </span>
            </div>
            <div className="flex justify-between">
              <span>상품금액</span>
              <span>{productAmount.toLocaleString()}원</span>
            </div>
            <div className="flex justify-between">
              <span>배송비</span>
              <span>{order.shippingCost.toLocaleString()}원</span>
            </div>
          </div>
          <div className="bg-neutral-100 w-full">
            <div className="flex justify-between border-b py-3 text-rose-500">
              <span>환불예정금액</span>
              <span className="font-semibold text-xl">
                {order.status === "PENDING" ||
                order.status === "PAID" ||
                order.status === "PREPARING"
                  ? (productAmount + order.shippingCost).toLocaleString()
                  : productAmount.toLocaleString()}
                원
              </span>
            </div>
          </div>
        </div>
      </section>
      {/* TODO:버튼  컴포넌트 재사용성있게 수정하기 */}
      <button
        className="bg-black text-white rounded-md py-2 px-5 hover:bg-neutral-700"
        type="button"
        onClick={handleCancelRequestSubmit}
      >
        취소접수 완료하기
      </button>
    </div>
  );
}
