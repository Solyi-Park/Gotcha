"use client";
import {
  ChangeEventHandler,
  MouseEvent,
  MouseEventHandler,
  useState,
} from "react";

type Props = {
  tags: string[];
  setTags: (tags: string[]) => void;
};

export default function TagInputField({ tags, setTags }: Props) {
  const [keywords, setKeyWords] = useState("");

  const onClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    const newTags = keywords.split(",").map((item) => item.trim());
    const updatedTags = [...tags, ...newTags];
    setTags(updatedTags);
  };
  // TODO:등록버튼 트리거 처리
  const deleteTags = (selectedKeyword: string) => {
    const updatedTags = tags.filter((tag) => tag !== selectedKeyword);
    setTags(updatedTags);
  };
  return (
    <div>
      <p className="font-bold">검색어</p>
      <label htmlFor="tags">
        태그
        <input
          value={keywords}
          onChange={(e) => setKeyWords(e.target.value)}
          type="text"
          className="border w-96 placeholder:text-sm pl-1"
          id="tags"
          placeholder="쉼표(,)로 구분하여 최대 20개까지 입력 가능"
        />
      </label>
      <p className="text-xs">
        검색어는 고객이 상품을 빠르게 찾을 수 있게 합니다. 상품과 관계없는
        검색어는 삭제/변경될 수 있습니다.
      </p>
      <button
        onClick={onClick}
        className={`bg-black text-white ${!keywords && "bg-slate-300 border"}`}
        disabled={!tags}
      >
        추가
      </button>
      <ul className="flex gap-1 ">
        {tags &&
          tags.length > 0 &&
          tags.map((tag, index) => (
            <li key={index} className="border p-2">
              {tag}
              <button className="border" onClick={() => deleteTags(tag)}>
                X
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}
