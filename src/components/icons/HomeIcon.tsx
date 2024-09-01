import { getIconSize } from "@/utils/icon";
import { RiHomeFill } from "@react-icons/all-files/ri/RiHomeFill";

export default function HomeIcon({ size = "large" }: IconSize) {
  return <RiHomeFill size={getIconSize(size)} />;
}
