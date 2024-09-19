"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { Option } from "./forms/NewProductForm";
import { useOption } from "@/store/option";

//TODO: 여기저기 흩어진 타입들 정리하기
type Props = {
  options: Option[];
};

export type SelectedOption = {
  name: string;
  value: string;
};

type OptionSummary = {
  id: string;
  details: { [key: string]: string };
  quantity: number;
};
// 옵션 선택이 선택옵션 상태관리
// 모든 옵션이 선택되면 UI로 보여주기
// 해당 옵션에 수량 조절 버튼, 삭제버튼 추가
// 수량 조절시 해당 상품 가격 및 전체 상품가격 업데이트해서 보여주기
// 카트 버튼 클릭시 재고 수량 확인후 장바구니 추가

export default function ProductOptionsSelector({ options }: Props) {
  const [selectedOptions, setSelectedOptions] = useState<SelectedOption[]>([]);
  const [optionSummaries, setOptionSummaries] = useState<OptionSummary[]>([]);
  // const { cartOptions, setCartOptions } = useOption();

  console.log("selectedOptions", selectedOptions);
  const isAllOptionsSelected =
    selectedOptions.every((opt) => opt.value !== "") &&
    options.length === selectedOptions.length;

  console.log("isAllOptionsSelected", isAllOptionsSelected);
  console.log("optionSummaries", optionSummaries);

  const generateSummaryId = (selectedOptions: SelectedOption[]) => {
    return selectedOptions.map((opt) => opt.value).join(" - ");
  };

  useEffect(() => {
    if (isAllOptionsSelected) {
      const newSummaryId = generateSummaryId(selectedOptions);
      const newSummaryDetails = selectedOptions.reduce((acc, curr) => {
        acc[curr.name] = curr.value;
        return acc;
      }, {} as { [key: string]: string });

      const existingSummary = optionSummaries.some(
        (summary) => summary.id === newSummaryId
      );
      if (existingSummary) {
        alert("이미 추가된 옵션입니다.");
      } else {
        const updatedSummaires = [
          ...optionSummaries,
          { id: newSummaryId, details: newSummaryDetails, quantity: 1 },
        ];
        setOptionSummaries(updatedSummaires);
      }
      setSelectedOptions([]);
    }
  }, [isAllOptionsSelected, selectedOptions]);

  const onChangeOptions = (
    e: ChangeEvent<HTMLSelectElement>,
    option: Option
  ) => {
    const newOption = {
      name: option.name,
      value: e.target.value,
    };
    const isExistingOption = selectedOptions.some(
      (opt) => opt.name === newOption.name
    );
    const updatedOptions = isExistingOption
      ? selectedOptions.map((opt) =>
          opt.name === newOption.name ? newOption : opt
        )
      : [...selectedOptions, newOption];
    setSelectedOptions(updatedOptions);
  };

  const updateQuantity = (id: string, delta: number) => {
    const updatedSummaries = optionSummaries.map((sum) => {
      return sum.id === id
        ? {
            ...sum,
            quantity: Math.max(1, sum.quantity + delta),
          }
        : sum;
    });

    setOptionSummaries(updatedSummaries);
  };

  const deleteOption = (id: string) => {
    setOptionSummaries((prev) => {
      return prev.filter((sum) => sum.id !== id);
    });
  };

  return (
    <>
      <ul>
        {options &&
          options.map((option) => (
            <li key={option.name}>
              <label htmlFor={option.name}>{option.name}</label>
              <select
                className="text-gray-500"
                id={option.name}
                value={
                  selectedOptions.find((opt) => opt.name === option.name)
                    ?.value || ""
                }
                onChange={(e) => onChangeOptions(e, option)}
              >
                <option value="">{option.name}</option>
                {option.items.map((item) => (
                  <option value={item.value} key={item.value || ""}>
                    {item.value}
                  </option>
                ))}
              </select>
            </li>
          ))}
      </ul>
      <ul className="flex flex-col">
        {optionSummaries &&
          optionSummaries.map((summary) => (
            <li key={summary.id}>
              <span>{summary.id}</span>
              <button
                className="px-2 py-1 bg-gray-200"
                onClick={() => updateQuantity(summary.id, -1)}
              >
                -
              </button>
              <span className="border">{summary.quantity}</span>

              <button
                className="px-2 py-1 bg-gray-200"
                onClick={() => updateQuantity(summary.id, 1)}
              >
                +
              </button>
              <button
                className="px-2 py-1 bg-red-200"
                onClick={() => deleteOption(summary.id)}
              >
                삭제
              </button>
            </li>
          ))}
      </ul>
    </>
  );
}
