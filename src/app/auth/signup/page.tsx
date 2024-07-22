import SignupForm from "@/components/SignupForm";
import { getCsrfToken } from "next-auth/react";

export default async function SignupPage() {
  const csrfToken = (await getCsrfToken()) ?? "";

  return <SignupForm csrfToken={csrfToken} />;
}
