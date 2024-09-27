import { MouseEvent } from "react";

type Props = {
  activeTab: string;
  title: "신규입력" | "기존배송지";
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
};
export default function AdressTabButton({ activeTab, title, onClick }: Props) {
  return (
    <button
      className={getActiveTabCSS(activeTab, title)}
      data-value={title}
      onClick={onClick}
    >
      {title}
    </button>
  );
}
function getActiveTabCSS(activeTab: string, clickedTab: string) {
  const activeTabCSS = "bg-white border border-neutral-200 border-b-white";
  return clickedTab === activeTab
    ? activeTabCSS
    : "bg-neutral-100 border border-neutral-100 ";
}
