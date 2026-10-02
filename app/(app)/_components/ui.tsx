import type { ComponentProps, ComponentType, ReactNode, SVGProps } from "react";
import { cn } from "@/app/_lib/cn";
import { ArrowDownIcon, ArrowUpIcon, ChevronDownIcon } from "./icons";

export { cn };

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

/* ---------- Page header ---------- */

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  actions?: ReactNode;
};

export function PageHeader({ eyebrow, title, description, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex flex-col gap-1.5">
        {eyebrow && <p className="text-[13px] leading-4.5 font-medium text-accent">{eyebrow}</p>}
        <h1 className="text-[26px] leading-8 font-semibold tracking-[-0.02em] sm:text-[28px] sm:leading-9">
          {title}
        </h1>
        {description && (
          <p className="max-w-2xl text-[15px] leading-5.5 text-pretty text-body">{description}</p>
        )}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

/* ---------- Card ---------- */

export function Card({ className, ...props }: ComponentProps<"section">) {
  return (
    <section
      className={cn("rounded-2xl border border-ink/6 bg-white shadow-control", className)}
      {...props}
    />
  );
}

type CardHeaderProps = {
  title: string;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
};

export function CardHeader({ title, description, action, className }: CardHeaderProps) {
  return (
    <div className={cn("flex items-start justify-between gap-4 px-5 pt-5 sm:px-6", className)}>
      <div className="flex min-w-0 flex-col gap-0.5">
        <h2 className="text-[15px] leading-5.5 font-semibold tracking-[-0.01em]">{title}</h2>
        {description && <p className="text-[13px] leading-4.5 text-muted">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

/* ---------- Buttons ---------- */

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md";

const buttonVariants: Record<ButtonVariant, string> = {
  primary: "border border-ink bg-ink text-white shadow-button hover:border-ink-hover hover:bg-ink-hover",
  secondary:
    "border border-line bg-white text-ink shadow-control hover:border-line-strong hover:bg-fill-subtle",
  ghost: "text-body hover:bg-fill hover:text-ink",
  danger:
    "border border-danger/25 bg-white text-danger shadow-control hover:border-danger/45 hover:bg-danger/5",
};

const buttonSizes: Record<ButtonSize, string> = {
  md: "h-10 rounded-[10px] px-3.5 text-sm sm:h-9",
  sm: "h-9 rounded-lg px-3 text-[13px] sm:h-8 sm:px-2.5",
};

export function buttonClass({
  variant = "secondary",
  size = "md",
}: { variant?: ButtonVariant; size?: ButtonSize } = {}) {
  return cn(
    "inline-flex shrink-0 items-center justify-center gap-2 font-medium whitespace-nowrap",
    "transition-[background-color,border-color,box-shadow,color] duration-150",
    "focus-visible:ring-4 focus-visible:ring-accent/20 focus-visible:outline-none",
    "disabled:cursor-not-allowed disabled:opacity-50",
    buttonVariants[variant],
    buttonSizes[size],
  );
}

/* ---------- Badge ---------- */

export type Tone = "neutral" | "accent" | "success" | "warning" | "danger";

const badgeTones: Record<Tone, { badge: string; dot: string }> = {
  neutral: { badge: "bg-fill text-body", dot: "bg-muted" },
  accent: { badge: "bg-accent/10 text-accent", dot: "bg-accent" },
  success: { badge: "bg-success/10 text-success", dot: "bg-success" },
  warning: { badge: "bg-warning/10 text-warning", dot: "bg-warning" },
  danger: { badge: "bg-danger/10 text-danger", dot: "bg-danger" },
};

export function Badge({ tone = "neutral", dot = false, children }: { tone?: Tone; dot?: boolean; children: ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs leading-4.5 font-medium whitespace-nowrap",
        badgeTones[tone].badge,
      )}
    >
      {dot && <span aria-hidden="true" className={cn("size-1.5 rounded-full", badgeTones[tone].dot)} />}
      {children}
    </span>
  );
}

/* ---------- Avatar ---------- */

const avatarTones = [
  "bg-[#e6eafd] text-[#2a43b8]",
  "bg-[#e3f1e9] text-[#1d6a40]",
  "bg-[#fbeee2] text-[#8a4108]",
  "bg-[#f1e8fc] text-[#6b2fb5]",
  "bg-[#e2f2f4] text-[#14606d]",
];

const avatarSizes = {
  sm: "size-8 text-xs",
  md: "size-9 text-[13px]",
  lg: "size-16 text-xl",
};

export function Avatar({ name, size = "md" }: { name: string; size?: keyof typeof avatarSizes }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
  const hash = [...name].reduce((sum, char) => sum + char.charCodeAt(0), 0);

  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-semibold tracking-[0.01em]",
        avatarTones[hash % avatarTones.length],
        avatarSizes[size],
      )}
    >
      {initials}
    </span>
  );
}

/* ---------- Icon tile ---------- */

export function IconTile({ icon: Icon, tone = "neutral" }: { icon: Icon; tone?: Tone }) {
  return (
    <span
      className={cn(
        "flex size-9 shrink-0 items-center justify-center rounded-[10px]",
        tone === "neutral" ? "bg-fill text-body" : badgeTones[tone].badge,
      )}
    >
      <Icon className="size-4.5" />
    </span>
  );
}

/* ---------- Stat tile ---------- */

type StatTileProps = {
  label: string;
  value: string;
  delta?: string;
  /** Which way the number moved. */
  direction?: "up" | "down";
  /** Whether that movement is good news (colors the delta). */
  good?: boolean;
  period?: string;
};

export function StatTile({ label, value, delta, direction = "up", good = true, period }: StatTileProps) {
  const Arrow = direction === "up" ? ArrowUpIcon : ArrowDownIcon;
  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-ink/6 bg-white p-5 shadow-control">
      <p className="text-[13px] leading-4.5 font-medium text-muted">{label}</p>
      <p className="text-[28px] leading-8 font-semibold tracking-[-0.02em]">{value}</p>
      {delta && (
        <p className="flex flex-wrap items-center gap-x-1.5 text-[13px] leading-4.5">
          <span
            className={cn(
              "inline-flex items-center gap-0.5 font-medium whitespace-nowrap",
              good ? "text-success" : "text-danger",
            )}
          >
            <Arrow className="size-3.5" strokeWidth={2.25} />
            {delta}
          </span>
          {period && <span className="text-muted">{period}</span>}
        </p>
      )}
    </div>
  );
}

/* ---------- Meter ---------- */

export function Meter({ value, max, label }: { value: number; max: number; label: string }) {
  return (
    <div
      role="meter"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      className="h-2 w-full overflow-hidden rounded-full bg-accent/15"
    >
      <div className="h-full rounded-full bg-accent" style={{ width: `${(value / max) * 100}%` }} />
    </div>
  );
}

/* ---------- Form controls ---------- */

export const fieldLabelClass = "text-[13.5px] leading-4.5 font-medium text-label";

export const inputClass = cn(
  "h-10 w-full rounded-[10px] border border-line bg-white px-3 text-base text-ink shadow-control sm:text-sm",
  "transition-[border-color,box-shadow] duration-150 placeholder:text-placeholder hover:border-line-strong",
  "focus:border-accent focus:ring-4 focus:ring-accent/15 focus:outline-none",
);

export function Select({ className, children, ...props }: ComponentProps<"select">) {
  return (
    <div className="relative">
      <select className={cn(inputClass, "appearance-none pr-9", className)} {...props}>
        {children}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted" />
    </div>
  );
}

type SwitchRowProps = {
  label: string;
  description: string;
  defaultChecked?: boolean;
  disabled?: boolean;
};

/** A whole-row label with an on/off switch; clicking anywhere on the row toggles it. */
export function SwitchRow({ label, description, defaultChecked, disabled }: SwitchRowProps) {
  return (
    <label
      className={cn(
        "flex items-start justify-between gap-6 py-4",
        disabled ? "cursor-not-allowed" : "cursor-pointer",
      )}
    >
      <span className="flex flex-col gap-0.5">
        <span className="text-sm leading-5 font-medium text-ink">{label}</span>
        <span className="text-[13px] leading-4.5 text-muted">{description}</span>
      </span>
      <span className="relative mt-0.5 inline-flex shrink-0">
        <input
          type="checkbox"
          role="switch"
          defaultChecked={defaultChecked}
          disabled={disabled}
          className="peer sr-only"
        />
        <span className="h-6 w-10 rounded-full bg-placeholder transition-colors duration-150 peer-checked:bg-accent peer-focus-visible:ring-4 peer-focus-visible:ring-accent/20 peer-disabled:opacity-50" />
        <span className="absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow-control transition-transform duration-150 peer-checked:translate-x-4" />
      </span>
    </label>
  );
}
