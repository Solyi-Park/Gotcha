import Link from "next/link";

const navItems = [
  {
    title: "WOMEN",
    href: "/women",
  },
  {
    title: "MEN",
    href: "/men",
  },
  {
    title: "BEAUTY",
    href: "/beauty",
  },
  {
    title: "INTERIOR",
    href: "/interior",
  },
];

export default function NavMenu() {
  return (
    <ul className="hidden sm:flex gap-5 items-center w-28 mx-3">
      {navItems.map((item) => (
        <li className="w-full text-center text-neutral-600 " key={item.href}>
          <Link href={item.href}>{item.title}</Link>
        </li>
      ))}
    </ul>
  );
}
