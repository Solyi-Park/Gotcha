import { create } from "zustand";

interface Option {
  name: string;
  value: string;
}

interface OptionState {
  cartOptions: Option[];
  quantity: number;
  setCartOptions: (option: Option) => void;
  resetOptions: () => void;
}

export const useOption = create<OptionState>((set) => ({
  cartOptions: [],
  setCartOptions: (newOption: Option) =>
    set((state) => ({
      cartOptions: state.cartOptions.some((opt) => opt.name === newOption.name)
        ? state.cartOptions.map((opt) =>
            opt.name === newOption.name ? newOption : opt
          )
        : [...state.cartOptions, newOption],
    })),
  resetOptions: () =>
    set({
      cartOptions: [],
    }),
}));
