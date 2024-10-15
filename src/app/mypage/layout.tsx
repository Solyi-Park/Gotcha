import { authOptions } from "@/app/lib/auth";
import UserNavBar from "@/components/UserNavBar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import MyPageContent from "./[slug]/page";

export default async function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    redirect("/auth/signin");
  }

  return (
    <div className="flex">
      <UserNavBar user={user} />
      <section>{children}</section>
    </div>
  );
}
