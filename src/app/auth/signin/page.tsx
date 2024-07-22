import { ClientSafeProvider, getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import Signin from "@/components/Signin";

export default async function SignInPage() {
  const session = await getServerSession(authOptions);

  const providers = (await getProviders()) ?? {};

  if (session) {
    redirect("/");
  }

  return (
    <section>
      <Signin providers={providers} />
    </section>
  );
}
