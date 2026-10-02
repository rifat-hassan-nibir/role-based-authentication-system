"use client";

import { useState, type FormEvent } from "react";
import { isValidEmail } from "../_lib/validation";
import { Field, TextInput, messageId } from "./field";
import { PasswordInput } from "./password-input";
import { cn, primaryButton, textLink } from "./styles";

type Errors = { email?: string; password?: string };

const ids = { email: "sign-in-email", password: "sign-in-password" } as const;

export function SignInForm() {
  const [errors, setErrors] = useState<Errors>({});

  function clearError(field: keyof Errors) {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "");
    const password = String(data.get("password") ?? "");

    const next: Errors = {};
    if (!isValidEmail(email)) next.email = "Enter a valid email address.";
    if (!password) next.password = "Enter your password.";
    setErrors(next);

    const firstInvalid = (Object.keys(next) as (keyof Errors)[])[0];
    if (firstInvalid) {
      document.getElementById(ids[firstInvalid])?.focus();
      return;
    }

    // Valid — hand off to your auth provider here.
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-6 sm:gap-7">
      <div className="flex flex-col gap-[18px]">
        <Field id={ids.email} label="Email" message={errors.email} tone="error">
          <TextInput
            id={ids.email}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="name@company.com"
            invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? messageId(ids.email) : undefined}
            onChange={() => clearError("email")}
          />
        </Field>

        <Field
          id={ids.password}
          label="Password"
          labelAside={
            <a href="#" className={cn(textLink, "text-sm leading-5 sm:text-[13px] sm:leading-[18px]")}>
              Forgot password?
            </a>
          }
          message={errors.password}
          tone="error"
        >
          <PasswordInput
            id={ids.password}
            name="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? messageId(ids.password) : undefined}
            onChange={() => clearError("password")}
          />
        </Field>
      </div>

      <button type="submit" className={primaryButton}>
        Sign in
      </button>
    </form>
  );
}
