type Provider = {
  name: string;
  activeImage: string;
  inactiveImage: string;
};

export const PROVIDER_LOGOS: Provider[] = [
  {
    name: "GOOGLE",
    activeImage: "/images/googleLogo.webp",
    inactiveImage: "/images/googleGray.png",
  },
  {
    name: "KAKAO",
    activeImage: "/images/kakaoLogo.webp",
    inactiveImage: "/images/kakaoGray.png",
  },
  {
    name: "NAVER",
    activeImage: "/images/naverLogo.webp",
    inactiveImage: "/images/naverGray.png",
  },
];
