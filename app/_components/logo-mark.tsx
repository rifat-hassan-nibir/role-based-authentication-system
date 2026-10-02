/** Placeholder brand mark — swap for your logo. Size it with `className`. */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`flex shrink-0 items-center justify-center bg-ink shadow-logo ${className}`}>
      <svg viewBox="0 0 24 24" className="size-1/2">
        <path
          d="M6 18.5V11a6 6 0 0 1 12 0v7.5"
          fill="none"
          stroke="#ffffff"
          strokeWidth={2.4}
          strokeLinecap="round"
        />
        <circle cx="12" cy="14.5" r="2.25" fill="#9aabff" />
      </svg>
    </div>
  );
}
