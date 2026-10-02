"use client";

import { useState, type ComponentProps } from "react";
import { EyeIcon, EyeOffIcon } from "./icons";
import { cn, controlClass, iconButton, inputClass } from "./styles";

type PasswordInputProps = Omit<ComponentProps<"input">, "type"> & { invalid?: boolean };

export function PasswordInput({ id, invalid = false, className, ...props }: PasswordInputProps) {
  const [visible, setVisible] = useState(false);
  const Icon = visible ? EyeOffIcon : EyeIcon;

  return (
    <div className={controlClass({ invalid, hasAction: true })}>
      <input
        id={id}
        type={visible ? "text" : "password"}
        aria-invalid={invalid || undefined}
        className={cn(inputClass, className)}
        {...props}
      />
      <button
        type="button"
        className={iconButton}
        aria-label={visible ? "Hide password" : "Show password"}
        aria-controls={id}
        onClick={() => setVisible((v) => !v)}
      >
        <Icon className="size-5 sm:size-[18px]" />
      </button>
    </div>
  );
}
