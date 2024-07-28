import { FiLogIn } from "@react-icons/all-files/fi/FiLogIn";
import { FiLogOut } from "@react-icons/all-files/fi/FiLogOut";

type Props = {
  text: "로그인" | "로그아웃";
};
export default function AuthIcon({ text }: Props) {
  return text === "로그인" ? <FiLogIn /> : <FiLogOut />;
}
