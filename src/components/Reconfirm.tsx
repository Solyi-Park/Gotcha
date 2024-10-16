"use client";
import { SimpleUser } from "@/model/user";
import { Span } from "next/dist/trace";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  user: SimpleUser;
};
export default function Reconfirm({ user }: Props) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const userId = user.id;

  const maskedEmail = maskEmail(user.email!);
  const router = useRouter();
  const handleClick = async () => {
    const response = await fetch("/api/auth/reconfirm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, password }),
    });

    if (!response.ok) {
      setError(response.statusText || "비밀번호를 다시 확인해주세요");
      return;
    }
    router.push("/mypage/edit/info");
  };

  return (
    <fieldset>
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
        onClick={handleClick}
        type="submit"
      >
        다음
      </button>
    </fieldset>
  );
}

function maskEmail(email: string) {
  const [userId, domain] = email.split("@");
  const visiblePart = userId.slice(0, 3);
  const maskedId = visiblePart + "*".repeat(userId.length - 3);

  const [domainName, topLevelDomain] = domain.split(".");
  const maskedDomain = "*".repeat(domainName.length) + "." + topLevelDomain;
  return `${maskedId}@${maskedDomain}`;
}
