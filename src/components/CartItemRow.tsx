import { CartItemRowType } from "@/model/cart";
import Image from "next/image";
import QuantityAdjuster from "./QuantityAdjuster";
import { getDiscountedPrice } from "@/utils/calculate";
import Link from "next/link";
import DeleteIcon from "./icons/DeleteIcon";
import { useUserCart } from "@/store/cart";
import { useProductOption } from "@/store/option";

type Props = {
  item: CartItemRowType;
};
export default function CartItemRow({ item }: Props) {
  const { option, product } = item;
  const { userCart, updateQuantity } = useUserCart();
  console.log("userCart??", userCart);

  const handleUpdateQuantity = (optionId: string, delta: number) =>
    //TODO: 여기가 아니라 장바구니 DB가 업데이트 되어야함
    // 쓰로틀링
    updateQuantity(optionId, delta);

  return (
    <div className="flex gap-2">
      <div className="flex">
        {product && (
          <Link href={`/products/${item.product?.id}`}>
            <Image
              src={product?.thumbnailUrls[0]}
              alt="cart item thumbnail"
              width={120}
              height={120}
              className="aspect-square object-cover"
              priority
            />
          </Link>
        )}

        <div className="flex flex-col">
          <div>
            <Link href={`/products/${item.product?.id}`}>
              <span className="font-bold">{product?.name}</span>
            </Link>
            {/* TODO: button icon 변경, 반응형구현 */}
            <button
              className="text-sm w-7 h-7"
              // onClick={() => deleteOption(item.option.id)}
            >
              <DeleteIcon size="large" />
            </button>
          </div>
          <span
            className={`${product?.discountRate && "line-through"} text-sm`}
          >
            {product?.price.toLocaleString()}원
          </span>
          <p className="text-red-400 text-sm">
            <span className="mr-1">[{product?.discountRate}%]</span>
            <span>
              {getDiscountedPrice(
                product?.price,
                product?.discountRate
              ).toLocaleString()}
              원
            </span>
          </p>
          <ul className="flex gap-2 text-xs text-gray-700">
            {option &&
              option.items.map((opt) => (
                <li className="flex " key={`${opt.name}${opt.value}`}>
                  <span>{`[${opt.name}] ${opt.value}`}</span>
                </li>
              ))}
            <button
              className="px-2 py-1 bg-gray-200"
              onClick={() => handleUpdateQuantity(item.id, -1)}
            >
              -
            </button>
            <span className="border px-2 py-1">{item.quantity}</span>
            <button
              className="px-2 py-1 bg-gray-200"
              onClick={() => handleUpdateQuantity(item.id, +1)}
            >
              +
            </button>
          </ul>
        </div>
        <div>
          <span>
            {/* TODO: 반복되는 금액 계산 로직 분리 */}
            {(
              item.quantity *
              getDiscountedPrice(product?.price, product?.discountRate)
            ).toLocaleString()}
            원
          </span>
          <button className=" px-3 py-2 bg-black text-white text-sm rounded-sm hover:opacity-80">
            구매하기
          </button>
        </div>
      </div>
    </div>
  );
}
