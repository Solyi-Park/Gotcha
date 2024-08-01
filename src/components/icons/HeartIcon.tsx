import { getIconSize } from "@/utils/icon";
import { IoMdHeartEmpty } from "@react-icons/all-files/io/IoMdHeartEmpty";

type Props = {
  size?: "small" | "medium";
};
export default function HeartIcon({ size = "medium" }: Props) {
  return <IoMdHeartEmpty size={getIconSize(size)} />;
}
