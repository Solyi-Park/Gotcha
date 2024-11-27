"use client";
import { MouseEvent, useEffect, useState } from "react";
import InputField from "../new_product/InputField";
import AddressTabs from "@/components/buttons/AddressTabs";
import { useShippingDetailStore } from "@/store/shippingDetail";
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

export default function ShippingDetailForm() {
  const { user } = useMe();
  console.log("user", user);
  const [activeTab, setActiveTab] = useState("기존배송지");

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

  // 기존 배송지 정보 가져오기
  useEffect(() => {
    if (user && user.addresses && activeTab === "기존배송지") {
      if (user.addresses.default) {
        setField("postCode", user.addresses.postCode || "");
        setField("address", user.addresses.address || "");
        setField("addDetail", user.addresses.addDetail || "");
        setField("recipient", user.addresses.name || "");
        setField("contact1", user.addresses.contact || "");
        setField("addressTitle", user.addresses.title || "");
        setField("isDefault", true);
      }
    } else if (!user || activeTab === "신규입력") {
      resetAll(); // 회원정보가 없거나 신규 입력 시 초기화
    }
  }, [user, activeTab]);

  // 폼 필드 변경 핸들러
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setField(
      name,
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    );
  };

  const handleActiveTab = (e: MouseEvent<HTMLLIElement>) => {
    const value = e.currentTarget.getAttribute("data-value");
    if (value) setActiveTab(value);
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <>
      <section>
        <header className="font-bold text-lg border-t-2 border-black py-3">
          배송정보
        </header>
        <AddressTabs activeTab={activeTab} handleActiveTab={handleActiveTab} />
        <div className="flex flex-col gap-2 min-w-[355px] my-2 items-center">
          <div className="flex h-12 items-center">
            <InputField
              label="배송지명"
              name="addressTitle"
              value={addressTitle}
              onChange={handleInputChange}
              type="text"
              style="min-w-[355px] h-10 border focus:border-[1px] focus:border-black focus:outline-none"
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
              style="min-w-[355px] h-10 border focus:border-[1px] focus:border-black focus:outline-none"
            />
          </div>
          <div className="flex">
            <div className="flex">
              <h2 className="min-w-[100px] text-sm">배송지</h2>
              <AddressForm
                postCode={postCode}
                address={address}
                addDetail={addDetail}
                handleInputChange={handleInputChange}
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
              required
              style="min-w-[355px] h-10 border focus:border-[1px] focus:border-black focus:outline-none"
            />
          </div>
          <div className="flex">
            <InputField
              label="연락처2"
              name="contact2"
              value={contact2}
              onChange={handleInputChange}
              type="text"
              style="min-w-[355px] h-10 border focus:border-[1px] focus:border-black focus:outline-none"
            />
          </div>

          {activeTab === "신규입력" ? (
            <div
              className={`flex max-w-[280px] w-full items-center gap-2 ${
                !user && "hidden"
              }`}
            >
              <input
                id="checkbox"
                name="isDefault"
                type="checkbox"
                checked={isDefault}
                onChange={handleInputChange}
              />
              <label
                className={`${isDefault && "font-bold"} cursor-pointer text-sm`}
                htmlFor="checkbox"
              >
                기본 배송지로 등록
              </label>
            </div>
          ) : (
            <span className="text-xs ml-[100px]">
              기본배송지입니다. 주문 시 변경하신 내용으로 기본 배송지 주소가
              수정됩니다.
            </span>
          )}
          <div className="relative ml-[100px] text-xs">
            <input
              className="px-5 py-2 w-[380px] h-10 border hover:cursor-pointer focus:outline-none"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              value={
                deliveryNote === ""
                  ? "배송시 요청사항을 선택해주세요."
                  : deliveryNote
              }
              readOnly
            />
            {isDropdownOpen && (
              <ul className="absolute w-[380px] border z-10">
                {deliveryNotes.map((note) => (
                  <li
                    role="button"
                    key={note}
                    onClick={() => {
                      setField("deliveryNote", note);
                      setIsDropdownOpen(!isDropdownOpen);
                      setField("customDeliveryNote", "");
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
                className="min-w-[400px] w-full h-38 resize-none border focus:border-[1px] focus:border-black focus:outline-none"
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
