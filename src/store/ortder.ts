import { OrderDetails } from "@/model/order";
import { create } from "zustand";

interface OrderState {
  orderData: OrderDetails | null;
  setOrderData: (data: OrderDetails) => void;
  resetOrderData: () => void;
}

const useOrderStore = create<OrderState>((set) => ({
  orderData: null,
  setOrderData: (data) => set({ orderData: data }),
  resetOrderData: () => set({ orderData: null }),
}));

export default useOrderStore;
