import { supabase } from "@/app/lib/supabaseClient";
import { CartItemRowType } from "@/model/cart";
import { OrderDetails, OrderItem, ShippingDetails } from "@/model/order";

export async function saveOrderInfo(
  userId: string,
  products: CartItemRowType[],
  amount: number,
  shippingCost: number,
  shippingDetails: ShippingDetails
) {
  const fullAddress = `${shippingDetails.postCode} ${shippingDetails.address} ${
    shippingDetails.addDetail ? shippingDetails.addDetail : ""
  }`;

  const newOrder: OrderDetails = {
    userId,
    totalAmount: amount + shippingCost, // 배송비 분리?
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
    displayOrderNumber: generateDisplayOrderNumber(new Date()),
  };
  console.log("newOrder", newOrder);

  const { data: orderResult, error } = await supabase
    .from("orders")
    .insert(newOrder)
    .select();

  console.log("orderResult", orderResult);

  if (error) {
    console.error("Error saving order information for user:", userId, error);
    return null;
  }
  //나중에 리턴갑 없애기
  const orderItemsResult = await saveOrderItems(
    orderResult[0].orderId,
    products
  );

  if (orderResult && orderItemsResult) {
    const response = {
      ...orderResult[0],
      items: orderItemsResult,
    };
    console.log("주문정보 저장 완료!");
    return response;
  }
  return null;
}

export async function saveOrderItems(
  orderId: string,
  items: CartItemRowType[]
) {
  const orderItems = items.map((item) => ({
    orderId,
    productId: item.productId,
    price: item.product.price,
    quantity: item.quantity,
    option: item.option.items,
  }));
  const { data, error } = await supabase
    .from("orderItems")
    .insert(orderItems)
    .select();

  if (error) {
    console.error(`Error saving order items for orderId: ${orderId}`, error);
    return null;
  }

  if (data) {
    console.log("주문 상품 데이터 저장완료!");
    return data;
  }
  return null;
}

export async function deleteOrderItems(orderId: string) {
  const { data, error } = await supabase
    .from("orderItems")
    .delete()
    .eq("orderId", orderId)
    .select();

  if (error) {
    console.error(`Error deleting order items for orderId: ${orderId}`, error);
    return null;
  }
  // 데이터가 없거나 배열이 비어 있으면 null 반환
  if (!data || data.length === 0) {
    console.error(`No order found with ID: ${orderId}`);
    return null;
  }

  return data;
}

export async function deleteOrderInfo(orderId: string) {
  console.log("order 삭제호출");
  const itemsRes = await deleteOrderItems(orderId);
  if (itemsRes) {
    const { data, error } = await supabase
      .from("orders")
      .delete()
      .eq("orderId", orderId)
      .select();

    if (error) {
      console.error(`Error deleting order with ID: ${orderId}. Error:`, error);
      return null;
    }

    // 데이터가 없거나 배열이 비어 있으면 null 반환
    if (!data || data.length === 0) {
      console.error(`No order found with ID: ${orderId}`);
      return null;
    }
    return data;
  }
}

export async function updateOrderInfo(
  orderId: string,
  paymentKey: string,
  status: "PAID" | "FAILED"
) {
  const { data, error } = await supabase
    .from("orders")
    .update({ status, paymentKey })
    .eq("orderId", orderId)
    .select();

  if (error) {
    console.error(`Error updating order:`, error);
    return null;
  }

  // 데이터가 없거나 배열이 비어 있으면 null 반환
  if (!data || data.length === 0) {
    console.error(`No order found with ID: ${orderId}`);
    return null;
  }

  console.log("주문정보 수정 완료! 상태:", status);
  return data[0];
}

export async function getOrderData(orderId: string) {
  const { data, error } = await supabase
    .from("orders")
    .select()
    .eq("orderId", orderId);

  if (error) {
    console.error(
      `Error fetching an order data with ID: ${orderId}. Error:`,
      error
    );
  }
  // 데이터가 없거나 배열이 비어 있으면 null 반환
  if (!data || data.length === 0) {
    console.error(`No order found with ID: ${orderId}`);
    return null;
  }

  return data[0] as OrderDetails;
}

export async function getOrderItems(orderId: string) {
  const { data, error } = await supabase
    .from("orderItems")
    .select()
    .eq("orderId", orderId);

  console.log("data가 있나유", data);
  if (error) {
    // throw new Error(`Error fetching an order items: ${orderId}`);
    console.error(error);
  }

  // 데이터가 없거나 배열이 비어 있으면 null 반환
  if (!data || data.length === 0) {
    // throw new Error(
    //   `Order ID '${orderId}'와 일치하는 데이터를 찾을 수 없습니다.`
    // );
    console.error(`No order found with ID: ${orderId}`);
    return null;
  }

  return data as OrderItem[];
}

export function generateDisplayOrderNumber(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth()).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const randomPart = String(Math.floor(10000000 + Math.random() * 90000000));
  return `ORD${year}${month}${day}-${randomPart}`;
}