"use client";
import EditUserInfo from "@/components/EditUserInfo";
import Reconfirm from "@/components/Reconfirm";
import { FullUser, SimpleUser } from "@/model/user";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  params: { slug: string };
};

async function getUserData(): Promise<FullUser> {
  return await fetch("/api/auth/user", {
    method: "GET",
  }).then((res) => res.json());
}

export default function EditPageDetail({ params: { slug } }: Props) {
  const { data: session } = useSession();
  const sessionUser = session?.user as SimpleUser;
  const router = useRouter();

  useEffect(() => {
    if (sessionUser) {
      if (sessionUser.provider) {
        router.push("/mypage/edit/info");
      } else {
        router.push("/mypage/edit/reconfirm");
      }
    }
  }, [sessionUser, router]);

  const { data: user } = useQuery({
    queryKey: ["user", sessionUser?.email, sessionUser?.providerId],
    queryFn: async () => getUserData(),
    staleTime: 60000_15,
  });

  return (
    <div>
      {slug === "reconfirm" && user && <Reconfirm user={user} />}
      {slug === "info" && user && <EditUserInfo user={user} />}
    </div>
  );
}
