import { SimpleProduct } from "./product";
// TODO: Cart 타입들도 정리
export type Cart = {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  createdAt: Date;
  updatedAt?: Date | null;
  option: {
    id: string;
    items: CartOptionItem[];
  };
};
export type CartItemRowType = {
  id: string;
  quantity: number;
  option: {
    id: string;
    items: {
      name: string;
      value: string;
    }[];
  };
  product: SimpleProduct;
};

export type CartOptionItem = {
  name: string;
  value: string;
};
