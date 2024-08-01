import { getIconSize } from "@/utils/icon";
import { FiMenu } from "@react-icons/all-files/fi/FiMenu";

type Props = {
  size: "small" | "medium";
};
export default function CategoryIcon({ size }: Props) {
  return <FiMenu size={getIconSize(size)} />;
}
