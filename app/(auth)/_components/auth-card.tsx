import type { ReactNode } from "react";
import { LogoMark } from "@/app/_components/logo-mark";

type AuthCardProps = {
  title: string;
  description: string;
  /** The "switch to sign in / sign up" line. */
  footer: ReactNode;
  children: ReactNode;
};

/**
 * Below `sm` the header sits on the gradient and the form is a full-bleed
 * sheet; from `sm` up everything collapses into one centered card.
 */
export function AuthCard({ title, description, footer, children }: AuthCardProps) {
  return (
    <div className="flex flex-1 flex-col sm:w-full sm:max-w-[440px] sm:flex-none sm:overflow-hidden sm:rounded-3xl sm:border sm:border-ink/6 sm:bg-white sm:shadow-card">
      <header className="flex flex-col gap-5 px-5 pt-16 pb-7 sm:items-center sm:px-10 sm:pt-10 sm:text-center">
        <LogoMark className="size-10 rounded-xl sm:size-11 sm:rounded-[13px]" />
        <div className="flex flex-col gap-1.5 sm:gap-2">
          <h1 className="text-[28px] leading-[34px] font-semibold tracking-[-0.02em] sm:text-[26px] sm:leading-8">
            {title}
          </h1>
          <p className="text-[15px] leading-[22px] text-body">{description}</p>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-6 rounded-t-[28px] border-t border-ink/6 bg-white px-5 pt-7 pb-9 shadow-sheet sm:gap-7 sm:rounded-none sm:border-0 sm:px-10 sm:pt-0 sm:pb-10 sm:shadow-none">
        {children}
        <p className="mt-auto text-center text-sm leading-5 text-body sm:hidden">{footer}</p>
      </div>

      <div className="hidden border-t border-line-faint bg-fill-faint px-10 py-[18px] text-center sm:block">
        <p className="text-sm leading-5 text-body">{footer}</p>
      </div>
    </div>
  );
}
