import { authOptions } from "@/app/lib/auth";
import SignupForm from "@/components/SignupForm";
import { getServerSession } from "next-auth";
import { getCsrfToken } from "next-auth/react";
import { redirect } from "next/navigation";

export default async function SignupPage() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }
  const csrfToken = (await getCsrfToken()) ?? "";

  return <SignupForm csrfToken={csrfToken} />;
}
