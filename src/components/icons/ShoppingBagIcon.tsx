import { getIconSize } from "@/utils/icon";
import { RiShoppingBagLine } from "@react-icons/all-files/ri/RiShoppingBagLine";

type Props = {
  size: "small" | "medium";
};
export default function ShoppingBagIcon({ size }: Props) {
  return <RiShoppingBagLine size={getIconSize(size)} />;
}
