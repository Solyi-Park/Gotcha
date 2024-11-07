import { CartItemOption } from "./cart";
import { FullProduct } from "./product";

export type OrderItem = {
  id: string;
  userId: string;
  productId: string;
  price: number;
  quantity: number;
  options: CartItemOption[];
};

export type OrderStatus =
  | "Failed"
  | "Pending"
  | "Paid"
  | "Preparing"
  | "Shipped"
  | "InTransit"
  | "Delivered"
  | "Confirmed"
  | "ExchangeRequested"
  | "ExchangeCompleted"
  | "ReturnRequested"
  | "ReturnCompleted"
  | "Cancelled";

export type OrderDetails = {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  userId: string;
  paymentKey?: string | null;
  totalAmount: number;
  fullAddress: string;
  status: OrderStatus;
  orderQuantity: number;
  refundReason?: string | null;
  shippingCost: number;
  displayOrderNumber: string;
  method?: string;
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

export type OrderDataReturnType = OrderDetails & {
  userId: string;
  productId: string;
  price: number;
  quantity: number;
  options: CartItemOption[];
  items: (OrderItem & {
    products: FullProduct;
  })[];
};
