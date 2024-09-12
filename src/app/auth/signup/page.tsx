import { authOptions } from "@/app/lib/auth";
import OAuthSignin from "@/components/OAuthSignin";
import SignupForm from "@/components/SignupForm";
import { getServerSession } from "next-auth";
import { getCsrfToken, getProviders } from "next-auth/react";
import { redirect } from "next/navigation";
import { Providers } from "../signin/page";

export default async function SignupPage() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }

  const allProviders = ((await getProviders()) as Providers) ?? {};
  const filteredProviders = Object.keys(allProviders).reduce((acc, key) => {
    if (key !== "credentials") {
      acc[key] = allProviders[key];
    }
    return acc;
  }, {} as Providers);

  const csrfToken = (await getCsrfToken()) ?? "";

  return (
    <section className="flex flex-col gap-4 w-full items-center h-full justify-center">
      <SignupForm csrfToken={csrfToken} />
      <div className="w-[320px]">
        <OAuthSignin providers={filteredProviders} type="signup" />
      </div>
    </section>
  );
}
