import type { Metadata } from "next";
import Link from "next/link";
import { AuthCard } from "../_components/auth-card";
import { SignUpForm } from "../_components/sign-up-form";
import { SocialSignIn } from "../_components/social-sign-in";
import { textLink } from "../_components/styles";

export const metadata: Metadata = {
  title: "Create your account",
};

export default function SignUpPage() {
  return (
    <AuthCard
      title="Create your account"
      description="Enter your details to get started."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/sign-in" className={textLink}>
            Sign in
          </Link>
        </>
      }
    >
      <SocialSignIn />
      <SignUpForm />
    </AuthCard>
  );
}
