import { create } from "zustand";

interface CartOption {
  id: string;
  optionItems: { name: string; value: string }[];
  quantity: number;
}

interface CartState {
  cartOptions: CartOption[];
  addOption: (newOption: CartOption) => void;
  updateQuantity: (id: string, delta: number) => void;
  deleteOption: (id: string) => void;
  resetOption: () => void;
}

export const useCartOption = create<CartState>((set) => ({
  cartOptions: [],
  addOption: (newOption: CartOption) =>
    set((state) => {
      const existingOption = state.cartOptions.some(
        (opt) => opt.id === newOption.id
      );
      if (existingOption) {
        return { ...state };
      } else {
        return {
          cartOptions: [...state.cartOptions, newOption],
        };
      }
    }),
  updateQuantity: (id: string, delta: number) =>
    set((state) => ({
      cartOptions: state.cartOptions.map((opt) =>
        opt.id === id
          ? { ...opt, quantity: Math.max(1, opt.quantity + delta) }
          : opt
      ),
    })),
  deleteOption: (id: string) =>
    set((state) => ({
      cartOptions: state.cartOptions.filter((opt) => opt.id !== id),
    })),
  resetOption: () => set(() => ({ cartOptions: [] })),
}));
