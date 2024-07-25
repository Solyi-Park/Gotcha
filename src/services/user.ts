import { client } from "./sanity";
import { v4 as uuidv4 } from "uuid";

export async function addUser({ id, email, name, username, image }: User) {
  const userData = {
    _id: id,
    _type: "user",
    name,
    username,
    image,
    email,
    reviews: [],
    following: [],
    followers: [],
    collection: [],
  };

  return client.createIfNotExists(userData);
}

export async function addCredentialUser(
  name: string,
  email: string,
  password: string
) {
  const userData = {
    _id: uuidv4(),
    _type: "user",
    name,
    username: "",
    password,
    image: "",
    email,
    reviews: [],
    following: [],
    followers: [],
    collection: [],
  };
  return client.createIfNotExists(userData);
}

export async function findUserByEmail(email: string) {
  return await client.fetch(`*[_type == "user" && email == "${email}"][0]{
      "id": _id,
      username,
      name,
      email,
      image,
      password,
      reviews[]->{"id":_id},
      following[]->{username,name, "id":_id},
      followers[]->{username,name,"id":_id},
      collection[]->{"id":_id},
      }`);
}
