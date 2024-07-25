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
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passRef.current?.value;

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      setError(null);
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
      <button className="border" type="submit">
        로그인
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
