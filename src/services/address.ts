import { supabase } from "@/app/lib/supabaseClient";
import { Address } from "@/model/address";

export async function updateAddress(
  userId: string,
  addressData: {
    postCode: string;
    address: string;
    addDetail: string;
    default: boolean;
    name: string;
    contact: string;
    title: string | null;
  }
) {
  const address: Address = {
    userId,
    title: addressData.title ?? null,
    postCode: addressData.postCode,
    address: addressData.address,
    addDetail: addressData.addDetail,
    default: addressData.default,
    name: addressData.name,
    contact: addressData.contact,
  };

  const { data, error } = await supabase
    .from("addresses")
    .upsert(address, { onConflict: "userId" })
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  if (data) {
    console.log("주소 저장완료", data);
    return data;
  }

  return null;
}
