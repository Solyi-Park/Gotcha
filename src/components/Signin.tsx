"use client";
import { ClientSafeProvider, signIn } from "next-auth/react";
import Image from "next/image";

type Props = {
  providers: Record<string, ClientSafeProvider>;
};
type Provider = {
  name: string;
  image: string;
};
const providersIconImages: Provider[] = [
  {
    name: "Google",
    image: "/images/googleLogo.webp",
  },
  {
    name: "Kakao",
    image: "/images/kakaoLogo.webp",
  },
  {
    name: "Naver",
    image: "/images/naverLogo.webp",
  },
];
function getProviderIcon(providerName: string) {
  const provider = providersIconImages.find(
    (item) => item.name === providerName
  );
  return provider!.image;
}

export default function Signin({ providers }: Props) {
  return (
    <div className="flex gap-2">
      {Object.values(providers).map(({ name, id }) => (
        <button key={name} onClick={() => signIn(id)}>
          <div className="relative w-10 h-10">
            <Image src={getProviderIcon(name)} fill alt={`${name} logo`} />
          </div>
        </button>
      ))}
    </div>
  );
}
