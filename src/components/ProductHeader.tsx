import { findFullCategoryNames } from "@/utils/categories";
import Image from "next/image";
import HeartIcon from "./icons/HeartIcon";
import { getDiscountedPrice } from "@/utils/calculate";
import { FullProduct } from "@/model/product";
import { SimpleUser } from "@/model/user";
import HeartFillIcon from "./icons/HeartFillIcon";

type Props = {
  product: FullProduct;
  user: SimpleUser & { id: string };
};
export default function ProductDetailHeader({ product, user }: Props) {
  const {
    categoryCode,
    thumbnailUrls,
    discountRate,
    name,
    price,
    stockQuantity,
    likes,
    options,
  } = product;

  const categoryNames = findFullCategoryNames(categoryCode);
  const { large, medium, small } = categoryNames;

  return (
    <section className="flex flex-col sm:flex-row">
      <div className="relative w-96 h-96 object-cover">
        {thumbnailUrls && thumbnailUrls !== null && (
          <Image
            src={thumbnailUrls[0] || ""}
            fill
            alt="product thumbnail"
            className="w-96 h-96 object-fill"
          />
        )}
      </div>
      <div>
        <div>
          <div className="flex justify-between">
            <p>
              {large && <span>{large}</span>}
              {medium && (
                <span>
                  {" > "}
                  {medium}
                </span>
              )}
              {small && (
                <span>
                  {" > "}
                  {small}
                </span>
              )}
            </p>
            <button>
              {likes && likes.includes(user.id) ? (
                <HeartFillIcon />
              ) : (
                <HeartIcon size="large" />
              )}
            </button>
          </div>
          <h2 className="text-lg font-semibold">{name}</h2>
        </div>
        <div>
          <button className="underline">164개 리뷰 보기</button>
          <div className="flex justify-between">
            <div>
              {discountRate && (
                <span className="line-through text-sm">
                  {price.toLocaleString()}원
                </span>
              )}
              <div>
                {discountRate && <span>{discountRate}%</span>}
                <span className="font-bold text-xl">
                  {getDiscountedPrice(price, discountRate)}원
                </span>
              </div>
            </div>
          </div>
        </div>
        <ul>
          {/* TODO:옵션 상태관리 "value" */}
          {options &&
            options.map((option) => (
              <li key={option.name}>
                <label htmlFor="option">{option.name}</label>
                <select className="text-gray-500" id="option">
                  <option value="">{option.name}</option>
                  {option.items.map((item) => (
                    <option>{item.value}</option>
                  ))}
                </select>
              </li>
            ))}
        </ul>
        <div className="flex gap-1">
          <button
            className={`border px-10 py-3 bg-white ${
              stockQuantity > 0 ? "block" : "hidden"
            }`}
          >
            장바구니 담기
          </button>
          <button
            className={`border px-10 py-3 bg-black text-white ${
              stockQuantity === 0 && "bg-gray-300 text-white"
            }`}
            disabled={stockQuantity === 0}
          >
            {stockQuantity > 0 ? "바로 구매하기" : "품절"}
          </button>
        </div>
      </div>
    </section>
  );
}
