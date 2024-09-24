import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import { getCartItemsbyUserId } from "@/services/cart";
import CartDetails from "@/components/CartDetails";

export default async function CartPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  const userCartData = await getCartItemsbyUserId(user.id);

  return (
    <div>
      {/* 로딩스피너. */}
      {userCartData.length === 0 && (
        <div>
          <p className="text-4xl">장바구니에 담은 상품이 없습니다.</p>
          <button>CONTINUE SHOPPING</button>
        </div>
      )}
      {userCartData.length > 0 && (
        <CartDetails user={user} userCartData={userCartData} />
      )}
    </div>
  );
}
