import Link from "next/link";
import { LogoMark } from "@/app/_components/logo-mark";
import { MainNav } from "./main-nav";
import { ProfileMenu } from "./profile-menu";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line-soft bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-4 px-4 sm:gap-8 sm:px-6">
        <Link
          href="/"
          aria-label="Home"
          className="shrink-0 rounded-[10px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <LogoMark className="size-8 rounded-[10px]" />
        </Link>
        <MainNav />
        <div className="ml-auto shrink-0">
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
}
