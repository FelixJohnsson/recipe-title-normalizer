"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Nav() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    pathname === path ? "font-semibold" : "underline";

  return (
    <nav className="text-sm flex gap-3">
      <Link href="/" className={linkClass("/")}>
        Home
      </Link>
      <Link
        href="/ingredient-normalizer"
        className={linkClass("/ingredient-normalizer")}
      >
        Ingredient
      </Link>
      <Link
        href="/ingredient-list-normalizer"
        className={linkClass("/ingredient-list-normalizer")}
      >
        List
      </Link>
    </nav>
  );
}
