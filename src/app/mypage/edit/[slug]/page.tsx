import { authOptions } from "@/app/lib/auth";
import EditUserInfo from "@/components/EditUserInfo";
import Reconfirm from "@/components/Reconfirm";
import { SimpleUser } from "@/model/user";
import { getUserById } from "@/services/user";
import { getServerSession } from "next-auth";

type Props = {
  params: { slug: string };
};
export default async function EditPage({ params: { slug } }: Props) {
  const session = await getServerSession(authOptions);
  const sessionUser = session?.user as SimpleUser;
  const email = sessionUser?.email;

  const user = await getUserById(sessionUser.id);

  return (
    <div>
      {slug === "reconfirm" && email && <Reconfirm user={sessionUser} />}
      {slug === "info" && <EditUserInfo user={user} />}
    </div>
  );
}
