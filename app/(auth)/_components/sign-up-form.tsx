"use client";

import { useState, type FormEvent } from "react";
import {
  MIN_PASSWORD_LENGTH,
  getConfirmState,
  isValidEmail,
  scorePassword,
} from "../_lib/validation";
import { Field, TextInput, messageId, type MessageTone } from "./field";
import { PasswordInput } from "./password-input";
import { StrengthMeter } from "./strength-meter";
import { primaryButton, textLink } from "./styles";

type Errors = { email?: string; password?: string; confirm?: string };

const ids = { email: "sign-up-email", password: "sign-up-password", confirm: "sign-up-confirm" } as const;

export function SignUpForm() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  const confirmState = getConfirmState(password, confirm);

  function clearErrors(...fields: (keyof Errors)[]) {
    if (fields.some((field) => errors[field])) {
      setErrors((prev) => {
        const next = { ...prev };
        for (const field of fields) delete next[field];
        return next;
      });
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = String(new FormData(event.currentTarget).get("email") ?? "");

    const next: Errors = {};
    if (!isValidEmail(email)) next.email = "Enter a valid email address.";
    if (password.length < MIN_PASSWORD_LENGTH) next.password = `Use at least ${MIN_PASSWORD_LENGTH} characters.`;
    if (!confirm) next.confirm = "Re-enter your password to confirm it.";
    else if (confirm !== password) next.confirm = "Passwords don’t match";
    setErrors(next);

    const firstInvalid = (Object.keys(next) as (keyof Errors)[])[0];
    if (firstInvalid) {
      document.getElementById(ids[firstInvalid])?.focus();
      return;
    }

    // Valid — hand off to your auth provider here.
  }

  let confirmMessage = "Enter the same password again.";
  let confirmTone: MessageTone = "default";
  if (errors.confirm) {
    confirmMessage = errors.confirm;
    confirmTone = "error";
  } else if (confirmState === "match") {
    confirmMessage = "Passwords match";
    confirmTone = "success";
  } else if (confirmState === "mismatch") {
    confirmMessage = "Passwords don’t match";
    confirmTone = "error";
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-6 sm:gap-7">
      <div className="flex flex-col gap-[18px]">
        <Field
          id={ids.email}
          label="Email"
          message={errors.email ?? "We’ll send a link to verify this address."}
          tone={errors.email ? "error" : "default"}
        >
          <TextInput
            id={ids.email}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="name@company.com"
            invalid={Boolean(errors.email)}
            aria-describedby={messageId(ids.email)}
            onChange={() => clearErrors("email")}
          />
        </Field>

        <Field
          id={ids.password}
          label="Password"
          message={errors.password ?? "Use 8+ characters with letters, numbers and a symbol."}
          tone={errors.password ? "error" : "default"}
        >
          <PasswordInput
            id={ids.password}
            name="password"
            autoComplete="new-password"
            placeholder="Create a password"
            value={password}
            invalid={Boolean(errors.password)}
            aria-describedby={messageId(ids.password)}
            onChange={(event) => {
              setPassword(event.target.value);
              clearErrors("password", "confirm");
            }}
          />
          <StrengthMeter score={scorePassword(password)} />
        </Field>

        <Field id={ids.confirm} label="Confirm password" message={confirmMessage} tone={confirmTone} live>
          <PasswordInput
            id={ids.confirm}
            name="confirmPassword"
            autoComplete="new-password"
            placeholder="Re-enter your password"
            value={confirm}
            invalid={confirmTone === "error"}
            aria-describedby={messageId(ids.confirm)}
            onChange={(event) => {
              setConfirm(event.target.value);
              clearErrors("confirm");
            }}
          />
        </Field>
      </div>

      <div className="flex flex-col gap-4">
        <button type="submit" className={primaryButton}>
          Create account
        </button>
        <p className="text-center text-[13px] leading-[18px] text-pretty text-muted sm:text-[12.5px]">
          By creating an account, you agree to our{" "}
          <a href="#" className={textLink}>
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className={textLink}>
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </form>
  );
}
