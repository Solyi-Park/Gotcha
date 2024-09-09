"use client";
import { MouseEvent } from "react";
import { Option } from "./newProductForm";

type Props = {
  optionGroup: string;
  setOptionGroup: (value: string) => void;
  optionItems: string;
  setOptionItems: (value: string) => void;
  options: Option[];
  setOptions: (options: Option[]) => void;
  optionButtonDisabled: boolean;
};

export default function AddNewOptions({
  optionGroup,
  setOptionGroup,
  optionItems,
  setOptionItems,
  options,
  setOptions,
  optionButtonDisabled,
}: Props) {
  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const items = optionItems.split(",").map((item) => ({
      groupName: optionGroup,
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

  const deleteOptionGroup = (optionName: string) => {
    setOptions(options.filter((item) => item.name !== optionName));
  };
  const deleteOptionItems = (itemGroupName: string, itemValue: string) => {
    setOptions(
      options.map((option) =>
        option.name === itemGroupName
          ? {
              ...option,
              items: option.items.filter((i) => i.value !== itemValue),
            }
          : option
      )
    );
  };

  return (
    <div>
      {/* TODO: 옵션추가후 마우스 포커스 가게 하기 */}
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
          optionButtonDisabled && "bg-white text-slate-300 border"
        }`}
        disabled={optionButtonDisabled}
      >
        옵션 적용하기
      </button>
      <div>
        <label htmlFor="optionList">옵션목록</label>
        <ul className="flex flex-col" id="optionList">
          {options &&
            options.length > 0 &&
            options.map((option) => (
              <li className="flex" key={option.name}>
                <span className="border">{option.name}</span>
                <button
                  className="border"
                  onClick={() => deleteOptionGroup(option.name)}
                >
                  X
                </button>
                <ul className="flex flex-col">
                  {option.items &&
                    option.items.map((item) => (
                      <li className="border" key={item.value}>
                        <span>{item.value}</span>
                        <button
                          className="border"
                          onClick={() =>
                            deleteOptionItems(item.groupName, item.value)
                          }
                        >
                          X
                        </button>
                      </li>
                    ))}
                </ul>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
