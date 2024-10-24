// shippingDetailStore.ts
import { create } from "zustand";

export interface ShippingDetails {
  addressTitle: string;
  recipient: string;
  postCode: string;
  address: string;
  addDetail: string;
  contact1: string;
  contact2: string;
  deliveryNote: string;
  isDefault: boolean;
  customDeliveryNote: string;
}

interface State {
  shippingDetails: ShippingDetails;
}

interface Action {
  setField: (field: string, value: string | boolean) => void;
  resetAll: () => void;
  resetAddress: () => void;
}

export const useShippingDetailStore = create<State & Action>((set) => ({
  shippingDetails: {
    addressTitle: "",
    recipient: "",
    postCode: "",
    address: "",
    addDetail: "",
    contact1: "",
    contact2: "",
    deliveryNote: "",
    isDefault: false,
    customDeliveryNote: "",
  },

  setField: (field, value) =>
    set((state) => ({
      shippingDetails: { ...state.shippingDetails, [field]: value },
    })),

  resetAll: () =>
    set({
      shippingDetails: {
        addressTitle: "",
        recipient: "",
        postCode: "",
        address: "",
        addDetail: "",
        contact1: "",
        contact2: "",
        deliveryNote: "",
        isDefault: false,
        customDeliveryNote: "",
      },
    }),

  resetAddress: () =>
    set((state) => ({
      shippingDetails: {
        ...state.shippingDetails,
        postCode: "",
        address: "",
        addDetail: "",
      },
    })),
}));
