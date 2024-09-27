import { create } from "zustand";

interface AddressState {
  postalCode: string;
  fullAddress: string;
  addressDetail: string;

  setPostalCode: (code: string) => void;
  setFullAddress: (addr: string) => void;
  setAddressDetail: (addDetail: string) => void;

  resetPosalCode: () => void;
  resetFullAddress: () => void;
  resetAddressDetail: () => void;
}

export const useAddress = create<AddressState>((set) => ({
  postalCode: "",
  fullAddress: "",
  addressDetail: "",

  setPostalCode: (code) => set({ postalCode: code }),
  setFullAddress: (addr) => set({ fullAddress: addr }),
  setAddressDetail: (addDetail) => set({ addressDetail: addDetail }),

  resetPosalCode: () => set({ postalCode: "" }),
  resetFullAddress: () => set({ fullAddress: "" }),
  resetAddressDetail: () => set({ addressDetail: "" }),
}));
