import { authOptions } from "@/app/lib/auth";
import { getServerSession } from "next-auth";
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
