import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import { getCartItemsbyUserId } from "@/services/cart";
import CartDetails from "@/components/CartDetails";

export default async function CartPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  const userCart = await getCartItemsbyUserId(user.id);

  return (
    <div>
      <h2>{user.name}의 장바구니</h2>
      {userCart.length === 0 && (
        <p className="text-4xl">장바구니에 담은 상품이 없습니다.</p>
      )}
      {userCart.length > 0 && <CartDetails user={user} userCart={userCart} />}
    </div>
  );
}
