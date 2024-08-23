"use client";

import { FormEventHandler, useState } from "react";
import useImageUpload from "@/hooks/images";
import useCategoryCode from "@/hooks/categories";
import { categoryOptions } from "@/constants/categoryOptions.ts";
import InputField from "./InputField";
import SelectField from "./SelectField";
import FileInputField from "./FileInputField";

export default function NewProductForm() {
  const [largeCategory, setLargeCategory] = useState<string>("");
  const [mediumCategory, setMediumCategory] = useState<string>("");
  const [smallCategory, setSmallCategory] = useState<string>("");

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number | null>(null);
  const [discountRate, setDiscountRate] = useState<number | null>(null);
  const [stockQuantity, setStockQuantity] = useState<number | null>(null);

  const [productImagefiles, setProductImageFiles] = useState<File[]>([]);
  const [thumbnailFiles, setThumbnailFiles] = useState<File[]>([]);

  const { imageUrls, isUploading, error } = useImageUpload(productImagefiles);
  const {
    imageUrls: thumbnailUrls,
    isUploading: istThumbnailUploading,
    error: thumbnailError,
  } = useImageUpload(thumbnailFiles);

  const categoryCode = useCategoryCode(
    largeCategory,
    mediumCategory,
    smallCategory
  );

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!productImagefiles) return;

    const newProduct = {
      name,
      description,
      price,
      discountRate,
      stockQuantity,
      categoryCode,
      imageUrls,
      thumbnailUrls,
    };

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        body: JSON.stringify(newProduct),
      }).then((res) => res.json());
      // if (!res.ok) {
      //   console.log(`Error: ${res.status} ${res.statusText}`);
      //   return;
      // }
      alert("상품 등록이 완료 되었습니다.");
      // window.location.reload();
    } catch (error) {
      console.error("Failed to add new product", error);
    }
  };

  return (
    <>
      <form className="flex flex-col" action="" onSubmit={onSubmit}>
        <InputField
          label="상품명"
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="productName"
          required
        />
        <InputField
          label="상품설명"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          id="description"
          required
        />
        <InputField
          label="가격"
          value={price === null ? "" : price}
          onChange={(e) => {
            const valueAsNumber =
              e.target.value === "" ? null : Number(e.target.value);
            setPrice(valueAsNumber);
          }}
          id="price"
          type="number"
          min="0"
          required
        />
        <InputField
          label="할인률"
          value={discountRate === null ? "" : discountRate}
          onChange={(e) => {
            const valueAsNumber =
              e.target.value === "" ? null : Number(e.target.value);
            setDiscountRate(valueAsNumber);
          }}
          id="discountRate"
          type="number"
          min="0"
          max="100"
        />
        <InputField
          label="재고수량"
          value={stockQuantity === null ? "" : stockQuantity}
          onChange={(e) => {
            const valueAsNumber =
              e.target.value === "" ? null : Number(e.target.value);
            setStockQuantity(valueAsNumber);
          }}
          id="stockQuantity"
          type="number"
          min="0"
          required
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
          required
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
        <FileInputField
          label="썸네일 이미지"
          id="thumbnailImages"
          setState={setThumbnailFiles}
        />
        <FileInputField
          label="상품 이미지"
          id="productImages"
          setState={setProductImageFiles}
        />
        <button className="flex flex-col border" type="submit">
          등록
        </button>
      </form>
    </>
  );
}
