"use client";
import { ChangeEvent, useEffect, useState } from "react";

import { useProductOption } from "@/store/option";
import { FullProduct, ProductOption } from "@/model/product";
import { getDiscountedPrice } from "@/utils/calculate";
import QuantityAdjuster from "./QuantityAdjuster";
import { CartItemOption } from "@/model/cart";

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
  const [selectedOptions, setSelectedOptions] = useState<CartItemOption[]>([]);
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

  const generateOptionId = (selectedOptions: CartItemOption[]) => {
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
    option: ProductOption
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
      <ul className="flex flex-col gap-2">
        {options &&
          options.map((option) => (
            <li key={option.name}>
              <select
                className="text-gray-500 bg-white border p-2 w-full outline-none"
                id={option.name}
                value={
                  selectedOptions.find((opt) => opt.name === option.name)
                    ?.value || ""
                }
                onChange={(e) => onChangeOptions(e, option)}
              >
                <option value="" className="">
                  {option.name}
                </option>
                {option.items.map((item) => (
                  <option value={item.value} key={item.value || ""}>
                    {item.value}
                  </option>
                ))}
              </select>
            </li>
          ))}
      </ul>

      <ul className="flex flex-col justify-center w-full sm:min-w-96">
        {cartOptions.map((option) => (
          <li
            className="flex items-center justify-between py-3 border-b last:border-b-0"
            key={option.id}
          >
            <span className="font-semibold">
              {option.items.map((item) => `${item.value}`).join(" - ")}
            </span>
            <QuantityAdjuster
              onClick={handleUpdateQuantity}
              id={option.id}
              quantity={option.quantity}
            />
            <div>
              <span className="mr-2 font-semibold">
                {`${getDiscountedPrice(
                  price,
                  discountRate
                ).toLocaleString()}원`}
              </span>
              <button
                className="text-neutral-400 text-2xl px-2 "
                onClick={() => handleDeleteOption(option.id)}
              >
                x
              </button>
            </div>
          </li>
        ))}
      </ul>
      {totalPrice > 0 && (
        <h3 className="mt-5 text-end pt-3 border-t-2 border-black">
          총 가격: {totalPrice.toLocaleString()}원
        </h3>
      )}
    </>
  );
}
