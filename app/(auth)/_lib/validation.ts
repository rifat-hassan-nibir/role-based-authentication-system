const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const MIN_PASSWORD_LENGTH = 8;

export function isValidEmail(value: string) {
  return EMAIL_PATTERN.test(value.trim());
}

export type PasswordScore = 0 | 1 | 2 | 3 | 4;

/**
 * 0 = empty, 1 = weak, 2 = fair, 3 = good, 4 = strong.
 * Anything under the minimum length stays weak; above it, mixed case,
 * digits and symbols each add a point.
 */
export function scorePassword(password: string): PasswordScore {
  if (!password) return 0;
  if (password.length < MIN_PASSWORD_LENGTH) return 1;
  let score = 1;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score as PasswordScore;
}

export type ConfirmState = "idle" | "match" | "mismatch";

/**
 * Stays idle while the confirmation is still a prefix of the password,
 * so people aren't told "don't match" halfway through typing it.
 */
export function getConfirmState(password: string, confirm: string): ConfirmState {
  if (!confirm) return "idle";
  if (confirm === password) return "match";
  if (confirm.length < password.length && password.startsWith(confirm)) return "idle";
  return "mismatch";
}
