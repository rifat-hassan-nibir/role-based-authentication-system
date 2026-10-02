"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/admin", label: "Admin" },
  { href: "/user", label: "User" },
  { href: "/editor", label: "Editor" },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main" className="min-w-0 overflow-x-auto">
      <ul className="flex items-center gap-1">
        {items.map(({ href, label }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex h-9 items-center rounded-lg px-3 text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent ${
                  active ? "bg-fill text-ink" : "text-body hover:bg-fill-subtle hover:text-ink"
                }`}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
