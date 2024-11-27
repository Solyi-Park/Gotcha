import { getIconSize } from "@/utils/icon";
import { IoMdHeart } from "@react-icons/all-files/io/IoMdHeart";

type Props = {
  size: string;
  color?: string;
};
export default function HeartFillIcon({ size, color = "red" }: Props) {
  return <IoMdHeart size={getIconSize(size)} color={color} />;
}
