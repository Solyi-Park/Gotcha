"use client";
import EditUserInfo from "@/components/EditUserInfo";
import LoadingSpinner from "@/components/LoadingSpinner";
import Reconfirm from "@/components/Reconfirm";
import useMe from "@/hooks/me";
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
  const { user, isLoading, error } = useMe();

  return (
    <div>
      {isLoading && <LoadingSpinner />}
      {slug === "reconfirm" && user && <Reconfirm user={user} />}
      {slug === "info" && user && <EditUserInfo user={user} />}
    </div>
  );
}
