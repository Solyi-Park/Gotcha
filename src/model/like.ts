export type Like = {
  id: string;
  userId: string;
  productId: string;
  createdAt: Date;
};

export type Liked = {
  status: boolean;
};
