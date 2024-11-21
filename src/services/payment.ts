import { supabase } from "@/app/lib/supabaseClient";
import { getOrderDataByOrderId, updateOrderInfo } from "./order";
import { Cancel, CancelResult, Payment, PaymentInput } from "@/model/payment";

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

  const payment: PaymentInput = {
    paymentKey: result.paymentKey,
    orderId: result.orderId,
    method: result.method,
    approvedAt: result.approvedAt,
    orderName: result.orderName,
    totalAmount: result.totalAmount,
    card: (result.card && result.card.acquirerCode) || null,
    transfer: (result.transfer && result.transfer.bankCode) || null,
    easyPay: (result.easyPay && result.easyPay.provider) || null,
    receipt: result.receipt.url,
    status: result.status,
  };

  const paymentSaveResult = await savePaymentResult(payment);
  console.log("paymentSave 결과", paymentSaveResult);

  const updatedOrderinfo = await updateOrderInfo(orderId, paymentKey, "PAID");
  console.log("updatedOrderinfo", updatedOrderinfo);

  return paymentSaveResult;
}

export const getPaymentDetails = async (paymentKey: string) => {
  const response = await fetch(
    `https://api.tosspayments.com/v1/payments/${paymentKey}`,
    {
      method: "GET",
      headers: {
        Authorization: getAuthHeader(),
      },
    }
  );

  const result = await response.json();
  console.log("getPaymentDetails", result);

  if (!response.ok) {
    throw new Error(result.message || "Failed to retrieve payment details");
  }

  return result;
};

export const savePaymentResult = async (
  payment: PaymentInput
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
  const data = await getOrderDataByOrderId(orderId);

  if (data && data.id !== orderId) {
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

export const cancelPayment = async (
  paymentKey: string,
  cancelReason: string,
  cancelAmount?: number
) => {
  const response = await fetch(
    `https://api.tosspayments.com/v1/payments/${paymentKey}/cancel`,
    {
      method: "POST",
      headers: {
        Authorization: getAuthHeader(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cancelReason,
        ...(cancelAmount && { cancelAmount }),
      }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Failed to cancel payment:", errorData);
    throw new Error(
      `Failed to cancel payment: ${response.status} ${response.statusText}`
    );
  }

  const result = await response.json();
  console.log("결제취소결과:", result);

  if (!result.cancels || result.cancels.length === 0) {
    throw new Error("Invalid response: 'cancels' data is missing.");
  }
  const cancels: Cancel[] = result.cancels.map(
    (canceledItem: CancelResult) => ({
      ...canceledItem,
      paymentKey: result.paymentKey,
    })
  );
  const updatedPayment = await saveCancelResult(result.paymentKey, cancels);
  // if (updatedPayment) console.log("페이먼트 업데이트 결과", updatedPayment);
  return updatedPayment;
};

export async function saveCancelResult(
  paymentKey: string,
  cancelResults: Cancel[]
) {
  console.log("저장할 취소 데이터:", cancelResults);
  const cancelData = await getCancelDataByPaymentKey(paymentKey);

  const filteredCancels = cancelResults.filter(
    (cancel) =>
      !cancelData?.some((item) => item.transactionKey === cancel.transactionKey)
  );
  try {
    const { data: updatedCancels, error: updatedCancelsError } = await supabase
      .from("cancels")
      .insert(filteredCancels)
      .select();

    if (updatedCancelsError) {
      console.error(
        "취소 데이터 저장 중 오류 발생:",
        updatedCancelsError.message
      );
      throw new Error(
        `Error updating cancel data: ${updatedCancelsError.message}`
      );
    }

    console.log("업데이트된 취소 데이터:", updatedCancels);
    return updatedCancels;
  } catch (error: any) {
    console.error("Error saving cancel result:", error.message);
    throw error;
  }
}

export async function getCancelDataByPaymentKey(paymentKey: string) {
  const { data, error } = await supabase
    .from("cancels")
    .select()
    .eq("paymentKey", paymentKey);
  if (error) {
    throw new Error(`Error fetching cancel data: ${error.message}`);
  }
  return data;
}

export async function getPayment(paymentKey: string): Promise<Payment | null> {
  console.log("결제키", paymentKey);
  const { data, error } = await supabase
    .from("payments")
    .select()
    .eq("paymentKey", paymentKey)
    .single();
  if (error) {
    throw new Error(error.message);
  }
  if (data) {
    console.log("결제정보>>>", data);
    return data;
  }
  return null;
}
