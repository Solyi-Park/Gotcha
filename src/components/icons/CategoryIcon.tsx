import { getIconSize } from "@/utils/icon";
import { FiMenu } from "@react-icons/all-files/fi/FiMenu";

export default function CategoryIcon({ size = "large" }: IconSize) {
  return <FiMenu size={getIconSize(size)} />;
}
