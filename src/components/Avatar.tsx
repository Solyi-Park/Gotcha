import Image from "next/image";
type Props = {
  image?: string | null;
};
export default function Avatar({ image }: Props) {
  return <Image src={image ?? ""} width={30} height={30} alt="user avatar" />;
}
