"use client";
import { PROVIDER_LOGOS } from "@/constants/provider";
import { ClientSafeProvider, signIn } from "next-auth/react";
import Link from "next/link";

type Props = {
  providers: Record<string, ClientSafeProvider>;
  type: "signin" | "signup";
};

export function getProviderIcon(providerName: string) {
  const provider = PROVIDER_LOGOS.find(
    (item) => item.name === providerName.toLowerCase()
  );
  if (!provider) {
    console.error(`Provider logo not found for: ${providerName}`);
  }

  return provider?.activeImage;
}
export default function OAuthSignin({ providers, type }: Props) {
  return (
    <div className="flex flex-col w-full gap-3 sm:gap-5">
      <div className="flex w-full items-center justify-center my-4">
        <hr className="border-t  border-gray-300 flex-grow" />
        <span className="mx-4 text-gray-500">OR</span>
        <hr className="border-t border-gray-300 flex-grow" />
      </div>
      {type === "signup" && (
        <p className="w-full text-center text-sm">
          <Link className="underline" href="/auth/signin">
            다른 방법으로 로그인하기
          </Link>
        </p>
      )}
      <ul className="flex items-center justify-center gap-6">
        <li key="google">
          <button onClick={() => signIn("google")}>
            <div className="relative w-10 h-10">
              <img
                src={getProviderIcon("Google")}
                className="object-cover"
                alt="Google Logo"
              />
            </div>
          </button>
        </li>
        <li key="kakao">
          <button onClick={() => signIn("kakao")}>
            <div className="relative w-10 h-10">
              <img
                src={getProviderIcon("Kakao")}
                className="object-cover"
                alt="Kakao Logo"
              />
            </div>
          </button>
        </li>
        <li key="naver">
          <button onClick={() => signIn("naver")}>
            <div className="relative w-10 h-10">
              <img
                src={getProviderIcon("Naver")}
                className="object-cover"
                alt="Naver Logo"
              />
            </div>
          </button>
        </li>

        {/* {Object.values(providers).map(({ name, id }) => (
          <button key={name} onClick={() => signIn(id)}>
            <div className="relative w-10 h-10">
              <img
                src={getProviderIcon(name)}
                className="object-cover"
                alt={`${name} logo`}
              />
            </div>
          </button>
        ))} */}
      </ul>
    </div>
  );
}
