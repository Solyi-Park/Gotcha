"use client";
import { signIn } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";

type Props = {
  csrfToken: string;
};

export default function CredentialSigninForm({ csrfToken }: Props) {
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const email = emailRef.current?.value;
    const password = passRef.current?.value;

    if (!email || !password) {
      setErrorMessage("Email and password are required");
      return;
    }

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
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
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <label>
        이메일
        <input
          name="email"
          ref={emailRef}
          type="email"
          className="border"
          required
        />
      </label>
      <label>
        비밀번호
        <input
          name="password"
          ref={passRef}
          type="password"
          className="border"
          required
        />
      </label>
      <span>{errorMessage}</span>
      <button className="border" type="submit">
        로그인
      </button>
    </form>
  );
}
