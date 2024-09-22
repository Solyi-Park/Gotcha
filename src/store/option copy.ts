import { create } from "zustand";

export interface CartOption {
  name: string;
  value: string;
  quantity: number;
}

interface CartOptionState {
  cartOptions: CartOption[];
  addCartOption: (option: CartOption) => void;
  updateCartOption: (name: string, value: string, quantity: number) => void;
  removeCartOption: (name: string, value: string) => void;
  resetCartOptions: () => void;
}

export const useCartOption = create<CartOptionState>((set) => ({
  cartOptions: [],

  addCartOption: (newOption) =>
    set((state) => {
      const existingOption = state.cartOptions.find(
        (opt) => opt.name === newOption.name && opt.value === newOption.value
      );
      if (existingOption) {
        alert("이미 추가된 옵션입니다.");
        return {
          cartOptions: state.cartOptions,
        };
      } else {
        return { cartOptions: [...state.cartOptions, newOption] };
      }
    }),

  updateCartOption: (name, value, quantity) =>
    set((state) => ({
      cartOptions: state.cartOptions.map((opt) =>
        opt.name === name && opt.value === value
          ? { ...opt, quantity: Math.max(1, quantity) }
          : opt
      ),
    })),

  removeCartOption: (name, value) =>
    set((state) => ({
      cartOptions: state.cartOptions.filter(
        (opt) => !(opt.name === name && opt.value === value)
      ),
    })),

  resetCartOptions: () => set({ cartOptions: [] }),
}));
