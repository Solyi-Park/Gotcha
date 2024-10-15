import { FullProduct } from "@/model/product";
import create from "zustand";

interface LikedProductsState {
  products: FullProduct[];
  setProducts: (products: FullProduct[]) => void;
  clearProducts: () => void;
}

export const useLikedProductsStore = create<LikedProductsState>((set) => ({
  products: [],
  setProducts: (products) => set({ products: products }),
  clearProducts: () => set({ products: [] }),
}));
