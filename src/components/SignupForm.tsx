"use client";
import { useErrorMessage } from "@/hooks/errorMessage";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  csrfToken: string;
};

export default function SignupForm({ csrfToken }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailAvailable, setEmailAvailable] = useState<boolean>(false);

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
    confirmPasswordError !== null ||
    emailAvailable == false;

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
        if (res) {
          setEmailError("이미 사용중인 이메일 입니다.");
          setEmailAvailable(false);
        }
        if (!res) {
          setEmailError(null);
          setEmailAvailable(true);
        }
      });
  };

  const handleSubmit = async () => {
    if (!emailAvailable) return;

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
    <form
      method="post"
      className="flex flex-col gap-5 w-full border rounded-lg p-6 "
      onSubmit={handleSubmit}
    >
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <div>
        <label className="flex flex-col">
          이름
          <input
            name="name"
            value={name}
            type="text"
            className="border rounded-md px-2 py-1 outline-none"
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        {nameError && (
          <span className="ml-1 text-xs text-rose-400">{nameError}</span>
        )}
      </div>
      <div>
        <label className="flex flex-col">
          이메일
          <div className="flex gap-2 items-center">
            <input
              name="email"
              value={email}
              type="email"
              className="w-full border rounded-md px-2 py-1 outline-none"
              onChange={(e) => {
                setEmailAvailable(false);
                setEmailError(null);
                setEmail(e.target.value);
              }}
            />
            <button
              className="bg-black opacity-70 hover:opacity-100 text-white w-20 h-8 text-xs rounded-md"
              onClick={handleEmailCheck}
              type="button"
            >
              중복확인
            </button>
          </div>
        </label>
        {emailError && (
          <span className="ml-1 text-xs text-rose-400">{emailError}</span>
        )}
        {emailAvailable && (
          <span className="ml-1 text-xs text-blue-500">
            사용 가능한 이메일입니다.
          </span>
        )}
      </div>
      <div>
        <label className="flex flex-col">
          비밀번호
          <input
            name="password"
            value={password}
            type="password"
            className="border rounded-md px-2 py-1 outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && (
            <span className="ml-1 text-xs text-rose-400">{passwordError}</span>
          )}
        </label>
      </div>
      <div>
        <label className="flex flex-col">
          비밀번호 확인
          <input
            name="passwordCheck"
            value={confirmPassword}
            type="password"
            className="border rounded-md px-2 py-1 outline-none"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        {confirmPasswordError && (
          <span className="ml-1 text-xs text-rose-400">
            {confirmPasswordError}
          </span>
        )}
      </div>
      <button
        className={`border  ${
          isButtonDisabled && "bg-gray-200 text-white"
        } p-2 rounded-lg bg-black text-white`}
        type="submit"
        disabled={isButtonDisabled}
      >
        회원가입
      </button>
    </form>
  );
}
