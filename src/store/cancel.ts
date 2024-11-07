import { cancelReasons } from "@/components/CancelReason";
import { create } from "zustand";

interface CancelState {
  selectedItems: { [productId: string]: number };
  cancelReason: string;
  cancelReasonDetail: string;

  addItem: (productId: string, initialQuantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (
    productId: string,
    delta: number,
    maxQuantity: number
  ) => void;
  resetItems: () => void;

  setCancelReason: (reason: string) => void;
  setCancelReasonDetail: (detail: string) => void;
}

const useCancelStore = create<CancelState>((set) => ({
  selectedItems: {},
  cancelReason: cancelReasons[0],
  cancelReasonDetail: "",
  addItem: (productId, initialQuantity) =>
    set((state) => ({
      selectedItems: {
        ...state.selectedItems,
        [productId]: state.selectedItems[productId]
          ? state.selectedItems[productId]
          : initialQuantity,
      },
    })),
  removeItem: (productId) =>
    set((state) => {
      const updatedItems = { ...state.selectedItems };
      delete updatedItems[productId];
      return { selectedItems: updatedItems };
    }),

  updateQuantity: (productId, delta, maxQuantity) =>
    set((state) => ({
      selectedItems: {
        ...state.selectedItems,
        [productId]: Math.max(
          1,
          Math.min(maxQuantity, state.selectedItems[productId] + delta)
        ),
      },
    })),

  resetItems: () => set({ selectedItems: {} }),

  setCancelReason: (reason) => set({ cancelReason: reason }),
  setCancelReasonDetail: (detail) => set({ cancelReasonDetail: detail }),
}));

export default useCancelStore;
