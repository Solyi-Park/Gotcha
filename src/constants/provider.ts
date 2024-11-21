type Provider = {
  name: string;
  activeImage: string;
  inactiveImage: string;
};

export const PROVIDER_LOGOS: Provider[] = [
  {
    name: "google",
    activeImage: "/images/googleLogo.webp",
    inactiveImage: "/images/googleGray.png",
  },
  {
    name: "kakao",
    activeImage: "/images/kakaoLogo.webp",
    inactiveImage: "/images/kakaoGray.png",
  },
  {
    name: "naver",
    activeImage: "/images/naverLogo.webp",
    inactiveImage: "/images/naverGray.png",
  },
];

export const PROVIDERS_NAME = PROVIDER_LOGOS.map((provider) => provider.name);
