"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Nav() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    pathname === path
      ? "px-3 py-1 rounded bg-black text-white"
      : "px-3 py-1 rounded hover:bg-gray-200";

  return (
    <nav className="flex gap-2">
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
      <Link href="/step-normalizer" className={linkClass("/step-normalizer")}>
        Steps
      </Link>
      <Link
        href="/timing-normalizer"
        className={linkClass("/timing-normalizer")}
      >
        Timing
      </Link>
    </nav>
  );
}
