import { supabase } from "@/app/lib/supabaseClient";
import { CartItemRowType } from "@/model/cart";
import {
  OrderData,
  OrderDetails,
  OrderInput,
  OrderItem,
  OrderStatus,
  ShippingDetails,
} from "@/model/order";
import { updateAddress } from "./address";
import { FullProduct } from "@/model/product";

export async function saveOrderInfo(
  userId: string,
  products: CartItemRowType[],
  amount: number,
  shippingCost: number,
  shippingDetails: ShippingDetails
) {
  console.log("shippingDetails", shippingDetails);
  //주소정보 저장
  if (shippingDetails.isDefault) {
    await updateAddress(userId, {
      postCode: shippingDetails.postCode ?? "",
      address: shippingDetails.address ?? "",
      addDetail: shippingDetails.addDetail ?? "",
      default: shippingDetails.isDefault,
      name: shippingDetails.recipient,
      contact: shippingDetails.contact1,
      title: shippingDetails.addressTitle ?? "",
    });
  }

  const fullAddress = `${shippingDetails.postCode} ${shippingDetails.address} ${
    shippingDetails.addDetail ? shippingDetails.addDetail : ""
  }`;
  const orderQuantity = products.reduce((acc, item) => {
    return (acc += item.quantity);
  }, 0);
  //TODO:input 타입들 분리하기, Pick OR Omit
  const newOrder: OrderInput = {
    userId,
    status: "PENDING",
    totalAmount: amount + shippingCost, // 배송비 분리?
    recipient: shippingDetails.recipient,
    fullAddress,
    contact1: shippingDetails.contact1,
    orderQuantity,
    contact2: shippingDetails.contact2 ?? "",
    shippingCost,
    deliveryNote: shippingDetails.deliveryNote,
    customDeliveryNote: shippingDetails.customDeliveryNote,
    isDefault: shippingDetails.isDefault ?? false,
    displayOrderNumber: generateDisplayOrderNumber(new Date()),
  };
  // console.log("newOrder", newOrder);
  // TODO: 똑같은 상품정보가 있는경우 저장하지 않아야함. ==>
  const { data: orderResult, error } = await supabase
    .from("orders")
    .insert(newOrder)
    .select();

  console.log("orderResult", orderResult);

  if (error) {
    console.error("Error saving order information for user:", userId, error);
    return null;
  }
  //나중에 리턴값 없애기
  // console.log("product의 옵션", products[0].option);
  const orderItemsResult = await saveOrderItems(orderResult[0].id, products);

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
    options: item.option.items, // 빈배열로할때는 작동함.,
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
    console.log("주문 상품 데이터 저장완료! 주문한상품들:", data);
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
      .eq("id", orderId)
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
  status: OrderStatus
) {
  const { data, error } = await supabase
    .from("orders")
    .update({ status, paymentKey })
    .eq("id", orderId)
    .select();

  if (error) {
    console.error(`Error updating order:`, error.message);
    return null;
  }

  // 데이터가 없거나 배열이 비어 있으면 null 반환
  if (!data || data.length === 0) {
    console.error(`No order found with ID: ${orderId}`);
    return null;
  }
  console.log("업데이트된 주문 정보 =>", data);

  return data[0];
}

export async function cancelOrderItem(
  itemId: string,
  orderId: string,
  cancelQuantity: number
) {
  const { data: orderItem, error: itemError } = await supabase
    .from("orderItems")
    .select()
    .eq("id", itemId)
    .eq("orderId", orderId)
    .single();

  if (itemError) throw new Error(itemError.message);
  if (!orderItem) throw new Error("주문 상품을 찾을 수 없습니다.");

  const remainingQuantity = orderItem.quantity - orderItem.canceluantity;
  if (cancelQuantity > remainingQuantity) {
    throw new Error("취소 수량이 남은 수량보다 많습니다.");
  }

  const newCanceledQuantity = orderItem.canceledQuantity + cancelQuantity;
  const newStatus =
    newCanceledQuantity === orderItem.quantity
      ? "CANCELED"
      : "PARTICIALLY_CANCELED";

  const { error: updateError } = await supabase
    .from("orderItems")
    .update({
      canceledQuantity: newCanceledQuantity,
      status: newStatus,
    })
    .eq("id", itemId);

  if (updateError) throw new Error(updateError.message);

  const res = await updateOrderStatus(orderId);
  // if (res) console.log("오더상태 수정 결과:", res);
  return res;
}
//여기: 취소수량 업데이트가 이상함.
export async function updateOrderStatus(orderId: string) {
  const { data: items, error: itemsError } = await supabase
    .from("orderItems")
    .select("status")
    .eq("orderId", orderId);

  if (itemsError) throw itemsError;

  type Order = {
    status: string;
  };

  console.log("요아이템들 중에 업데이트 할겨, items:", items);
  const allCanceled = items.every((item) => item.status === "CANCELED");
  const partiallyCanceled = items.some(
    (item) =>
      item.status === "PARTICIALLY_CANCELED" || item.status === "CANCELED"
  );

  let newCancellationStatus = "NONE";

  if (allCanceled) {
    newCancellationStatus = "CANCELED";
  } else if (partiallyCanceled) {
    newCancellationStatus = "PARTIALLY_CANCELED";
  }

  const { data: updatedOrder, error: updateError } = await supabase
    .from("orders")
    .update({
      cancellationStatus: newCancellationStatus,
    })
    .eq("id", orderId)
    .select();

  if (updateError) throw updateError;

  if (!updatedOrder) {
    console.error(`No updated order found with ID: ${orderId}`);
    return null;
  }
  console.log("updatedOrder", updatedOrder);
  return updatedOrder;
}

export async function getOrderDataByOrderId(orderId: string) {
  const { data: order, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", orderId)
    .returns<OrderDetails[]>();

  if (error) {
    console.error(
      `Error fetching an order data with ID: ${orderId}. Error:`,
      error
    );
  }

  if (!order || order.length === 0) {
    console.error(`No order found with ID: ${orderId}`);
    return null;
  }

  const items = await getOrderItemsByOrderId(orderId);
  if (items)
    return {
      ...order[0],
      items,
    };

  return null;
}

export async function getOrderDataByUserId(userId: string) {
  const { data: orders, error } = await supabase
    .from("orders")
    .select()
    .eq("userId", userId)
    .order("createdAt", { ascending: false });

  if (error) {
    // throw new Error(`Error fetching an order with user ID: ${userId}`);
    console.error(error);
  }

  if (!orders || orders.length === 0) {
    console.error(`No order found with  userID: ${userId}`);
    return [];
  }

  const ordersWithItems = await Promise.all(
    orders.map(async (order) => {
      const items = await getOrderItemsByOrderId(order.id);
      return {
        ...order,
        items,
      } as OrderData;
    })
  );

  return ordersWithItems && ordersWithItems;
}

export type ItemData = OrderItem & {
  products: FullProduct;
};

//TODO: productId로 다시 product 데이터 받는 부분 찾아서 수정
export async function getOrderItemsByOrderId(orderId: string) {
  const { data, error } = await supabase
    .from("orderItems")
    .select("*, products(*)")
    .eq("orderId", orderId);

  // console.log("data가 있나유", data);
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
  const items: ItemData[] = data.map((item) => ({
    ...item,
    productData: item.products,
  }));
  // console.log("items", items);
  return items;
}

//TODO: Error를 throw해야하는 곳과 console.error처리하는 부분 구분
//TODO: 비즈니스 로직들의 Return Type 정의

export function generateDisplayOrderNumber(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const randomPart = String(Math.floor(10000000 + Math.random() * 90000000));
  return `ORD${year}${month}${day}-${randomPart}`;
}
