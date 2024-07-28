import Link from "next/link";

const navItems = [
  {
    href: "/movie",
    title: "영화",
  },
  {
    href: "/tv",
    title: "시리즈",
  },
];

export default function NavMenu() {
  return (
    <ul className="flex gap-4 items-center w-28 mx-3">
      {navItems.map((item) => (
        <li className="w-full text-center text-neutral-600 " key={item.href}>
          <Link href={item.href}>{item.title}</Link>
        </li>
      ))}
    </ul>
  );
}
