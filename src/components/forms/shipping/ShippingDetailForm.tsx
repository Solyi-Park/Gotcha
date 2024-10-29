"use client";
import { MouseEvent, useEffect, useState } from "react";
import InputField from "../new_product/InputField";
import PostcodePopup from "@/components/PostcodePopup";
import AddressTabs from "@/components/buttons/AddressTabs";

import { useShippingDetailStore } from "@/store/shippingDetail";
import { useDebouncedSync } from "@/hooks/debouncedSync";
import AddressForm from "../AddressForm";
import useMe from "@/hooks/me";

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
  const { user } = useMe();
  console.log("me", user);

  const [activeTab, setActiveTab] = useState("기존배송지");

  const handleActiveTab = (e: MouseEvent<HTMLLIElement>) => {
    const value = e.currentTarget.getAttribute("data-value");
    if (value) setActiveTab(value);
  };
  //TODO: 값이 입력되지 않은 경우 결제불가.
  // const [shippingDetails, setShippingDetails] = useState({
  //   addressTitle: "",
  //   recipient: "",
  //   // addDetail: "",
  //   contact1: "",
  //   contact2: "",
  //   deliveryNote: "",
  //   isDefault: false,
  //   customDeliveryNote: "",
  // });
  // const {
  //   addressTitle,
  //   recipient,
  //   addDetail,
  //   contact1,
  //   contact2,
  //   deliveryNote,
  //   customDeliveryNote,
  //   isDefault,
  // } = shippingDetails;

  const {
    setField,
    shippingDetails: {
      addressTitle,
      postCode,
      address,
      addDetail,
      recipient,
      contact1,
      contact2,
      deliveryNote,
      customDeliveryNote,
      isDefault,
    },
    resetAll,
  } = useShippingDetailStore();

  useEffect(() => {
    if (user && user?.addresses && activeTab === "기존배송지") {
      if (user.addresses.default) {
        setField("postCode", user.addresses.postCode);
        setField("address", user.addresses.address);
        setField("addDetail", user.addresses.addDetail);
        setField("recipient", user.addresses.name);
        setField("contact1", user.addresses.contact ?? "");
        setField("addressTitle", user.addresses.title ?? "");
        setField("isDefault", true);
      }
    }
  }, [user, activeTab]);

  useEffect(() => {
    if (activeTab === "신규입력") {
      resetAll();
    }
  }, [activeTab]);

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

    setField(
      `${name}`,
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    );
    // setShippingDetails({
    //   ...shippingDetails,
    //   [name]:
    //     type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    // });
  };
  console.log("addressTitle", addressTitle);
  console.log("recipient", recipient);
  console.log("postCode", postCode);
  console.log("address", address);
  console.log("addDetail", addDetail);
  console.log("contact1", contact1);
  console.log("contact2", contact2);
  console.log("deliveryNote", deliveryNote);
  console.log("customDeliveryNote", customDeliveryNote);
  console.log("isDefault", isDefault);

  return (
    <>
      <section className="flex flex-col gap-2">
        <header className="font-bold text-2xl">배송정보</header>
        <AddressTabs activeTab={activeTab} handleActiveTab={handleActiveTab} />
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
            <AddressForm
              postCode={postCode}
              address={address}
              addDetail={addDetail}
              // handleInputChange={handleInputChange}
            />
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
        {activeTab === "신규입력" ? (
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
        ) : (
          <span className=" ml-32 ">
            기본배송지입니다. 주문 시 변경하신 내용으로 기본 배송지 주소가
            수정됩니다.
          </span>
        )}

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
                    setField("deliveryNote", note);
                    // setShippingDetails((prev) => ({
                    //   ...prev,
                    //   deliveryNote: note,
                    // }));

                    // setDeliveryNote(note);
                    setIsDropdownOpen(!isDropdownOpen);
                    setField("customDeliveryNote", "");
                    // setShippingDetails((prev) => ({
                    //   ...prev,
                    //   customDeliveryNote: "",
                    // }));
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
