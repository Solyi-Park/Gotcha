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
  // console.log("addDetail몬데", addDetail);
  const [addressDetail, setAddressDetail] = useState(addDetail);
  useEffect(() => {
    if (addDetail !== null) {
      setAddressDetail(addDetail);
    }
  }, [addDetail]);
  return (
    <div className="flex flex-col gap-2 min-w-[370px] w-[383px]">
      <div className="flex w-full h-10 items-center justify-between">
        <div className="min-w-64 h-full border mr-2 w-full flex items-center px-2">
          {postCode}
        </div>
        <div className="w-full h-full">
          <PostcodePopup />
        </div>
      </div>
      <div className="min-w-72 h-10 border flex items-center px-2 text-sm">
        {address}
      </div>
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
          style="min-w-64 w-full h-10 focus:border-[1px] focus:border-black  focus:outline-none border"
        />
      </div>
    </div>
  );
}
