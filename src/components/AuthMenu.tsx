import Link from "next/link";

export default function AuthMenu() {
  return (
    <ul className="flex  md:ml-2 items-center justify-end text-neutral-600">
      <li className="flex w-7 sm:w-20 justify-center items-center">
        <Link href="/auth/signin">{/* <AuthButton text="로그인" /> */}</Link>
      </li>
      <li className="hidden sm:block sm:border rounded-xl p-2 sm:w-24 text-center">
        <Link href="/auth/signup">회원가입</Link>
      </li>
    </ul>
  );
}
