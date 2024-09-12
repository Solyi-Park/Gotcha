import { getIconSize } from "@/utils/icon";
import { FiLogOut } from "@react-icons/all-files/fi/FiLogOut";

export default function LogoutIcon({ size = "small" }: IconSize) {
  return <FiLogOut size={getIconSize(size)} />;
}
