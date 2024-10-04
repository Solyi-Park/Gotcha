import { CartItemOption } from "./cart";

export type OrderItem = {
  userId: string;
  productId: string;
  price: number;
  quantity: number;
  options: CartItemOption[];
};

export type OrderDetails = {
  userId: string;
  paymentKey?: string | null;
  totalAmount: number;
  fullAddress: string;
  status?: string;
  orderQuantity: number;
  refundReason?: string | null;
  shippingCost: number;
} & ShippingDetails;

// 타입수정
export type ShippingDetails = {
  addressTitle?: string;
  recipient: string;
  postCode?: string;
  address?: string;
  addDetail?: string;
  contact1: string;
  contact2?: string | null;
  deliveryNote: string;
  customDeliveryNote: string | null;
  isDefault?: boolean;
};
