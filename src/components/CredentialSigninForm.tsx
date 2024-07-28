"use client";
import { signIn } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useRef, useState } from "react";

type Props = {
  csrfToken: string;
};

export default function CredentialSigninForm({ csrfToken }: Props) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrorMessage("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setErrorMessage("Email and password are required");
      return;
    }

    const result = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });
    console.log("result", result);
    if (result?.error) {
      if (result.status === 401) {
        setErrorMessage("잘못된 이메일 또는 비밀번호입니다.");
      } else {
        setErrorMessage("인증 중 오류가 발생했습니다. 다시 시도해 주세요.");
      }
    } else {
      setErrorMessage(null);
      router.push("/");
    }
  };

  return (
    <form
      className="flex flex-col gap-4 w-[312px] p-6 border rounded-lg"
      onSubmit={handleSubmit}
    >
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <label className="flex flex-col w-[272px]">
        이메일
        <input
          name="email"
          value={formData.email}
          onChange={handleOnChange}
          type="email"
          className="border rounded-md px-2 py-1 mt-2 outline-none"
          required
        />
      </label>
      <label className="flex flex-col w-[272px]">
        비밀번호
        <input
          name="password"
          value={formData.password}
          onChange={handleOnChange}
          type="password"
          className="border rounded-md px-2 py-1 mt-2 outline-none"
          required
        />
      </label>
      <span className="flex justify-center text-xs text-red-500">
        {errorMessage}
      </span>
      <button
        className="bg-black text-white rounded-md px-2 py-2 w-[272px]"
        type="submit"
      >
        로그인
      </button>
    </form>
  );
}
