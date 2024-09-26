import { SimpleProduct } from "./product";
// TODO: Cart 타입들도 정리
export type CartItem = {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date | null;
  option:
    | {
        id: string;
        items: CartItemOption[];
      }
    | {};
};

export type NewCartItem = Pick<
  CartItem,
  "userId" | "productId" | "quantity" | "option"
>;

export type CartItemRowType = CartItem & { product: SimpleProduct };

export type CartItemOption = {
  name: string;
  value: string;
};
