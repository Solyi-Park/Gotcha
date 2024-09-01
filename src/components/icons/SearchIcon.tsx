import { getIconSize } from "@/utils/icon";
import { RiSearchLine } from "@react-icons/all-files/ri/RiSearchLine";

export default function SearchIcon({ size = "medium" }: IconSize) {
  return <RiSearchLine size={getIconSize(size)} />;
}
