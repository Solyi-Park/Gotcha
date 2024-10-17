import { useState } from "react";

export function usePasswordCheck() {
  const [error, setError] = useState<string | null>(null);

  const checkPassword = async (userId: string, password: string) => {
    console.log("현재비번", password);
    const response = await fetch("/api/auth/reconfirm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, password }),
    });

    if (!response.ok) {
      setError(response.statusText || "비밀번호를 다시 확인해주세요");
      return false;
    }
    return true;
  };

  return { checkPassword, error };
}
