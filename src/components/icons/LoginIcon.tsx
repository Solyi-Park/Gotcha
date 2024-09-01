import { getIconSize } from "@/utils/icon";
import { FiLogIn } from "@react-icons/all-files/fi/FiLogIn";

export default function LoginIcon({ size = "small" }: IconSize) {
  return <FiLogIn size={getIconSize(size)} />;
}
