"use client";
import { useState } from "react";

type Option = {
  name: string;
  items: {
    value: string;
  }[];
};
export default function AddNewOptions() {
  const [optionGroup, setOptionGroup] = useState("");
  const [optionItems, setOptionItems] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [options, setOptions] = useState<Option[]>([]);

  const onClick = () => {
    const items = optionItems.split(",").map((item) => ({
      value: item.trim(),
    }));

    const newOption = {
      name: optionGroup,
      items: [...items],
    };
    setOptions([...options, newOption]);

    setOptionGroup("");
    setOptionItems("");
  };

  return (
    <div>
      <div>
        <label htmlFor="optionGroup">
          옵션명
          <input
            value={optionGroup}
            onChange={(e) => setOptionGroup(e.target.value)}
            type="text"
            className="border"
            id="optionGroup"
          />
        </label>
        <label htmlFor="optionItems">
          옵션값
          <input
            value={optionItems}
            onChange={(e) => setOptionItems(e.target.value)}
            type="text"
            className="border"
            id="optionItems"
          />
        </label>
        <button
          onClick={onClick}
          className={`bg-black text-white ${
            buttonDisabled && "bg-white text-slate-300 border"
          }`}
          disabled={buttonDisabled}
        >
          옵션 적용하기
        </button>
        <div>
          <label htmlFor="optionList">옵션목록</label>
          <ul className="flex flex-col" id="optionList">
            {options.length > 0 &&
              options.map((option) => (
                <li className="flex">
                  <span className="border">{option.name}</span>
                  <div className="flex flex-col">
                    {option.items &&
                      option.items.map((item) => (
                        <li className="border">
                          <span>{item.value}</span>
                        </li>
                      ))}
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
