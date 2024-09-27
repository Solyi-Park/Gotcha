"use client";
import { useAddress } from "@/store/address";
import React from "react";
import { Address, useDaumPostcodePopup } from "react-daum-postcode";

const PostcodePopup = () => {
  const open = useDaumPostcodePopup();
  const {
    setPostalCode,
    setFullAddress,
    resetFullAddress,
    resetPosalCode,
    resetAddressDetail,
  } = useAddress();

  const handleComplete = (data: Address) => {
    console.log("data", data);
    let fullAddress = data.address;
    let extraAddress = "";
    let postalCode = data.zonecode;

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setPostalCode(postalCode);
    setFullAddress(fullAddress);
    console.log(fullAddress);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
    resetPosalCode();
    resetFullAddress();
    resetAddressDetail();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="text-xs bg-neutral-100 px-3 py-2"
    >
      우편번호 검색
    </button>
  );
};

export default PostcodePopup;
