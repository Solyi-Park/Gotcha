import { getIconSize } from "@/utils/icon";
import { FiLogIn } from "@react-icons/all-files/fi/FiLogIn";

type Props = {
  size?: "small" | "medium";
};

export default function LoginIcon({ size = "small" }: Props) {
  return <FiLogIn size={getIconSize(size)} />;
}
