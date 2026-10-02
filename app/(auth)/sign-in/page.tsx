import type { Metadata } from "next";
import Link from "next/link";
import { AuthCard } from "../_components/auth-card";
import { SignInForm } from "../_components/sign-in-form";
import { SocialSignIn } from "../_components/social-sign-in";
import { textLink } from "../_components/styles";

export const metadata: Metadata = {
  title: "Sign in",
};

export default function SignInPage() {
  return (
    <AuthCard
      title="Welcome back"
      description="Sign in to your account to continue."
      footer={
        <>
          Don’t have an account?{" "}
          <Link href="/sign-up" className={textLink}>
            Create account
          </Link>
        </>
      }
    >
      <SocialSignIn />
      <SignInForm />
    </AuthCard>
  );
}
