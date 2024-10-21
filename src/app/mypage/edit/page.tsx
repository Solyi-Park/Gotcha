import { authOptions } from "@/app/lib/auth";
import LoadingSpinner from "@/components/LoadingSpinner";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function EditPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (user) {
    if (user.provider === "credentials" || user.provider === null) {
      redirect("/mypage/edit/reconfirm");
    } else {
      redirect("/mypage/edit/info");
    }
  }

  return <LoadingSpinner />;
}
