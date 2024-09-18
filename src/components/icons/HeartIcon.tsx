import { getIconSize } from "@/utils/icon";
import { IoMdHeartEmpty } from "@react-icons/all-files/io/IoMdHeartEmpty";

type Props = { size?: string; color?: string };

export default function HeartIcon({ size = "medium", color }: Props) {
  return <IoMdHeartEmpty size={getIconSize(size)} color={color} />;
}
