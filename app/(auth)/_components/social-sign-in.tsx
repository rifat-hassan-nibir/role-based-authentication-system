import { AppleIcon, GitHubIcon, GoogleIcon } from "@/app/_components/brand-icons";
import { socialButton } from "./styles";

const providers = [
  { name: "Google", Icon: GoogleIcon },
  { name: "Apple", Icon: AppleIcon },
  { name: "GitHub", Icon: GitHubIcon },
];

export function SocialSignIn() {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-3 gap-2.5">
        {providers.map(({ name, Icon }) => (
          <button key={name} type="button" aria-label={`Continue with ${name}`} className={socialButton}>
            <Icon className="size-[18px] shrink-0" />
            <span>{name}</span>
          </button>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-line-soft" />
        <span className="text-[13px] leading-4 text-muted sm:text-[12.5px]">or</span>
        <div className="h-px flex-1 bg-line-soft" />
      </div>
    </div>
  );
}
