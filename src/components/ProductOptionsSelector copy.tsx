"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { Option } from "./forms/NewProductForm";
import { useCartOption } from "@/store/option";
import { FullProduct } from "@/model/product";
import { getDiscountedPrice } from "@/utils/calculate";

//TODO: 여기저기 흩어진 타입들 정리하기
type Props = {
  product: FullProduct;
};

export type SelectedOption = {
  name: string;
  value: string;
};

export default function ProductOptionsSelector({ product }: Props) {
  const { options, price, discountRate } = product;
  const {
    cartOption: cartOptions,
    addCartOption,
    updateCartOption,
    removeCartOption,
  } = useCartOption();
  const [selectedOptions, setSelectedOptions] = useState<SelectedOption[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const discountedPrice = getDiscountedPrice(price, discountRate);

  const isAllOptionsSelected =
    selectedOptions.every((opt) => opt.value !== "") &&
    options &&
    options.length === selectedOptions.length;

  useEffect(() => {
    const newTotalPrice = cartOptions.reduce(
      (total, option) => total + discountedPrice * option.quantity,
      0
    );
    setTotalPrice(newTotalPrice);
  }, [cartOptions, discountedPrice]);

  useEffect(() => {
    if (isAllOptionsSelected) {
      // const newOption = {
      //   name: selectedOptions.map((opt) => opt.name).join(", "),
      //   value: selectedOptions.map((opt) => opt.value).join(", "),
      //   quantity: 1,
      // };
      const newOptions = selectedOptions.map((opt) => {
        const entries = Object.entries(opt).map((opt) => opt[1]);
        const option = {
          name: entries[0],
          value: entries[1],
          quantity: 1,
        };
        return option;
      });
      newOptions.forEach((opt) => addCartOption(opt));

      setSelectedOptions([]);
    }
  }, [isAllOptionsSelected, selectedOptions, addCartOption]);

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

  const handleUpdateQuantity = (name: string, value: string, delta: number) => {
    const option = cartOptions.find(
      (opt) => opt.name === name && opt.value === value
    );
    if (option) {
      const newQuantity = Math.max(1, option.quantity + delta);
      updateCartOption(name, value, newQuantity);
    }
  };

  const handleDeleteOption = (name: string, value: string) => {
    removeCartOption(name, value);
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
        {cartOptions.map((option) => (
          <li key={`${option.name}-${option.value}`}>
            <span>{`${option.name}: ${option.value}`}</span>
            <button
              className="px-2 py-1 bg-gray-200"
              onClick={() =>
                handleUpdateQuantity(option.name, option.value, -1)
              }
            >
              -
            </button>
            <span className="border px-2 py-1">{option.quantity}</span>
            <button
              className="px-2 py-1 bg-gray-200"
              onClick={() => handleUpdateQuantity(option.name, option.value, 1)}
            >
              +
            </button>
            <button
              className="px-2 py-1 border"
              onClick={() => handleDeleteOption(option.name, option.value)}
            >
              삭제
            </button>
            <span className="ml-4">
              {`개별 가격:  ${getDiscountedPrice(
                price,
                discountRate
              ).toLocaleString()}원`}
            </span>
          </li>
        ))}
      </ul>

      <div>
        <h3>총 가격: {totalPrice.toLocaleString()}원</h3>
      </div>
    </>
  );
}
