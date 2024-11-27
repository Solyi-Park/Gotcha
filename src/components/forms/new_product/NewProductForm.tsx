"use client";
import { FormEventHandler, useState } from "react";
import useImageUpload from "@/hooks/images";
import useCategoryCode from "@/hooks/categories";
import { categoryOptions } from "@/constants/categoryOptions.ts";
import InputField from "./InputField";
import SelectField from "./SelectField";
import FileInputField from "./FileInputField";
import TagInputField from "./TagInputField";
import NewOptionsInputField from "@/components/NewOptionsInputField";
import { ProductOption } from "@/model/product";

// export type OptionItem = { groupName: string; value: string };
// export type OptionItem = { value: string };

export default function NewProductForm() {
  //TODO: zustand로 상태관리
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

  const [optionGroup, setOptionGroup] = useState("");
  const [optionItems, setOptionItems] = useState("");
  const [options, setOptions] = useState<ProductOption[]>([]);

  const [tags, setTags] = useState<string[]>([]);

  const {
    imageUrls: thumbnailUrls,
    isUploading: istThumbnailUploading,
    error: thumbnailError,
  } = useImageUpload(thumbnailFiles);

  //TODO: db에서 상품정보가 없어지면 storage에 저장된 이미지 어떻게 처리할지 생각해보기
  const { imageUrls, isUploading, error } = useImageUpload(productImagefiles);
  // console.log("imageUrls", imageUrls);

  const categoryCode = useCategoryCode(
    largeCategory,
    mediumCategory,
    smallCategory
  );

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    // TODO: submit 버튼 쓰로틀링 처리하기
    e.preventDefault();

    if (isUploading || istThumbnailUploading) {
      alert("이미지를 업로드 중입니다.");
      return;
    }
    if (imageUrls.length === 0 || thumbnailUrls.length === 0) {
      alert("상품 이미지를 업로드 해주세요.");
      return;
    }
    if (!options) return;
    const newProduct = {
      name,
      description,
      price: 39000,
      discountRate,
      stockQuantity: 10,
      categoryCode,
      imageUrls,
      thumbnailUrls,
      options,
      tags,
    };

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
      if (!res.ok) {
        console.log(`Error: ${res.status} ${res.statusText}`);
        // TODO: storage 이미지 삭제하는 로직
        return;
      }
      if (res.ok) {
        alert("상품 등록이 완료 되었습니다.");
      }
    } catch (error) {
      // TODO: storage 이미지 삭제하는 로직
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
        {/* TODO: 파일이름이 유효하지 않은 경우 메세지 표시하기 */}
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
        <NewOptionsInputField
          optionGroup={optionGroup}
          setOptionGroup={setOptionGroup}
          optionItems={optionItems}
          setOptionItems={setOptionItems}
          options={options}
          setOptions={setOptions}
          optionButtonDisabled={!optionGroup}
        />
        <TagInputField tags={tags} setTags={setTags} />
        <button className="flex flex-col border " type="submit">
          등록
        </button>
      </form>
    </>
  );
}
