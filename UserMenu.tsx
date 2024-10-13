import AuthButton from "@/components/buttons/AuthButton ";
import HeartIcon from "@/components/icons/HeartIcon";
import LoginIcon from "@/components/icons/LoginIcon";
import LogoutIcon from "@/components/icons/LogoutIcon";
import ShoppingBagIcon from "@/components/icons/ShoppingBagIcon";
import UserIcon from "@/components/icons/UserIcon";
import { SimpleUser } from "@/model/user";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

type Props = {
  user: SimpleUser | undefined;
};
export default function UserMenu({ user }: Props) {
  const menuItems = [
    { title: "MY PAGE", href: "/mypage", icon: <UserIcon size="small" /> },
    {
      title: "LIKE",
      href: "/mypage/like",
      icon: <HeartIcon size="small" />,
    },
    {
      title: "SHOPPING BAG",
      href: "/cart",
      icon: <ShoppingBagIcon size={"small"} />,
    },
  ];
  return (
    <div className="hidden sm:flex gap-5">
      <ul className="flex gap-5">
        {menuItems.map((item) => (
          <Link href={item.href} key={item.title}>
            <li className="flex items-center gap-[3px]">
              <span>{item.icon}</span>
              <span className="text-xs">{item.title}</span>
            </li>
          </Link>
        ))}
      </ul>
      <div className="flex items-center">
        {user ? <LogoutIcon size="small" /> : <LoginIcon size="small" />}
        <AuthButton
          text={user ? "LOGOUT" : "LOGIN"}
          onClick={user ? () => signOut() : () => signIn()}
        />
      </div>
    </div>
  );
}
