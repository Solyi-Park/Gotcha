import {
  ClientSafeProvider,
  getCsrfToken,
  getProviders,
} from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import OAuthSignin from "@/components/OAuthSignin";
import CredentialSigninForm from "@/components/CredentialSigninForm";

type Providers = Record<string, ClientSafeProvider>;

export default async function SignInPage() {
  const session = await getServerSession(authOptions);

  const allProviders = ((await getProviders()) as Providers) ?? {};
  const filteredProviders = Object.keys(allProviders).reduce((acc, key) => {
    if (key !== "credentials") {
      acc[key] = allProviders[key];
    }
    return acc;
  }, {} as Providers);

  const csrfToken = (await getCsrfToken()) ?? "";

  if (session) {
    redirect("/");
  }

  return (
    <section>
      <CredentialSigninForm csrfToken={csrfToken} />
      <OAuthSignin providers={filteredProviders} />
    </section>
  );
}
