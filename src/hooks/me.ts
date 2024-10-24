"use client";
import { FullUser } from "@/model/user";
import { useQuery } from "@tanstack/react-query";
export default function useMe() {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async (): Promise<FullUser> => {
      return await fetch("/api/me", {
        method: "GET",
      }).then((res) => res.json());
    },
  });

  return { user, isLoading, error };
}
