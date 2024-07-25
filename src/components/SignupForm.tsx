"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useRef } from "react";

type Props = {
  csrfToken: string;
};
export default function SignupForm({ csrfToken }: Props) {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", nameRef.current?.value ?? "");
    formData.append("email", emailRef.current?.value ?? "");
    formData.append("password", passRef.current?.value ?? "");

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
      <label>
        이름
        <input name="name" ref={nameRef} type="text" className="border" />
      </label>
      <label>
        이메일
        <input name="email" ref={emailRef} type="email" className="border" />
      </label>
      <label>
        비밀번호
        <input
          name="password"
          ref={passRef}
          type="password"
          className="border"
        />
      </label>
      <button className="border" type="submit">
        회원가입
      </button>
    </form>
  );
}
