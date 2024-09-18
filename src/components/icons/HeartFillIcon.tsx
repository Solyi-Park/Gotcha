import { getIconSize } from "@/utils/icon";
import { IoMdHeart } from "@react-icons/all-files/io/IoMdHeart";

export default function HeartFillIcon({ size }: { size: string }) {
  return <IoMdHeart size={getIconSize(size)} color="red" />;
}
