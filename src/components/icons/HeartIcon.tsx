import { getIconSize } from "@/utils/icon";
import { IoMdHeartEmpty } from "@react-icons/all-files/io/IoMdHeartEmpty";

export default function HeartIcon({ size = "medium" }: IconSize) {
  return <IoMdHeartEmpty size={getIconSize(size)} />;
}
