import { supabase } from "@/app/lib/supabaseClient";
import { CartItemRowType } from "@/model/cart";
import { OrderDetails, ShippingDetails } from "@/model/order";
import { v4 as uuid } from "uuid";

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
  console.log("[payment result]", result);

  if (!response.ok) {
    throw new Error(result.message || "Payment confirmation failed");
  }
  const payment: Payment = {
    paymentKey: result.paymentKey,
    orderId: result.orderId,
    method: result.method,
    approvedAt: result.approvedAt,
    orderName: result.orderName,
    totalAmount: result.totalAmount,
    card: result.card,
    transfer: result.transfer,
    easyPay: result.easyPay,
    receipt: result.receipt.url,
  };
  //페이먼트 저장하고
  const res = await savePaymentResult(payment);
  console.log("savePaymentResult response???", res);

  return result;
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

type Payment = {
  paymentKey: string;
  orderId: string;
  method: "카드" | "간편결제" | "계좌이체";
  card: string | null;
  easyPay: {
    provider: string;
  } | null;
  transfer: string | null;
  approvedAt: string;
  orderName: string;
  totalAmount: number;
  receipt: string;
  // status:
  //   | "READY"
  //   | "IN_PROGRESS"
  //   | "WAITING_FOR_DEPOSIT"
  //   | "DONE"
  //   | "CANCELED"
  //   | "PARTIAL_CANCELED"
  //   | "ABORTED"
  //   | "EXPIRED";
};

export const savePaymentResult = async (
  payment: Payment
): Promise<Payment | null> => {
  const { data, error } = await supabase
    .from("payments")
    .insert(payment)
    .select();

  if (error) {
    console.log("Error saving a payment result.", error);
  }

  if (data) {
    return data[0] as Payment;
  }
  return null;
};

export const saveOrderInfo = async (
  userId: string,
  products: CartItemRowType[],
  amount: number,
  shippingCost: number,
  shippingDetails: ShippingDetails
) => {
  const fullAddress = `${shippingDetails.postCode} ${shippingDetails.address} ${
    shippingDetails.addDetail ? shippingDetails.addDetail : ""
  }`;
  // console.log("products", products);
  const newOrder: OrderDetails = {
    userId,
    totalAmount: amount,
    recipient: shippingDetails.recipient,
    fullAddress,
    contact1: shippingDetails.contact1,
    orderQuantity: products.reduce((acc, item) => {
      return (acc += item.quantity);
    }, 0),
    contact2: shippingDetails.contact2 ? shippingDetails.contact2 : null,
    shippingCost,
    deliveryNote: shippingDetails.deliveryNote,
    customDeliveryNote: shippingDetails.customDeliveryNote,
    isDefault: shippingDetails.isDefault ?? false,
  };
  console.log("newOrder", newOrder);
  const { data, error } = await supabase
    .from("orders")
    .insert(newOrder)
    .select();

  if (error) {
    console.log("Error saving an order info.", error);
    return null;
  }

  return data ? data[0] : null;
};
