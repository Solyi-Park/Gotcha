import { CartItemOption } from "./cart";

export type ProductOption = {
  name: string;
  items: { value: string }[];
};

export type FullProduct = {
  categoryCode: number;
  coupon: string | null;
  createdAt: string;
  deleted: string;
  description: string;
  discountRate: number;
  id: string;
  imageUrls: string[];
  name: string;
  price: number;
  stockQuantity: number;
  thumbnailUrls: string[];
  updatedAt: string;
  options: CartItemOption[];
  tags: string[];
  likeCount: number;
  likes: string[];
};

export type SimpleProduct = Pick<
  FullProduct,
  | "name"
  | "price"
  | "thumbnailUrls"
  | "createdAt"
  | "discountRate"
  | "id"
  | "likeCount"
  | "likes"
  | "description"
>;

export type ProductForCart = Pick<
  FullProduct,
  "name" | "price" | "thumbnailUrls" | "discountRate" | "id"
>;

export type newProduct = Pick<
  FullProduct,
  | "name"
  | "description"
  | "price"
  | "discountRate"
  | "stockQuantity"
  | "categoryCode"
  | "imageUrls"
  | "thumbnailUrls"
>;
