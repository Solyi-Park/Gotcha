import { authOptions } from "@/app/lib/auth";
import LoadingSpinner from "@/components/LoadingSpinner";
import { AuthUser } from "@/model/user";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function EditPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user as AuthUser;
  console.log("회원정보 페이지user", user);

  if (user) {
    if (
      user.provider?.toLowerCase() === "kakao" ||
      user.provider?.toLowerCase() === "naver" ||
      user.provider?.toLowerCase() === "google"
    ) {
      redirect("/mypage/edit/info");
    } else {
      redirect("/mypage/edit/reconfirm");
    }
  }

  return <LoadingSpinner />;
}
