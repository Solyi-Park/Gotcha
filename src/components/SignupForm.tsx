"use client";
import { useErrorMessage } from "@/hooks/errorMessage";
import { validate } from "@/utils/validate";

import { useRouter } from "next/navigation";
import { FormEvent, MouseEventHandler, useState } from "react";

type Props = {
  csrfToken: string;
};

export default function SignupForm({ csrfToken }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailAvailable, setEmailAvailable] = useState<boolean | null>(null);

  const router = useRouter();

  const {
    nameError,
    emailError,
    passwordError,
    confirmPasswordError,
    setEmailError,
  } = useErrorMessage({ name, email, password, confirmPassword });

  const isButtonDisabled =
    nameError !== null ||
    emailError !== null ||
    passwordError !== null ||
    confirmPasswordError !== null;

  const handleEmailCheck = async () => {
    if (emailError || email == "") return;

    await fetch("/api/check-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(email),
    })
      .then((res) => res.json())
      .then((res) => {
        res
          ? setEmailError("이미 존재하는 이메일입니다.")
          : setEmailError("사용가능한 이메일입니다.");
      });
  };

  const handleSubmit = async (e: FormEvent) => {
    const formData = new FormData();
    formData.append("name", name ?? "");
    formData.append("email", email ?? "");
    formData.append("password", password ?? "");

    fetch("/api/auth/signup", {
      method: "POST",
      body: formData,
    }).then((res) => {
      if (!res.ok) {
        return console.log(`${res.status}${res.statusText}`);
      }
      router.push("/auth/signin");
    });
  };

  return (
    <form method="post" className="flex flex-col" onSubmit={handleSubmit}>
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <div>
        <label>
          이름
          <input
            name="name"
            value={name}
            type="text"
            className="border"
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        {nameError && <p>{nameError}</p>}
      </div>
      <div>
        <label>
          이메일
          <input
            name="email"
            value={email}
            type="email"
            className="border"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <button className="border" onClick={handleEmailCheck} type="button">
          중복검사
        </button>
        {emailError && <p>{emailError}</p>}
        {emailAvailable && <p>사용 가능한 이메일입니다.</p>}
      </div>
      <div>
        <label>
          비밀번호
          <input
            name="password"
            value={password}
            type="password"
            className="border"
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <p>{passwordError}</p>}
        </label>
        <p></p>
      </div>
      <div>
        <label>
          비밀번호 확인
          <input
            name="passwordCheck"
            value={confirmPassword}
            type="password"
            className="border"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        {confirmPasswordError && <p>{confirmPasswordError}</p>}
      </div>
      <button
        className={`border  ${isButtonDisabled && "bg-gray-200 text-white"}`}
        type="submit"
        disabled={isButtonDisabled}
      >
        회원가입
      </button>
    </form>
  );
}
