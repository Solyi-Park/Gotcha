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
import Link from "next/link";

export type Providers = Record<string, ClientSafeProvider>;

export default async function SignInPage() {
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
    <section className="flex flex-col items-center gap-6">
      <CredentialSigninForm csrfToken={csrfToken} />
      <div>
        <p>
          계정이 없으신가요?
          <span className="ml-1 text-blue-900 text-sm">
            <Link href="/auth/signup">회원가입</Link>
          </span>
        </p>
      </div>

      <OAuthSignin providers={filteredProviders} type="signin" />
    </section>
  );
}
