import { cancelReasons } from "@/components/CancelReason";
import { create } from "zustand";
interface SelectedItems {
  [itemId: string]: number;
}
interface CancelState {
  selectedItems: SelectedItems;
  cancelReason: string;
  cancelReasonDetail: string;

  setSelectedItems: (selectedItems: SelectedItems) => void;
  addItem: (itemId: string, initialQuantity: number) => void;
  removeItem: (itemId: string) => void;
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
  setSelectedItems: (selectedItems) => set({ selectedItems }),
  addItem: (itemId, initialQuantity) =>
    set((state) => ({
      selectedItems: {
        ...state.selectedItems,
        [itemId]: state.selectedItems[itemId]
          ? state.selectedItems[itemId]
          : initialQuantity,
      },
    })),
  removeItem: (itemId) =>
    set((state) => {
      const updatedItems = { ...state.selectedItems };
      delete updatedItems[itemId];
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
