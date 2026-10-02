import type { ComponentProps, ReactNode } from "react";
import { AlertCircleIcon, CheckCircleIcon } from "./icons";
import { cn, controlClass, inputClass, labelClass } from "./styles";

export type MessageTone = "default" | "error" | "success";

export const messageId = (fieldId: string) => `${fieldId}-message`;

const toneClass: Record<MessageTone, string> = {
  default: "text-muted",
  error: "text-danger",
  success: "text-success",
};

type FieldProps = {
  id: string;
  label: string;
  /** Rendered at the end of the label row, e.g. a "Forgot password?" link. */
  labelAside?: ReactNode;
  message?: ReactNode;
  tone?: MessageTone;
  /** Announce message changes to screen readers as they happen. */
  live?: boolean;
  children: ReactNode;
};

export function Field({ id, label, labelAside, message, tone = "default", live, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-3">
        <label htmlFor={id} className={labelClass}>
          {label}
        </label>
        {labelAside}
      </div>
      {children}
      {message ? (
        <p
          id={messageId(id)}
          aria-live={live ? "polite" : undefined}
          className={cn(
            "flex items-start gap-1.5 text-[13px] leading-[18px] sm:text-[12.5px]",
            toneClass[tone],
          )}
        >
          {tone === "error" && <AlertCircleIcon className="mt-0.5 size-3.5 shrink-0" />}
          {tone === "success" && <CheckCircleIcon className="mt-0.5 size-3.5 shrink-0" />}
          <span>{message}</span>
        </p>
      ) : null}
    </div>
  );
}

type TextInputProps = ComponentProps<"input"> & { invalid?: boolean };

export function TextInput({ invalid = false, className, ...props }: TextInputProps) {
  return (
    <div className={controlClass({ invalid })}>
      <input aria-invalid={invalid || undefined} className={cn(inputClass, className)} {...props} />
    </div>
  );
}
