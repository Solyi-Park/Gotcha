"use client";
import { categories } from "@/constants/categories";
import { FormEventHandler, useState } from "react";
import useImageUpload from "@/hooks/images";
import useCategoryCode from "@/hooks/categories";

// 상품이름, 설명, 가격, 할인률,  재고,
// 카테고리ID,
// 썸넬urls, 상품urls,

export default function NewProductForm() {
  const [files, setFiles] = useState<File[]>([]);
  const [largeCategory, setLargeCategory] = useState<string>("");
  const [mediumCategory, setMediumCategory] = useState<string>("");
  const [smallCategory, setSmallCategory] = useState<string>("");

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number | null>(null);
  const [discountRate, setdiscounRate] = useState<number>(0);
  const [stockQuantity, setStockQuantity] = useState<number>(0);

  const categoryCode = useCategoryCode(
    largeCategory,
    mediumCategory,
    smallCategory
  );

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!files) return;
    const { imageUrls, isUploading, error } = useImageUpload(files);
    const newProduct = {
      name,
      description,
      price,
      discountRate,
      stockQuantity,
      category: "", // ??????
    };

    fetch("/api/products", {
      method: "POST",
      body: JSON.stringify({}),
    });
  };

  return (
    <>
      <form className="flex flex-col" action="" onSubmit={onSubmit}>
        <input type="file" />

        <label htmlFor="large-category">대분류</label>
        <select
          id="large-category"
          name="large-category"
          value={largeCategory}
          onChange={(e) => {
            setLargeCategory(e.target.value);
            setMediumCategory("");
            setSmallCategory("");
          }}
        >
          <option value="">대분류 선택</option>
          <option value="women">여성</option>
          <option value="men">남성</option>
          <option value="beauty">뷰티</option>
          <option value="interior">인테리어</option>
        </select>

        <label htmlFor="sub-category">중분류</label>
        <select
          id="sub-category"
          name="sub-category"
          value={mediumCategory}
          onChange={(e) => {
            setMediumCategory(e.target.value);
            setSmallCategory("");
          }}
          disabled={!largeCategory}
        >
          <option value="">중분류 선택</option>
          {largeCategory &&
            Object.keys(categories[largeCategory]).map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
        </select>

        <label htmlFor="detail-category">소분류</label>
        <select
          id="detail-category"
          name="detail-category"
          value={smallCategory}
          onChange={(e) => setSmallCategory(e.target.value)}
          disabled={!mediumCategory}
        >
          <option value="">소분류 선택</option>
          {mediumCategory &&
            categories[largeCategory][mediumCategory].map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
        </select>

        <button className="border" type="button">
          등록
        </button>
      </form>
      <form onSubmit={onSubmit}>
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
