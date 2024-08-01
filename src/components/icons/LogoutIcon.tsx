import { getIconSize } from "@/utils/icon";
import { FiLogOut } from "@react-icons/all-files/fi/FiLogOut";

type Props = {
  size?: "small" | "medium";
};
export default function LogoutIcon({ size = "small" }: Props) {
  return <FiLogOut size={getIconSize(size)} />;
}
