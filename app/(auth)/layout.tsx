import { mutedLink } from "./_components/styles";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="auth-backdrop flex min-h-dvh flex-col">
      <main className="flex flex-1 flex-col sm:items-center sm:justify-center sm:px-6 sm:pt-12 sm:pb-6">
        {children}
      </main>
      <footer className="hidden justify-center gap-6 px-6 pb-8 text-[13px] leading-[18px] sm:flex">
        <a href="#" className={mutedLink}>
          Privacy
        </a>
        <a href="#" className={mutedLink}>
          Terms
        </a>
      </footer>
    </div>
  );
}
