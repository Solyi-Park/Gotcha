import { create } from "zustand";

export interface ActiveTab {
  large: string | null;
  medium: string | null;
  small: string | null;
}

interface ActiveTabState {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  resetTab: () => void;
}

export const useMainCategoryStore = create<ActiveTabState>()((set) => ({
  activeTab: {
    large: null,
    medium: null,
    small: null,
  },
  setActiveTab: (tab) => set({ activeTab: tab }),
  resetTab: () =>
    set({
      activeTab: {
        large: null,
        medium: null,
        small: null,
      },
    }),
}));
