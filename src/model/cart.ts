export type Cart = {
  id: string;
  userId: string;
  productId: string;
  createdAt: Date;
  updatedAt?: Date | null;
  options: string;
};
