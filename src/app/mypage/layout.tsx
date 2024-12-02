import { authOptions } from "@/app/lib/auth";
import UserNavBar from "@/components/UserNavBar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

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
    <div className="flex mt-6">
      <UserNavBar />
      <section className="w-full py-5">{children}</section>
    </div>
  );
}
