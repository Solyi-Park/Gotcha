"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type CategoryContextType = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const CategoryContext = createContext<CategoryContextType | "">("");

export function useCategory() {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }
  return context;
}

export function CategoryProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<string>("all");

  return (
    <CategoryContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </CategoryContext.Provider>
  );
}
