import { create } from "zustand";

type State = {
  categories: Category[];
};

type Action = {
  updateCategories: (categories: State["categories"]) => void;
};

const useCategoryStore = create<State & Action>((set) => ({
  categories: [],
  updateCategories: (categories) => set(() => ({ categories: categories })),
}));

export default useCategoryStore;
