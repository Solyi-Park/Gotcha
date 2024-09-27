"use client";
import { useState } from "react";
import InputField from "../new_product/InputField";
import PostcodePopup from "@/components/PostcodePopup";
import { useAddress } from "@/store/address";

const deliveryNotes = [
  "",
  "부재시 문앞에 놓아주세요.",
  "부재시 경비실에 맡겨 주세요.",
  "부재시 전화 또는 문자 주세요.",
  "택배함에 넣어 주세요.",
  "파손위험 상품입니다. 배송시 주의해주세요.",
  "배송 전에 연락주세요.",
  "직접입력",
];

export default function AdressForm() {
  const { postalCode, fullAddress, setFullAddress, setPostalCode } =
    useAddress();
  const [addressTitle, setAddressTitle] = useState("");
  const [fullname, setFullname] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [contact1, setContact1] = useState("");
  const [contact2, setContact2] = useState("");
  const [deliveryNote, setDeliveryNote] = useState("");
  const [isDefault, setIsDefault] = useState(false);
  const [customDeliveryNote, setCustomDeliveryNote] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <form className="flex flex-col gap-2">
      <InputField
        label="배송지명"
        id={addressTitle}
        value={addressTitle}
        onChange={(e) => setAddressTitle(e.target.value)}
        type="text"
      />
      <InputField
        label="수령인"
        id={fullname}
        value={fullname}
        onChange={(e) => setFullname(e.target.value)}
        type="text"
        required
      />
      <div className="flex" id="adress">
        <span>배송지</span>
        <div>
          <div className="flex">
            <InputField
              id={postalCode}
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              type="text"
              required
              readOnly
              style="focus:outline-none border"
            />
            <PostcodePopup />
          </div>
          <InputField
            id={fullAddress}
            value={fullAddress}
            onChange={(e) => setFullAddress(e.target.value)}
            type="text"
            readOnly
            style="focus:outline-none border"
          />
          <InputField
            id={addressDetail}
            value={addressDetail}
            onChange={(e) => setAddressDetail(e.target.value)}
            type="text"
            placeholder="상세주소 입력"
            style="focus:border-[px] focus:border-black  border focus:outline-none "
          />
        </div>
      </div>
      <InputField
        label="연락처1"
        id={contact1}
        value={contact1}
        onChange={(e) => setContact1(e.target.value)}
        type="text"
      />
      <InputField
        label="연락처2"
        id={contact2}
        value={contact2}
        onChange={(e) => setContact2(e.target.value)}
        type="text"
      />
      <div>
        <input
          id="checkbox"
          type="checkbox"
          checked={isDefault}
          onChange={(e) => setIsDefault(e.target.checked)}
        />
        <label
          className={`${isDefault && "font-bold"} cursor-pointer`}
          htmlFor="checkbox"
        >
          기본 배송지로 등록
        </label>
      </div>
      <div className="relative w-[500px] h-full bg-green">
        <p
          className="border hover:cursor-pointer"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {deliveryNote === ""
            ? "배송시 요청사항을 선택해주세요."
            : deliveryNote}
        </p>
        {isDropdownOpen && (
          <ul>
            {deliveryNotes.map((note) => (
              <li
                key={note}
                onClick={() => {
                  setDeliveryNote(note);
                  setIsDropdownOpen(!isDropdownOpen);
                  setCustomDeliveryNote("");
                }}
                className="hover:cursor-pointer hover:bg-neutral-200"
              >
                {note === "" ? "배송시 요청사항을 선택해주세요." : note}
              </li>
            ))}
          </ul>
        )}
        {deliveryNote === "직접입력" && !isDropdownOpen && (
          <input
            type="text"
            maxLength={50}
            placeholder="내용을 입력해주세요. (최대 50자)"
            value={customDeliveryNote}
            onChange={(e) => setCustomDeliveryNote(e.target.value)}
          />
        )}
      </div>
    </form>
  );
}
