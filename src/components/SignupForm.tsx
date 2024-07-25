"use client";
import { useErrorMessage } from "@/hooks/errorMessage";
import { validate } from "@/utils/validate";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type Props = {
  csrfToken: string;
};

export default function SignupForm({ csrfToken }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  const { nameError, emailError, passwordError, confirmPasswordError } =
    useErrorMessage({ name, email, password, confirmPassword });

  const isButtonDisabled =
    nameError !== null ||
    emailError !== null ||
    passwordError !== null ||
    confirmPasswordError !== null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

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
        <p>{name}</p>
        <p>{nameError}</p>
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
        <p>{emailError}</p>
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
          {passwordError}
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
        <p>{confirmPasswordError}</p>
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
