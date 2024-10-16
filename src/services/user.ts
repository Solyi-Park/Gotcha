import { supabase } from "@/app/lib/supabaseClient";
import { AuthUser, FullUser, SimpleUser } from "@/model/user";

export async function addUser(
  name: string,
  email: string,
  password: string
): Promise<FullUser | null> {
  const { data, error } = await supabase
    .from("users")
    .upsert({ name, email, password })
    .select();
  if (error) {
    console.error("Failed to add user", error);
    return null;
  }
  if (data && data.length > 0) {
    console.log("New user data:", data[0]);
    return data[0];
  }
  return null;
}

export async function findUser(
  email: string | null | undefined,
  providerId?: string
) {
  console.log("email 있나요?", email);
  console.log("providerId 있나요?", providerId);
  let query = supabase.from("users").select("*");

  if (email) {
    query = query.eq("email", email);
  }
  if (!email && providerId) {
    query = query.eq("providerId", providerId);
  }
  const { data, error } = await query;

  if (error) {
    console.error("findUser error", error);
    return null;
  }
  return data[0];
}

export async function checkEmail(email: string) {
  const { data, error } = await supabase
    .from("users")
    .select()
    .eq("email", email);

  return data;
}

export async function getUserById(userId: string): Promise<FullUser> {
  const { data, error } = await supabase
    .from("users")
    .select()
    .eq("id", userId)
    .returns<FullUser>()
    .single();
  if (error) {
    console.error(error);
  }
  if (!data) {
    throw new Error("일치하는 사용자가 없음.");
  }
  return data;
}
