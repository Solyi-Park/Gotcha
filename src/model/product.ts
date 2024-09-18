import { Option } from "@/components/forms/NewProductForm";

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
  likes: string[];
  options: Option[];
  tags: string[];
  likeCount?: number;
};

export type SimpleProduct = Pick<
  FullProduct,
  | "name"
  | "price"
  | "thumbnailUrls"
  | "likes"
  | "createdAt"
  | "discountRate"
  | "id"
  | "likeCount"
  | "description"
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
