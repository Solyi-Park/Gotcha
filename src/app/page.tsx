import { supabase } from "./lib/supabaseClient";

export default async function HomePage() {
  // let { data: users, error } = await supabase.from("users").select("*");
  // console.log("data====>", users);

  return <div className="flex- flex-col w-full h-full">home</div>;
}
