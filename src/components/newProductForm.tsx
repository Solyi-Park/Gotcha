"use client";
import { categories } from "@/constants/categories";
import { supabase } from "@/app/lib/supabaseClient";
import { FormEventHandler, useState } from "react";
import useImageUpload from "@/hooks/images";

export default function NewProductForm() {
  const [files, setFiles] = useState<File[]>([]);
  const [mainCategory, setMainCategory] = useState<string>("");
  const [subCategory, setSubCategory] = useState<string>("");
  const [detailCategory, setDetailCategory] = useState<string>("");

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number | null>(null);
  const [discountRate, setㅇiscounRate] = useState<number>(0);
  const [stockQuantity, setStockQuantity] = useState<number>(0);

  // console.log("file??", files);

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

        <label htmlFor="main-category">대분류</label>
        <select
          id="main-category"
          name="main-category"
          value={mainCategory}
          onChange={(e) => {
            setMainCategory(e.target.value);
            setSubCategory("");
            setDetailCategory("");
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
          value={subCategory}
          onChange={(e) => {
            setSubCategory(e.target.value);
            setDetailCategory("");
          }}
          disabled={!mainCategory}
        >
          <option value="">중분류 선택</option>
          {mainCategory &&
            Object.keys(categories[mainCategory]).map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
        </select>

        <label htmlFor="detail-category">소분류</label>
        <select
          id="detail-category"
          name="detail-category"
          value={detailCategory}
          onChange={(e) => setDetailCategory(e.target.value)}
          disabled={!subCategory}
        >
          <option value="">소분류 선택</option>
          {subCategory &&
            categories[mainCategory][subCategory].map((item) => (
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
