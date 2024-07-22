import Image from "next/image";
type Props = {
  image?: string | null;
};
export default function Avatar({ image }: Props) {
  return (
    <div className="relative w-6 h-6 rounded-full overflow-hidden">
      <Image src={image ?? ""} fill alt="user avatar" />
    </div>
  );
}
