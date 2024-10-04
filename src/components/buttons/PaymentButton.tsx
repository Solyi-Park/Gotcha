"use client";
import { CartItemRowType } from "@/model/cart";
import { FullUser } from "@/model/user";
import { useShippingDetailStore } from "@/store/shippingDetail";
import { TossPaymentsWidgets } from "@tosspayments/tosspayments-sdk";

type Props = {
  ready: boolean;
  widgets: TossPaymentsWidgets | null;
  user: FullUser;
  checkoutItems: CartItemRowType[];
  amount: number;
  shippingCost: number;
};
export default function PaymentButton({
  ready,
  widgets,
  user,
  checkoutItems,
  amount,
  shippingCost,
}: Props) {
  const { shippingDetails, resetAll } = useShippingDetailStore();

  const handler = async () => {
    if (checkoutItems.length === 0) {
      alert("주문할 상품을 선택해주세요!");
      return;
    }

    try {
      if (!widgets) {
        console.error("Widgets not initialized");
        return;
      }
      // 주문정보를 먼저저장. 주문 저장완료후 item정보들 주문 id와함께 각각저장. db 업데이트 완료후 결제요청 api
      const requestData = {
        userId: user.id,
        products: checkoutItems,
        amount,
        shippingDetails,
        shippingCost,
      };

      const orderResponse = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const orderData = await orderResponse.json();
      console.log("orderResult", orderData);

      if (!orderResponse.ok) {
        // 결제 실패 비즈니스 로직을 구현하세요.
        throw new Error(orderData.message || "주문정보 저장 실패");
      }

      resetAll();

      // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
      // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.

      if (orderResponse.ok && widgets && checkoutItems)
        await widgets.requestPayment({
          orderId: orderData.id,
          orderName:
            checkoutItems.length > 1
              ? `${checkoutItems[0].product?.name} 외 ${
                  checkoutItems.length - 1
                }개`
              : checkoutItems[0].product?.name,
          successUrl: window.location.origin + "/success",
          failUrl: window.location.origin + "/fail",
          customerEmail: user.email || "",
          customerName: user.name,
          customerMobilePhone: "01012341234",
        });

      // router.push(`/confirmed/${json.orderId}`);
    } catch (error) {
      console.error("Error requesting payment:", error);
    }
  };

  return (
    <button
      className={`px-5 py-2 bg-black text-white ${
        !ready && "bg-gray-300"
      } rounded`}
      disabled={!ready}
      onClick={handler}
    >
      결제하기
    </button>
  );
}
