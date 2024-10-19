import { supabase } from "@/app/lib/supabaseClient";
import { AuthUser, FullUser } from "@/model/user";
import { hashPassword, verifyPassword } from "@/utils/password";

type NewUser = {
  email: string | null;
  name: string;
  password?: string;
  image?: string | null;
  provider?: string;
  providerId?: string;
};
export async function addUser(user: NewUser): Promise<FullUser | null> {
  const { email, name, password, image, provider, providerId } = user;

  if (!email && !providerId) {
    console.error("이메일 또는 Provider ID가 필요합니다.");
    return null;
  }

  const { data: existingUser, error: findError } = await supabase
    .from("users")
    .select("*")
    .or(`email.eq.${email},providerId.eq.${providerId}`)
    .single();

  if (findError && findError.code !== "PGRST116") {
    console.error("User check failed", findError);
    return null;
  }

  if (existingUser) {
    console.log("이미 존재하는 사용자:", existingUser);
    return existingUser;
  }

  let newUser;
  if (!provider && password) {
    const hashedPassword = await hashPassword(password);
    newUser = {
      name,
      email,
      password: hashedPassword,
    };
  } else {
    newUser = {
      name,
      email,
      image,
      provider,
      providerId,
    };
  }

  const { data, error } = await supabase.from("users").insert(newUser).select();

  if (error) {
    console.error("사용자 추가 실패", error);
    return null;
  }

  if (data && data.length > 0) {
    console.log("새 사용자 데이터:", data[0]);
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

export async function getUser(user: AuthUser): Promise<FullUser | null> {
  const { email, providerId } = user;

  if (!email && !providerId) {
    console.error("이메일 또는 Provider ID가 필요합니다.");
    return null;
  }

  const { data, error } = await supabase
    .from("users")
    .select()
    .or(`email.eq.${email},providerId.eq.${providerId}`)
    .returns<FullUser>()
    .single();
  if (error) {
    throw new Error(error.message);
  }
  if (!data) {
    throw new Error("일치하는 사용자가 없습니다.");
  }

  // if (error || !data) {
  //   throw new Error("일치하는 사용자가 없습니다.");
  // }
  return data;
}

export async function getUserByEmail(email: string): Promise<FullUser> {
  const { data, error } = await supabase
    .from("users")
    .select()
    .eq("email", email)
    .returns<FullUser>()
    .single();
  if (error) {
    throw new Error(error.message);
  }
  if (!data) {
    throw new Error("일치하는 사용자가 없습니다.");
  }

  // if (error || !data) {
  //   throw new Error("일치하는 사용자가 없습니다.");
  // }
  return data;
}

export async function checkUserPassword(
  email: string,
  password: string
): Promise<boolean> {
  const user = await getUserByEmail(email);

  const hashedPassword = user.password || "";
  const isMatch = await verifyPassword(password, hashedPassword);
  return isMatch;
}

export async function changePassword(
  email: string,
  newPassword: string
): Promise<void> {
  const hashedPassword = await hashPassword(newPassword);

  const { error } = await supabase
    .from("users")
    .update({ password: hashedPassword })
    .eq("email", email);

  if (error) {
    throw new Error("비밀번호 변경 중 오류가 발생했습니다.");
  }
}

type UserData = {
  email: string;
  providerId: string;
};

export async function changePhoneNumber(
  user: UserData,
  newPhoneNumber: string
): Promise<void> {
  const { email, providerId } = user;

  const { error } = await supabase
    .from("users")
    .update({ phone: newPhoneNumber })
    .or(`email.eq.${email},providerId.eq.${providerId}`);

  if (error) {
    throw new Error("연락처 변경 중 오류가 발생했습니다.");
  }
}

export async function changeEmail(
  user: UserData,
  newEmail: string
): Promise<void> {
  const { email, providerId } = user;

  const { error } = await supabase
    .from("users")
    .update({ email: newEmail })
    .or(`email.eq.${email},providerId.eq.${providerId}`);

  if (error) {
    throw new Error("이메일 변경 중 오류가 발생했습니다.");
  }
}
