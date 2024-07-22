import { client } from "./sanity";

// uses GROQ to query content: https://www.sanity.io/docs/groq
export async function getPosts() {
  const posts = await client.fetch('*[_type == "post"]');
  return posts;
}

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
    collections: [],
  };

  return client.createIfNotExists(userData);
}
