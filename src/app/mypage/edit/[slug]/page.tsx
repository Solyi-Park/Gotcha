import { authOptions } from "@/app/lib/auth";
import EditUserInfo from "@/components/EditUserInfo";
import Reconfirm from "@/components/Reconfirm";
import { getServerSession } from "next-auth";

type Props = {
  params: { slug: string };
};

export default async function EditPageDetail({ params: { slug } }: Props) {
  const sesssion = await getServerSession(authOptions);
  const user = sesssion?.user;
  console.log("user", user);

  return (
    <div>
      {slug === "reconfirm" && user && <Reconfirm user={user} />}
      {slug === "info" && user && <EditUserInfo />}
    </div>
  );
}
