"use client";

import { MouseEvent, useState } from "react";
import AdressTabButton from "./AdressTabButton";

export default function AddressTabs() {
  const [activeTab, setActiveTab] = useState("기존배송지");
  const handleActiveTab = (e: MouseEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.getAttribute("data-value");
    if (value) setActiveTab(value);
  };

  return (
    <div className="w-96">
      <AdressTabButton
        activeTab={activeTab}
        title="기존배송지"
        onClick={handleActiveTab}
      />
      <AdressTabButton
        activeTab={activeTab}
        title="신규입력"
        onClick={handleActiveTab}
      />
    </div>
  );
}
