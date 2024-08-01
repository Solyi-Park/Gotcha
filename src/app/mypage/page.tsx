import { authOptions } from "@/app/lib/auth";
import AuthButton from "@/components/AuthButton ";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

type Props = {
  params: { slug: string };
};

export default async function MyPage({ params: { slug } }: Props) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  console.log("user", user);
  if (!user) {
    redirect("/auth/signin");
  }

  return <div>myPage</div>;
}
