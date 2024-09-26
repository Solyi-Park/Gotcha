"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { Option } from "./forms/NewProductForm";
import { useProductOption } from "@/store/option";
import { FullProduct } from "@/model/product";
import { getDiscountedPrice } from "@/utils/calculate";
import QuantityAdjuster from "./QuantityAdjuster";
import { CartOptionItem } from "@/model/cart";

//TODO: 여기저기 흩어진 타입들 정리하기
type Props = {
  product: FullProduct;
};

export default function ProductOptionsSelector({ product }: Props) {
  const { options, price, discountRate } = product;
  const {
    productOptions: cartOptions,
    addOption,
    updateQuantity,
    deleteOption,
  } = useProductOption();
  const [selectedOptions, setSelectedOptions] = useState<CartOptionItem[]>([]);
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

  const generateOptionId = (selectedOptions: CartOptionItem[]) => {
    return selectedOptions.map((opt) => `${opt.name}:${opt.value}`).join(", ");
  };
  useEffect(() => {
    if (isAllOptionsSelected) {
      const newOption = {
        id: generateOptionId(selectedOptions),
        items: selectedOptions.map((opt) => ({
          name: opt.name,
          value: opt.value,
        })),
        quantity: 1,
      };
      console.log("newOpt", newOption);
      const existingOption = cartOptions.some((opt) => opt.id === newOption.id);
      if (existingOption) {
        alert("이미 존재하는 옵션입니다.");
        setSelectedOptions([]);
        return;
      } else {
        addOption(newOption);
      }
      setSelectedOptions([]);
    }
  }, [isAllOptionsSelected, selectedOptions, addOption]);

  const onChangeOptions = (
    e: ChangeEvent<HTMLSelectElement>,
    option: Option
  ) => {
    const newOption = {
      name: option.name,
      value: e.target.value,
    };
    console.log("newOption", newOption);
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

  const handleUpdateQuantity = (delta: number, optionId?: string) => {
    const option = cartOptions.find((opt) => opt.id === optionId);
    if (option) {
      updateQuantity(option.id as string, delta);
    }
  };

  const handleDeleteOption = (id: string) => {
    deleteOption(id);
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
          <li className="flex items-center" key={option.id}>
            <span>
              {option.items.map((item) => `${item.value}`).join(" - ")}
            </span>
            <QuantityAdjuster
              onClick={handleUpdateQuantity}
              id={option.id}
              quantity={option.quantity}
            />
            <button
              className="px-2 py-1 border"
              onClick={() => handleDeleteOption(option.id)}
            >
              삭제
            </button>
            <span className="ml-4">
              {`${getDiscountedPrice(price, discountRate).toLocaleString()}원`}
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
