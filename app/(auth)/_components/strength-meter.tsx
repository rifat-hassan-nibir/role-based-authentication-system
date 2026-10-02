import type { PasswordScore } from "../_lib/validation";
import { cn } from "./styles";

const levels: Record<PasswordScore, { label: string; bar: string; text: string }> = {
  0: { label: "", bar: "bg-line-soft", text: "" },
  1: { label: "Weak", bar: "bg-danger", text: "text-danger" },
  2: { label: "Fair", bar: "bg-warning", text: "text-warning" },
  3: { label: "Good", bar: "bg-good", text: "text-good" },
  4: { label: "Strong", bar: "bg-success", text: "text-success" },
};

const segments = [1, 2, 3, 4] as const;

export function StrengthMeter({ score }: { score: PasswordScore }) {
  const level = levels[score];

  return (
    <div className="flex items-center gap-3 pt-0.5">
      <div aria-hidden="true" className="flex flex-1 gap-1.5">
        {segments.map((segment) => (
          <div
            key={segment}
            className={cn(
              "h-1 flex-1 rounded-full transition-colors duration-200",
              score >= segment ? level.bar : "bg-line-soft",
            )}
          />
        ))}
      </div>
      <span
        aria-live="polite"
        className={cn("w-12 text-right text-[13px] leading-4 font-medium sm:text-[12.5px]", level.text)}
      >
        {level.label && <span className="sr-only">Password strength: </span>}
        {level.label}
      </span>
    </div>
  );
}
