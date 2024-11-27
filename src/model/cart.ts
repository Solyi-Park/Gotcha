import { SimpleProduct } from "./product";
// TODO: Cart 타입들도 정리
// export type CartItem = {
//   id: string;
//   userId: string;
//   productId: string;
//   quantity: number;
//   createdAt: Date;
//   updatedAt: Date | null;
//   option: Option;
// };

export type Option = {
  id: string;
  items: CartItemOption[];
};

export type CartItemOption = {
  name: string;
  value: string;
};

// export type NewCartItem = Pick<
//   CartItem,
//   "userId" | "productId" | "quantity" | "option"
// >;

export type CartItemRowType = CartItem & { product: SimpleProduct };

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  option: Option;
}
