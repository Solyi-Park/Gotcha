import { MYPAGE_SECTIONS } from "@/constants/mypage";
import { isActivePath } from "@/utils/currentPath";
import Link from "next/link";
import SectionTitle from "./SectionTitle";

type Props = {
  pathname: string;
};

export default function MypageNavMenu({ pathname }: Props) {
  return (
    <div className="w-full">
      {MYPAGE_SECTIONS.map((section) => (
        <section key={section.title} className="mb-6">
          <h3 className="font-bold text-lg mb-2 hidden sm:block">
            {section.title}
          </h3>
          <div className="sm:hidden">
            <SectionTitle title={section.title} />
          </div>
          <ul>
            {section.items.map((item) => (
              <li
                key={item.name}
                className={`mb-2 sm:border-0 sm:py-0 border-b py-2 ${
                  isActivePath(pathname, `/mypage${item.path}`)
                    ? "text-black"
                    : "text-neutral-600 font-light"
                }`}
              >
                <Link href={`/mypage${item.path}`}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
