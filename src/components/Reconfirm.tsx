"use client";
import { usePasswordCheck } from "@/hooks/password";
import { FullUser, SimpleUser } from "@/model/user";
import { maskEmail } from "@/utils/maskPersonalInfo";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SectionTitle from "./SectionTitle";

type Props = {
  user: SimpleUser;
};
export default function Reconfirm({ user }: Props) {
  const [password, setPassword] = useState("");
  const email = user.email;

  const { checkPassword, error } = usePasswordCheck();

  const router = useRouter();
  //TODO: 패스워드 체크 반복.
  const handleCheckPassword = async () => {
    const isValid = await checkPassword(email || "", password);
    console.log("isValid", isValid);
    if (isValid) {
      router.push("/mypage/edit/info");
    }
  };

  return (
    <fieldset>
      <legend className="hidden">비밀번호 재확인 절차</legend>
      <div className="flex">
        <SectionTitle
          title="비밀번호 재확인"
          description="회원님의 소중한 정보보호를 위해 비밀번호를 재확인하고 있습니다."
        />
      </div>
      <div className="flex flex-col gap-3 py-5 border-b text-sm">
        <div className="flex w-full py-2">
          <strong className="font-normal w-20">아이디</strong>
          <p className="font-semibold">{maskEmail(user.email!)}</p>
        </div>
        <div className="flex items-center">
          <label className="w-20" htmlFor="password">
            비밀번호
          </label>
          <input
            className="border outline-none w-full sm:w-56 p-2 focus:border-black"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <span className="text-red-500">비밀번호를 다시 확인해주세요.</span>
          )}
        </div>
      </div>
      <div className="flex justify-center my-6">
        <button
          className="flex w-full sm:w-60 justify-center py-3 bg-black text-white outline-none"
          onClick={handleCheckPassword}
          type="submit"
        >
          다음
        </button>
      </div>
    </fieldset>
  );
}
