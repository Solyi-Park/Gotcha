"use client";
import EditUserInfo from "@/components/EditUserInfo";
import Reconfirm from "@/components/Reconfirm";
import { FullUser, SimpleUser } from "@/model/user";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  params: { slug: string };
};
export default function EditPageDetail({ params: { slug } }: Props) {
  const { data: session } = useSession();
  const sessionUser = session?.user as SimpleUser;
  const router = useRouter();

  const [userData, setUserData] = useState<FullUser | null>(null);

  useEffect(() => {
    if (sessionUser) {
      if (sessionUser.provider) {
        router.push("/mypage/edit/info");
      } else {
        router.push("/mypage/edit/reconfirm");
      }
    }
  }, [sessionUser, router]);
  const email = sessionUser?.email;

  useEffect(() => {
    if (sessionUser) {
      const getUserData = async () => {
        const data = await fetch("/api/auth/user", {
          method: "GET",
        }).then((res) => res.json());
        setUserData(data);
      };
      getUserData();
    }
  }, [sessionUser]);

  return (
    <div>
      {slug === "reconfirm" && userData !== null && (
        <Reconfirm user={userData} />
      )}
      {slug === "info" && userData !== null && <EditUserInfo user={userData} />}
    </div>
  );
}
