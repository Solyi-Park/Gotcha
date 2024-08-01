import { getIconSize } from "@/utils/icon";
import { RiUserLine } from "@react-icons/all-files/ri/RiUserLine";

type Props = {
  size?: "small" | "medium";
};
export default function UserIcon({ size = "medium" }: Props) {
  return <RiUserLine size={getIconSize(size)} />;
}
