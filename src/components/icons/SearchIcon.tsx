import { getIconSize } from "@/utils/icon";
import { RiSearchLine } from "@react-icons/all-files/ri/RiSearchLine";

type Props = {
  size?: "small" | "medium";
};
export default function SearchIcon({ size = "medium" }: Props) {
  return <RiSearchLine size={getIconSize(size)} />;
}
