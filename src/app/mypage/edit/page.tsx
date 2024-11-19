import { authOptions } from "@/app/lib/auth";
import LoadingSpinner from "@/components/LoadingSpinner";
import { PROVIDERS_NAME } from "@/constants/provider";
import { AuthUser } from "@/model/user";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function EditPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user as AuthUser;
  console.log("회원정보 페이지user", user);

  if (user) {
    const isOauthProvider = PROVIDERS_NAME.includes(
      user.provider?.toLowerCase() || ""
    );
    const redirectPath = isOauthProvider
      ? "/mypage/edit/info"
      : "/mypage/edit/reconfirm";

    redirect(redirectPath);
  }

  return <LoadingSpinner />;
}
