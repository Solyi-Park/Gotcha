"use client";
import PaymentButton from "@/components/buttons/PaymentButton";
import useCheckout from "@/hooks/checkout";

import {
  loadTossPayments,
  ANONYMOUS,
  TossPaymentsWidgets,
} from "@tosspayments/tosspayments-sdk";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
const customerKey = generateRandomString();

type Amount = {
  currency: string;
  value: number;
};

export default function Payments() {
  const { data: session } = useSession();
  const { checkoutItems, getTotalPrice, getShippingCost } = useCheckout(); // 체크아웃할 아이템들

  const totalAmount = (): number => {
    const totalPrice = getTotalPrice();
    const shippingFee = getShippingCost();
    return totalPrice + shippingFee;
  };
  // console.log("살거", checkoutItems);
  const user = session?.user;
  // console.log("user 금방 업뎃", user);

  const [amount, setAmount] = useState<Amount>({
    currency: "KRW",
    value: totalAmount(),
  });
  const [ready, setReady] = useState(false);
  const [widgets, setWidgets] = useState<TossPaymentsWidgets | null>(null);

  useEffect(() => {
    async function fetchPaymentWidgets() {
      try {
        const tossPayments = await loadTossPayments(clientKey);
        const widgets = tossPayments.widgets({
          customerKey,
        });
        // 비회원 결제
        // const widgets = tossPayments.widgets({ customerKey: ANONYMOUS });

        setWidgets(widgets);
      } catch (error) {
        console.error("Error fetching payment widget:", error);
      }
    }

    fetchPaymentWidgets();
  }, [clientKey, customerKey]);

  useEffect(() => {
    async function renderPaymentWidgets() {
      if (widgets == null) {
        return;
      }

      // ------  주문서의 결제 금액 설정 ------
      // TODO: 위젯의 결제금액을 결제하려는 금액으로 초기화하세요.
      // TODO: renderPaymentMethods, renderAgreement, requestPayment 보다 반드시 선행되어야 합니다.
      await widgets.setAmount(amount);

      await widgets.renderPaymentMethods({
        selector: "#payment-method",
        variantKey: "DEFAULT",
      });
      // console.log("renderPaymentMethods");
      await widgets.renderAgreement({
        selector: "#agreement",
        variantKey: "AGREEMENT",
      });

      setReady(true);
    }

    renderPaymentWidgets();
  }, [widgets]);

  return (
    <div className=" wrapper py-3">
      <div className="box_section">
        {/* 결제 UI */}
        <div id="payment-method" />
        {/* 이용약관 UI */}
        <div id="agreement" />
        {/* 버튼은 나중에 다른데로 보낼거임. 그리고 loadTossPayments 로직 훅으로생성 */}
        <div className="flex justify-center">
          <PaymentButton
            ready={ready}
            widgets={widgets}
            user={user}
            checkoutItems={checkoutItems}
            amount={getTotalPrice()}
            shippingCost={getShippingCost()}
          />
        </div>
      </div>
    </div>
  );
}

function generateRandomString() {
  if (typeof window !== "undefined") {
    const randomString = window.btoa(Math.random().toString()).slice(0, 20);
    // console.log("randomString", randomString);
    return randomString;
  }
  return "";
}
