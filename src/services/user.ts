import { supabase } from "@/app/lib/supabaseClient";
import { AuthUser, FullUser, SimpleUser } from "@/model/user";

// export async function addUser(user: SimpleUser) {
//   const { data } = await supabase.from("users").insert(user).select().single();
//   return data;
// }

export async function addUser(user: AuthUser): Promise<FullUser | null> {
  const { data, error } = await supabase.from("users").upsert(user).select();
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

// export async function addCredentialUser(
//   name: string,
//   email: string,
//   password: string
// ) {
//   const userData = {
//     _id: uuidv4(),
//     _type: "user",
//     name,
//     username: "",
//     password,
//     image: "",
//     email,
//     reviews: [],
//     following: [],
//     followers: [],
//     collection: [],
//   };
//   return client.createIfNotExists(userData);
// }

// export async function findUserByEmail(email: string) {
//   return await client.fetch(`*[_type == "user" && email == "${email}"][0]{
//       "id": _id,
//       username,
//       name,
//       email,
//       image,
//       password,
//       reviews[]->{"id":_id},
//       following[]->{username,name, "id":_id},
//       followers[]->{username,name,"id":_id},
//       collection[]->{"id":_id},
//       }`);
// }

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

// export async function checkEmail(email: string) {
//   return await client.fetch(`*[_type == "user" && email == "${email}"][0]{
//       "id": _id,
//       username,
//       name,
//       email,
//       image,
//       }`);
// }

export async function checkEmail(email: string) {
  const { data, error } = await supabase
    .from("users")
    .select()
    .eq("email", email);

  return data;
}
