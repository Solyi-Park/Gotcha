import { getIconSize } from "@/utils/icon";
import { RiShoppingBagLine } from "@react-icons/all-files/ri/RiShoppingBagLine";

export default function ShoppingBagIcon({ size = "small" }: IconSize) {
  return <RiShoppingBagLine size={getIconSize(size)} />;
}
