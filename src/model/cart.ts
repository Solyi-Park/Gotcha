import { SimpleProduct } from "./product";
// TODO: Cart 타입들도 정리
export type CartItem = {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date | null;
  option: {
    id: string;
    items: CartOptionItem[];
  };
};
export type CartItemRowType = CartItem & { product: SimpleProduct };
// export type CartItemRow = {
//   id: string;
//   quantity: number;
//   option: {
//     id: string;
//     items: {
//       name: string;
//       value: string;
//     }[];
//   };
//   product: SimpleProduct;
// };

export type CartOptionItem = {
  name: string;
  value: string;
};
