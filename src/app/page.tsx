import { supabase } from "./lib/supabaseClient";

export default async function HomePage() {
  let { data: User, error } = await supabase.from("user").select("*");
  console.log("data====>", User);

  return <div className="flex- flex-col w-full h-full">home</div>;
}
