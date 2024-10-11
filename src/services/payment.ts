import { supabase } from "@/app/lib/supabaseClient";
import { getOrderData, updateOrderInfo } from "./order";
import { Payment } from "@/model/payment";

function getAuthHeader() {
  return `Basic ${Buffer.from(`${process.env.WIDGET_SECRET_KEY}:`).toString(
    "base64"
  )}`;
}

export async function confirmPayment(
  paymentKey: string,
  orderId: string,
  amount: number
) {
  const response = await fetch(
    "https://api.tosspayments.com/v1/payments/confirm",
    {
      method: "POST",
      headers: {
        Authorization: getAuthHeader(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ paymentKey, orderId, amount }),
    }
  );

  const result = await response.json();
  if (!response.ok) {
    console.error("결제 확인 실패:", result);
    // throw new Error(result.message || "Payment confirmation failed");
  }
  console.log("[payment result]", result);

  const data = await validatePayment(orderId, paymentKey, amount);
  console.log("validatePayment 결과:", data); // 추가 로그

  console.log("paymentKey 확인", paymentKey);
  const payment: Payment = {
    paymentKey: result.paymentKey,
    orderId: result.orderId,
    method: result.method,
    approvedAt: result.approvedAt,
    orderName: result.orderName,
    totalAmount: result.totalAmount,
    card: (result.card && result.card.acquirerCode) || null,
    transfer: (result.transfer && result.transfer.bankCode) || null,
    easyPay: (result.easyPay && result.easyPay.provider) || null,
    receipt: result.receipt,
    status: result.status,
  };

  const paymentSaveResult = await savePaymentResult(payment);
  console.log("paymentSave 결과", paymentSaveResult);

  const updatedOrderinfo = await updateOrderInfo(orderId, paymentKey, "PAID");
  console.log("updatedOrderinfo", updatedOrderinfo);

  return paymentSaveResult;
}

export const getPaymentDetails = async (orderId: string) => {
  const response = await fetch(
    `https://api.tosspayments.com/v1/payments/orders/${orderId}`,
    {
      method: "GET",
      headers: {
        Authorization: getAuthHeader(),
      },
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to retrieve payment details");
  }

  return result;
};

export const cancelPayment = async (
  paymentKey: string,
  cancelReason: string
) => {
  const response = await fetch(
    `https://api.tosspayments.com/v1/payments/${paymentKey}/cancel`,
    {
      method: "POST",
      headers: {
        Authorization: getAuthHeader(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cancelReason }),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to cancel payment");
  }

  return result;
};

export const savePaymentResult = async (
  payment: Payment
): Promise<Payment | null> => {
  const { data, error } = await supabase
    .from("payments")
    .insert(payment)
    .select();

  if (error) {
    throw new Error("Error saving a payment result:" + error.message);
  }

  if (!data || data.length === 0) {
    throw new Error("No payment data returned.");
  }

  return data[0] as Payment;
};

export async function validatePayment(
  orderId: string,
  paymentKey: string,
  amount: number
) {
  const data = await getOrderData(orderId);

  if (data && data.orderId !== orderId) {
    await updateOrderInfo(orderId, paymentKey, "FAILED");
    throw new Error("Order not found");
    // console.error("Order not found");
  }

  if (data && data?.totalAmount !== amount) {
    await updateOrderInfo(orderId, paymentKey, "FAILED");
    throw new Error("Payment amount mismatch");
    // console.error("Payment amount mismatch");
  }

  return data;
}
