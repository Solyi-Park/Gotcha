"use client";
import { MouseEvent, useState } from "react";

const ADDRESS_TAB = ["기존배송지", "신규입력"];

export default function AddressTabs() {
  const [activeTab, setActiveTab] = useState("기존배송지");

  const handleActiveTab = (e: MouseEvent<HTMLLIElement>) => {
    const value = e.currentTarget.getAttribute("data-value");
    if (value) setActiveTab(value);
  };

  return (
    <ul className="flex">
      {ADDRESS_TAB.map((tab) => (
        <li
          className={`${getActiveTabCSS(activeTab, tab)} hover:cursor-pointer`}
          data-value={tab}
          onClick={(e) => handleActiveTab(e)}
          key={tab}
        >
          {tab}
        </li>
      ))}
    </ul>
  );
}

function getActiveTabCSS(activeTab: string, clickedTab: string) {
  const activeTabCSS = "bg-white border border-neutral-200 border-b-0";
  return clickedTab === activeTab
    ? activeTabCSS
    : "bg-neutral-100 border border-neutral-100 ";
}
