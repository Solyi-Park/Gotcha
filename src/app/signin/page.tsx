"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function SiginPage() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in
        <br />
        <button className="p-3 border" onClick={() => signOut()}>
          Sign out
        </button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button className="p-3 border" onClick={() => signIn()}>
        Sign in
      </button>
    </>
  );
}
