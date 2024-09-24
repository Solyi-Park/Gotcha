import { getIconSize } from "@/utils/icon";
import { CgCloseO } from "@react-icons/all-files/cg/CgCloseO";

export default function DeleteIcon({ size = "large" }: IconSize) {
  return <CgCloseO size={getIconSize(size)} />;
}
