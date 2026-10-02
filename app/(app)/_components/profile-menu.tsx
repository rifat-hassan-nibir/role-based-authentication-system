"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { LogInIcon, LogOutIcon, UserIcon, UserPlusIcon } from "./icons";

const links = [
  { href: "/profile", label: "Profile", Icon: UserIcon },
  { href: "/sign-in", label: "Sign In", Icon: LogInIcon },
  { href: "/sign-up", label: "Sign Up", Icon: UserPlusIcon },
];

const itemClass =
  "flex h-10 w-full items-center gap-2.5 rounded-lg px-2.5 text-left text-sm font-medium text-ink transition-colors duration-150 hover:bg-fill-subtle focus-visible:bg-fill focus-visible:outline-none";

export function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const router = useRouter();

  useEffect(() => {
    if (!open) return;

    const close = () => setOpen(false);
    // Clicks and keyboard focus that land outside the menu close it; so does
    // focus leaving the page entirely (e.g. tabbing past the last element).
    function closeIfOutside(event: Event) {
      if (!containerRef.current?.contains(event.target as Node)) close();
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        close();
        buttonRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", closeIfOutside);
    document.addEventListener("focusin", closeIfOutside);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("blur", close);
    return () => {
      document.removeEventListener("pointerdown", closeIfOutside);
      document.removeEventListener("focusin", closeIfOutside);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("blur", close);
    };
  }, [open]);

  function handleLogOut() {
    setOpen(false);
    // Clear the session with your auth provider here.
    router.push("/sign-in");
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-label="Account menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        className="flex size-9 items-center justify-center rounded-full border border-line bg-white text-muted shadow-control transition-[border-color,box-shadow,color] duration-150 hover:border-line-strong hover:text-ink focus-visible:border-accent focus-visible:ring-4 focus-visible:ring-accent/15 focus-visible:outline-none aria-expanded:border-accent aria-expanded:text-ink aria-expanded:ring-4 aria-expanded:ring-accent/15"
      >
        <UserIcon className="size-4.5" />
      </button>

      {open && (
        <div
          id={menuId}
          className="absolute top-full right-0 z-50 mt-2 w-48 origin-top-right rounded-xl border border-ink/6 bg-white p-1.5 shadow-popover transition-[opacity,scale] duration-150 starting:scale-95 starting:opacity-0 motion-reduce:transition-none"
        >
          <ul className="flex flex-col gap-0.5">
            {links.map(({ href, label, Icon }) => (
              <li key={href}>
                <Link href={href} onClick={() => setOpen(false)} className={itemClass}>
                  <Icon className="size-4 text-muted" />
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <button type="button" onClick={handleLogOut} className={itemClass}>
                <LogOutIcon className="size-4 text-muted" />
                Log Out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
