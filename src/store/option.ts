import { create } from "zustand";

interface ProductOption {
  id: string;
  items: { name: string; value: string }[];
  quantity: number;
}

interface CartState {
  productOptions: ProductOption[];
  addOption: (newOption: ProductOption) => void;
  updateQuantity: (id: string, delta: number) => void;
  deleteOption: (id: string) => void;
  resetOption: () => void;
}

export const useProductOption = create<CartState>((set) => ({
  productOptions: [],
  addOption: (newOption: ProductOption) =>
    set((state) => {
      const existingOption = state.productOptions.some(
        (opt) => opt.id === newOption.id
      );
      if (existingOption) {
        return { ...state };
      } else {
        return {
          productOptions: [...state.productOptions, newOption],
        };
      }
    }),
  updateQuantity: (id: string, delta: number) =>
    set((state) => ({
      productOptions: state.productOptions.map((opt) =>
        opt.id === id
          ? { ...opt, quantity: Math.max(1, opt.quantity + delta) }
          : opt
      ),
    })),
  deleteOption: (id: string) =>
    set((state) => ({
      productOptions: state.productOptions.filter((opt) => opt.id !== id),
    })),
  resetOption: () => set(() => ({ productOptions: [] })),
}));
