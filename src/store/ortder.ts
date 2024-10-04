import { create } from "zustand";

interface OrderData {
  paymentKey: string;
  orderIf: string;
  amount: number;
}

interface OrderState {
  orderData: OrderData | null;
  setOrderData: (data: OrderData) => void;
  resetOrderData: () => void;
}

const useOrderStore = create<OrderState>((set) => ({
  orderData: null,
  setOrderData: (data) => set({ orderData: data }),
  resetOrderData: () => set({ orderData: null }),
}));

export default useOrderStore;
