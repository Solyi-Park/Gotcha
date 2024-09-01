import { getIconSize } from "@/utils/icon";
import { RiUserLine } from "@react-icons/all-files/ri/RiUserLine";

export default function UserIcon({ size = "medium" }: IconSize) {
  return <RiUserLine size={getIconSize(size)} />;
}
