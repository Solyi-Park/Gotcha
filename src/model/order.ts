import { CartItemOption } from "./cart";
import { FullProduct } from "./product";

export type OrderItem = {
  id: string;
  orderId: string;
  productId: string;
  price: number;
  quantity: number;
  options: CartItemOption[];
  status: string; //"Active" | "Canceled" | "Particially-Canceled"
  canceledQuantity: number;
};

export type OrderStatus =
  | "FAILED"
  | "PENDING"
  | "PAID"
  | "PREPARING"
  | "SHIPPED"
  | "IN_TRANSIT"
  | "DELIVERED"
  | "CONFIRMED"
  | "EXCHANGE_REQUESTED"
  | "EXCHANGE_COMPLETED"
  | "RETURN_REQUESTED"
  | "RETURN_COMPLETED"
  | "CANCELED"
  | "PARTICIALLY_CANCELED";

export type CancelStatus = "ACTIVE" | "PARTIALLY_CANCELED" | "CANCELED";
//TODO: 다른 타입도 입력용과 DB에서 받아오는 타입 분리하기.
export type OrderInput = Omit<
  OrderDetails,
  | "id"
  | "createdAt"
  | "updatedAt"
  | "paymentKey"
  | "method"
  | "canceledAt"
  | "cancellationStatus"
>;

export type OrderDetails = {
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  paymentKey: string | null;
  totalAmount: number;
  fullAddress: string;
  status: OrderStatus;
  orderQuantity: number;
  refundReason?: string | null;
  shippingCost: number;
  displayOrderNumber: string;
  method: string;
  canceledAt: Date;
  cancellationStatus: CancelStatus;
} & ShippingDetails;

// 타입수정
export type ShippingDetails = {
  addressTitle?: string;
  recipient: string;
  postCode?: string;
  address?: string;
  addDetail?: string;
  contact1: string;
  contact2: string;
  deliveryNote: string | null;
  customDeliveryNote: string | null;
  isDefault: boolean;
};

export type OrderItemWithProduct = OrderItem & {
  products: FullProduct;
  selectedQuantity?: number; //OrderProductDetail 재사용여부에따라 분리
};

export type OrderData = OrderDetails & {
  userId: string;
  productId: string;
  price: number;
  quantity: number;
  options: CartItemOption[];
  items: OrderItemWithProduct[];
};
