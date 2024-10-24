"use client";
import { useEffect, useState } from "react";
import PostcodePopup from "../PostcodePopup";
import InputField from "./new_product/InputField";

type Props = {
  postCode: string;
  address: string;
  addDetail: string;
  handleInputChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

export default function AddressForm({
  postCode,
  address,
  addDetail,
  handleInputChange,
}: Props) {
  const [addressDetail, setAddressDetail] = useState(addDetail);
  useEffect(() => {
    if (addDetail) {
      setAddressDetail(addDetail);
    }
  }, [addDetail]);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex w-96 ">
        <div className="min-w-64 h-10 border mr-2">{postCode}</div>
        <PostcodePopup />
      </div>
      <div className="min-w-[460px] h-10 border">{address}</div>
      <div>
        <InputField
          name="addDetail"
          value={addressDetail}
          onChange={
            handleInputChange
              ? handleInputChange
              : (e) => setAddressDetail(e.target.value)
          }
          type="text"
          placeholder="상세주소 입력"
          style="min-w-[460px] h-10 focus:border-[1px] focus:border-black  focus:outline-none border  "
        />
      </div>
    </div>
  );
}
