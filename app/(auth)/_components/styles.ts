import { cn } from "@/app/_lib/cn";

export { cn };

// Mobile-first: larger touch targets below `sm`, the desktop card sizes from `sm` up.

export const labelClass =
  "text-sm leading-5 font-medium text-label sm:text-[13.5px] sm:leading-[18px]";

export function controlClass({ invalid = false, hasAction = false } = {}) {
  return cn(
    "flex h-[52px] items-center gap-1 rounded-[14px] border bg-white pl-4 shadow-control",
    "transition-[border-color,box-shadow] duration-150 focus-within:ring-4",
    "sm:h-[46px] sm:rounded-xl sm:pl-3.5",
    hasAction ? "pr-1" : "pr-4 sm:pr-3.5",
    invalid
      ? "border-danger focus-within:ring-danger/15"
      : "border-line hover:border-line-strong focus-within:border-accent focus-within:ring-accent/15",
  );
}

export const inputClass =
  "h-full min-w-0 flex-1 bg-transparent text-base text-ink outline-none placeholder:text-placeholder sm:text-[15px]";

export const iconButton = cn(
  "flex size-11 shrink-0 items-center justify-center rounded-[11px] text-muted",
  "transition-colors duration-150 hover:bg-fill hover:text-ink",
  "focus-visible:text-ink focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent",
  "sm:size-[38px] sm:rounded-[9px]",
);

export const primaryButton = cn(
  "flex h-[52px] w-full items-center justify-center gap-2 rounded-[14px] border border-ink bg-ink px-4",
  "text-base font-medium text-white shadow-button",
  "transition-[background-color,border-color,box-shadow,transform] duration-150",
  "hover:border-ink-hover hover:bg-ink-hover active:translate-y-px",
  "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:outline-none",
  "disabled:translate-y-0 disabled:cursor-not-allowed disabled:border-fill-muted disabled:bg-fill-muted disabled:text-disabled disabled:shadow-none",
  "sm:h-[46px] sm:rounded-xl sm:text-[15px]",
);

export const socialButton = cn(
  "flex h-12 items-center justify-center gap-2 rounded-[14px] border border-line bg-white px-2",
  "text-[15px] font-medium text-ink shadow-control",
  "transition-[background-color,border-color,box-shadow,transform] duration-150",
  "hover:border-line-strong hover:bg-fill-subtle active:translate-y-px",
  "focus-visible:border-accent focus-visible:ring-4 focus-visible:ring-accent/15 focus-visible:outline-none",
  "disabled:translate-y-0 disabled:cursor-not-allowed disabled:border-line-soft disabled:bg-fill-disabled disabled:text-disabled disabled:shadow-none",
  "sm:h-11 sm:rounded-xl sm:text-sm",
);

export const textLink =
  "rounded font-medium text-accent underline-offset-[3px] hover:text-accent-hover hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export const mutedLink =
  "rounded text-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
