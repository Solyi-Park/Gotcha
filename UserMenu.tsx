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
    <div>
      <ul className="hidden sm:flex gap-5">
        {menuItems.map((item) => (
          <Link href={item.href} key={item.title}>
            <li className="flex items-center gap-[3px]">
              <span>{item.icon}</span>
              <span className="text-xs">{item.title}</span>
            </li>
          </Link>
        ))}
        <AuthButton
          text={user ? "LOGOUT" : "LOGIN"}
          onClick={user ? () => signOut() : () => signIn()}
        />
      </ul>
      <div className="sm:hidden flex gap-3">
        <Link href="/cart" className="">
          <ShoppingBagIcon size="medium" />
        </Link>
        {!user && <AuthButton text="LOGIN" onClick={() => signIn()} />}
      </div>
    </div>
  );
}
