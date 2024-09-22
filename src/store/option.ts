import { create } from "zustand";

const example = [
  {
    options: [
      {
        name: "color",
        value: "black",
      },
      {
        name: "size",
        value: "s",
      },
    ],
    quantity: 1,
  },
  {
    options: [
      {
        name: "color",
        value: "red",
      },
      {
        name: "size",
        value: "m",
      },
    ],
    quantity: 2,
  },
];

const resultIWant = ["black", "s"];
const example2 = example.map((item) => {
  return {
    options: item.options.reduce((acc: string[], opt) => {
      acc = [...acc, opt.value];
      return acc;
    }, []),
    quantity: item.quantity,
  };
});

interface CartOption {
  id: string;
  options: string[];
  quantity: number;
}

interface CartState {
  cartOptions: CartOption[];
  addOption: (option: CartOption) => void;
  updateQuantity: (id: string, delta: number) => void;
  deleteOption: (id: string) => void;
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
}));
