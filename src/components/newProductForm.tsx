"use client";

import { FormEventHandler, useState } from "react";
import useImageUpload from "@/hooks/images";
import useCategoryCode from "@/hooks/categories";
import { categoryOptions } from "@/constants/categoryOptions.ts";
import InputField from "./InputField";
import SelectField from "./SelectField";

// 상품이름, 설명, 가격, 할인률,  재고,
// 카테고리ID,
// 썸넬urls, 상품urls,

export default function NewProductForm() {
  const [largeCategory, setLargeCategory] = useState<string>("");
  const [mediumCategory, setMediumCategory] = useState<string>("");
  const [smallCategory, setSmallCategory] = useState<string>("");

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [discountRate, setDiscountRate] = useState<number>(0);
  const [stockQuantity, setStockQuantity] = useState<number>(0);

  const [files, setFiles] = useState<File[]>([]);
  const { imageUrls, isUploading, error } = useImageUpload(files);

  const categoryCode = useCategoryCode(
    largeCategory,
    mediumCategory,
    smallCategory
  );

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!files) return;

    const newProduct = {
      name,
      description,
      price,
      discountRate,
      stockQuantity,
      categoryCode,
      imageUrls,
    };
    console.log("newProduct", newProduct);

    // fetch("/api/products", {
    //   method: "POST",
    //   body: JSON.stringify(newProduct),
    // });
  };

  return (
    <>
      <form className="flex flex-col" action="" onSubmit={onSubmit}>
        <InputField
          label="상품명"
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="productName"
        />
        <InputField
          label="상품설명"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          id="description"
        />
        <InputField
          label="가격"
          value={price}
          onChange={(e) => {
            const valueAsNumber = Number(e.target.value);
            setPrice(valueAsNumber);
          }}
          id="price"
          type="number"
          min="0"
        />
        <InputField
          label="할인률"
          value={discountRate}
          onChange={(e) => {
            const valueAsNumber = Number(e.target.value);
            setDiscountRate(valueAsNumber);
          }}
          id="discountRate"
          type="number"
          min="0"
          max="100"
        />
        <InputField
          label="재고수량"
          value={stockQuantity}
          onChange={(e) => {
            const valueAsNumber = Number(e.target.value);
            setStockQuantity(valueAsNumber);
          }}
          id="stockQuantity"
          type="number"
          min="0"
        />
        <SelectField
          label="대분류"
          id="largeCategory"
          value={largeCategory}
          onChange={(e) => {
            setLargeCategory(e.target.value);
            setMediumCategory("");
            setSmallCategory("");
          }}
          options={Object.keys(categoryOptions)}
        />
        <SelectField
          label="중분류"
          id="mediumCategory"
          value={mediumCategory}
          onChange={(e) => {
            setMediumCategory(e.target.value);
            setSmallCategory("");
          }}
          disabled={!largeCategory}
          options={
            largeCategory ? Object.keys(categoryOptions[largeCategory]) : []
          }
        />
        <SelectField
          label="소분류"
          id="smallCategory"
          value={smallCategory}
          onChange={(e) => setSmallCategory(e.target.value)}
          disabled={!mediumCategory}
          options={
            mediumCategory ? categoryOptions[largeCategory][mediumCategory] : []
          }
        />

        <label htmlFor="productImages">상품 이미지</label>
        <input
          type="file"
          onChange={(e) => {
            const selectedFiles = e.target.files;
            if (selectedFiles) {
              const filesArray = Array.from(e.target.files!);
              setFiles(filesArray);
            }
          }}
          multiple
          required
        />
        <button className="flex flex-col border" type="submit">
          등록
        </button>
      </form>
    </>
  );
}
