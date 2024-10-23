import { supabase } from "@/app/lib/supabaseClient";
import { AuthUser, FullUser } from "@/model/user";
import { hashPassword, verifyPassword } from "@/utils/password";
import { v4 as uuidv4 } from "uuid";

type NewUser = {
  email: string | null;
  name: string;
  password?: string;
  image?: string | null;
  provider?: string;
  id?: string;
};
// TODO: 수정하기
export async function addUser(user: NewUser): Promise<FullUser | null> {
  const { email, name, password, image, provider, id } = user;

  if (!email && !provider) {
    console.error("이메일 또는 Provider가 필요합니다.");
    return null;
  }

  const { data: existingUser, error: findError } = await supabase
    .from("users")
    .select("*")
    .or(`email.eq.${email},provider.eq.${provider}`)
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
      id: uuidv4(),
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
      id,
    };
  }
  const { data, error } = await supabase.from("users").insert(newUser).select();

  if (error) {
    console.error("사용자 추가 실패", error);
    return null;
  }

  if (data && data.length > 0) {
    console.log("새 사용자:", data[0]);
    return data[0];
  }

  return null;
}
//TODO:이메일로 찾는 로직, id로 찾는로직 분리하기.
export async function findUser(email: string | null | undefined, id?: string) {
  console.log("email 있나요?", email);
  console.log("id 있나요?", id);

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .or(`id.eq.${id}, email.eq.${email}`);

  if (error) {
    console.error("findUser error", error);
    return null;
  }
  return data[0];
}

export async function checkIfEmailExists(email: string) {
  const { data, error } = await supabase
    .from("users")
    .select()
    .eq("email", email);

  if (error) {
    throw new Error(error.message);
  }
  if (data && data.length > 0) {
    console.log("checkIfEmailExists?", data);
    return data[0];
  }
  return null;
}

export async function checkIfPhoneNumberExists(phoneNumber: string) {
  console.log("phoneNumber", phoneNumber);
  const { data, error } = await supabase
    .from("users")
    .select()
    .eq("phone", phoneNumber);

  if (error) {
    throw new Error(error.message);
  }
  if (data && data.length > 0) {
    console.log("checkIfPhoneNumberExists?", data);
    return data[0];
  }
  return null;
}

export async function getUser(userId: string): Promise<FullUser | null> {
  if (!userId) {
    console.error("이메일 또는 Provider ID가 필요합니다.");
    return null;
  }

  const { data, error } = await supabase
    .from("users")
    .select()
    .eq("id", userId)
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
//TODO: getUser 로직 정리하기
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
  userId: string,
  newPhoneNumber: string
) {
  const userExists = await checkIfPhoneNumberExists(newPhoneNumber);
  if (userExists) {
    throw new Error("이미 등록된 번호입니다.");
  }
  const { error } = await supabase
    .from("users")
    .update({ phone: newPhoneNumber })
    .eq("id", userId);

  if (error) {
    console.error(error);
    throw new Error("연락처 변경 중 오류가 발생했습니다.");
  }
  return null;
}

export async function changeEmail(userId: string, newEmail: string) {
  const userExists = await checkIfEmailExists(newEmail);
  console.log("userExists", userExists);
  if (userExists) {
    throw new Error("이미 등록된 이메일입니다.");
  }

  const { error } = await supabase
    .from("users")
    .update({ email: newEmail })
    .eq("id", userId);

  if (error) {
    console.error(error);
    throw new Error(
      `이메일 변경 중 오류가 발생했습니다. Error:${error.message}`
    );
  }
  return null;
}
