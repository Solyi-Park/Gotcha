"use client";
import { usePasswordCheck } from "@/hooks/password";
import { FullUser, SimpleUser } from "@/model/user";
import { maskEmail } from "@/utils/maskPersonalInfo";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  user: SimpleUser;
};
export default function Reconfirm({ user }: Props) {
  const [password, setPassword] = useState("");
  const email = user.email;

  const maskedEmail = maskEmail(user.email!);
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
      <div>
        <h2>비밀번호 재확인</h2>
        <span>
          비밀번호 재확인 회원님의 소중한 정보보호를 위해 비밀번호를 재확인하고
          있습니다.
        </span>
      </div>
      <div></div>
      <div className="flex">
        <strong>아이디</strong>
        <p className="font-semibold">{maskedEmail}</p>
      </div>
      <div className="flex flex-col">
        <label htmlFor="password">비밀번호</label>
        <input
          className="border outline-none"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <span className="text-red-500">비밀번호를 다시 확인해주세요.</span>
        )}
      </div>
      <button
        className="px-16 py-3 bg-black text-white"
        onClick={handleCheckPassword}
        type="submit"
      >
        다음
      </button>
    </fieldset>
  );
}
