"use client";
import { useState } from "react";
import InputField from "../new_product/InputField";
import PostcodePopup from "@/components/PostcodePopup";
import AddressTabs from "@/components/buttons/AddressTabs";

import { useShippingDetailStore } from "@/store/shippingDetail";
import { useDebouncedSync } from "@/hooks/debouncedSync";

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
//TODO: 반복 css 코드

export default function ShippingDetailForm() {
  const [shippingDetails, setShippingDetails] = useState({
    addressTitle: "",
    recipient: "",
    addDetail: "",
    contact1: "",
    contact2: "",
    deliveryNote: "",
    isDefault: false,
    customDeliveryNote: "",
  });
  const {
    addressTitle,
    recipient,
    addDetail,
    contact1,
    contact2,
    deliveryNote,
    customDeliveryNote,
    isDefault,
  } = shippingDetails;

  const {
    shippingDetails: { postCode, address },
  } = useShippingDetailStore();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  useDebouncedSync("addressTitle", addressTitle, 500);
  useDebouncedSync("recipient", recipient, 500);
  useDebouncedSync("postCode", postCode, 500);
  useDebouncedSync("address", address, 500);
  useDebouncedSync("addDetail", addDetail, 500);
  useDebouncedSync("contact1", contact1, 500);
  useDebouncedSync("contact2", contact2, 500);
  useDebouncedSync("deliveryNote", deliveryNote, 500);
  useDebouncedSync("customDeliveryNote", customDeliveryNote, 500);
  useDebouncedSync("isDefault", isDefault, 500);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setShippingDetails({
      ...shippingDetails,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };
  return (
    <>
      <section className="flex flex-col gap-2">
        <header className="font-bold text-2xl">배송정보</header>
        <AddressTabs />
        <div className="flex h-12 items-center">
          <InputField
            label="배송지명"
            name="addressTitle"
            value={addressTitle}
            onChange={handleInputChange}
            type="text"
            style="min-w-[360px] h-10 border focus:border-[1px] focus:border-black  focus:outline-none "
          />
        </div>
        <div className="flex items-center">
          <InputField
            label="수령인"
            name="recipient"
            value={recipient}
            onChange={handleInputChange}
            type="text"
            required
            style="min-w-[360px] h-10 border focus:border-[1px] focus:border-black  focus:outline-none "
          />
        </div>
        <div className="flex">
          <div className="flex">
            <h2 className="w-32">배송지</h2>
            <div className="flex flex-col gap-2">
              <div className="flex w-96 ">
                <div className="min-w-64 h-10 border mr-2">{postCode}</div>
                <PostcodePopup />
              </div>
              <div className="min-w-[460px] h-10 border">{address}</div>
              <div>
                <InputField
                  name="addDetail"
                  value={addDetail}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="상세주소 입력"
                  style="min-w-[460px] h-10 focus:border-[1px] focus:border-black  focus:outline-none border  "
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex">
          <InputField
            label="연락처1"
            name="contact1"
            value={contact1}
            onChange={handleInputChange}
            type="text"
            style="min-w-[360px] h-10 border focus:border-[1px] focus:border-black  focus:outline-none "
          />
        </div>
        <div className="flex">
          <InputField
            label="연락처2"
            name="contact2"
            value={contact2}
            onChange={handleInputChange}
            type="text"
            style="min-w-[360px] h-10 border focus:border-[1px] focus:border-black  focus:outline-none "
          />
        </div>
        <div className="flex items-center h-10 ml-32 gap-2 ">
          <input
            id="checkbox"
            name="isDefault"
            type="checkbox"
            checked={isDefault}
            onChange={handleInputChange}
          />
          {/* TODO: 기본배송지 데이터 사용시 메세지 */}
          <label
            className={`${isDefault && "font-bold"} cursor-pointer`}
            htmlFor="checkbox"
          >
            기본 배송지로 등록
          </label>
        </div>
        <div className="relative w-[500px] ml-32 ">
          <input
            className="px-5 py-2 w-full h-10 border hover:cursor-pointer focus:outline-none"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            value={
              deliveryNote === ""
                ? "배송시 요청사항을 선택해주세요."
                : deliveryNote
            }
            readOnly
          ></input>

          {isDropdownOpen && (
            <ul className="absolute w-full border z-10">
              {deliveryNotes.map((note) => (
                <li
                  //TODO: 아웃포커스시 드롭다운해제
                  role="button"
                  key={note}
                  onClick={(e) => {
                    setShippingDetails((prev) => ({
                      ...prev,
                      deliveryNote: note,
                    }));

                    // setDeliveryNote(note);
                    setIsDropdownOpen(!isDropdownOpen);
                    setShippingDetails((prev) => ({
                      ...prev,
                      customDeliveryNote: "",
                    }));
                    e.target !== e.currentTarget && setIsDropdownOpen(false);
                  }}
                  className={`px-5 py-2 bg-white h-10 hover:cursor-pointer hover:bg-neutral-200 ${
                    deliveryNote === note && "bg-neutral-200"
                  }`}
                >
                  {note === "" ? "배송시 요청사항을 선택해주세요." : note}
                </li>
              ))}
            </ul>
          )}

          {deliveryNote === "직접입력" && !isDropdownOpen && (
            <textarea
              maxLength={50}
              name="customDeliveryNote"
              placeholder="내용을 입력해주세요. (최대 50자)"
              value={customDeliveryNote}
              onChange={handleInputChange}
              className="min-w-[400px] w-full h-38 resize-none border focus:border-[1px] focus:border-black  focus:outline-none "
              cols={30}
              rows={5}
            />
          )}
        </div>
      </section>
    </>
  );
}
