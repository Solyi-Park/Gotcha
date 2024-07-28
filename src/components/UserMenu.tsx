import Link from "next/link";
import Avatar from "./Avatar";
import AuthButton from "./AuthButton ";
import { signOut } from "next-auth/react";
import NotificationIcon from "./icons/NotificationIcon";

type Props = {
  user: User | undefined;
};
export default function UserMenu({ user }: Props) {
  return (
    <ul className="flex gap-1 md:ml-2 md:gap-3 items-center justify-end text-neutral-600">
      {user && (
        <li className="flex items-center justify-center w-7 sm:w-10">
          <span className="hidden sm:inline">알림</span>
          <span className="sm:hidden text-xl">
            <NotificationIcon />
          </span>
        </li>
      )}
      {user && (
        <li className="">
          <Link href={`/user/${user.id}`}>
            <Avatar image={user.image} />
          </Link>
        </li>
      )}
      <li className="flex w-7 sm:w-24 justify-center items-center">
        {user ? (
          <AuthButton text="로그아웃" onClick={() => signOut()} />
        ) : (
          <Link href="/auth/signin">
            <AuthButton text="로그인" />
          </Link>
        )}
      </li>
      {!user && (
        <li className="hidden sm:block sm:border rounded-xl p-2 sm:w-24 text-center">
          <Link href="/auth/signup">회원가입</Link>
        </li>
      )}
    </ul>
  );
}
