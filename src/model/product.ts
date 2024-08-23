type FullProduct = {
  categoryCode: string;
  coupon: string | null;
  createdAt: string;
  deleted: string;
  description: string;
  discoutRate: number;
  id: string;
  imageUrls: string[] | null;
  name: string;
  price: number;
  stockQuantity: number;
  thumbnailUrls: string[] | null;
  updatedAt: string;
};

type newProduct = Pick<
  FullProduct,
  | "name"
  | "description"
  | "price"
  | "discoutRate"
  | "stockQuantity"
  | "categoryCode"
  | "imageUrls"
  | "thumbnailUrls"
>;
