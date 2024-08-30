type FullProduct = {
  categoryCode: string;
  coupon: string | null;
  createdAt: string;
  deleted: string;
  description: string;
  discountRate: number;
  id: string;
  imageUrls: string[] | null;
  name: string;
  price: number;
  stockQuantity: number;
  thumbnailUrls: string[] | null;
  updatedAt: string;
  likes: number;
};

type SimpleProduct = Pick<
  FullProduct,
  "name" | "price" | "thumbnailUrls" | "likes" | "createdAt" | "discountRate"
>;

type newProduct = Pick<
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
