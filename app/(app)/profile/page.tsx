import type { Metadata } from "next";
import type { ComponentType, ReactNode, SVGProps } from "react";
import { AppleIcon, GitHubIcon, GoogleIcon } from "@/app/_components/brand-icons";
import { connectedAccounts, currentUser, notificationSettings } from "../_data/sample";
import {
  BellIcon,
  GlobeIcon,
  KeyIcon,
  LockIcon,
  ShieldCheckIcon,
  SmartphoneIcon,
  TrashIcon,
  UserIcon,
} from "../_components/icons";
import {
  Avatar,
  Badge,
  Card,
  CardHeader,
  IconTile,
  PageHeader,
  Select,
  SwitchRow,
  buttonClass,
  fieldLabelClass,
  inputClass,
} from "../_components/ui";

export const metadata: Metadata = {
  title: "Profile",
};

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

const sections: { id: string; label: string; icon: Icon }[] = [
  { id: "personal", label: "Personal info", icon: UserIcon },
  { id: "security", label: "Security", icon: LockIcon },
  { id: "connected", label: "Connected accounts", icon: GlobeIcon },
  { id: "notifications", label: "Notifications", icon: BellIcon },
  { id: "delete", label: "Delete account", icon: TrashIcon },
];

const providerIcon = { Google: GoogleIcon, GitHub: GitHubIcon, Apple: AppleIcon };

const securityRows: { icon: Icon; title: string; description: string; status?: ReactNode; action: string }[] = [
  {
    icon: KeyIcon,
    title: "Password",
    description: "Last changed 32 days ago.",
    action: "Change password",
  },
  {
    icon: SmartphoneIcon,
    title: "Two-factor authentication",
    description: "Authenticator app, added March 2024.",
    status: <Badge tone="success" dot>On</Badge>,
    action: "Manage",
  },
  {
    icon: ShieldCheckIcon,
    title: "Passkeys",
    description: "1 passkey · MacBook Pro (Touch ID).",
    action: "Add passkey",
  },
  {
    icon: LockIcon,
    title: "Recovery codes",
    description: "Use these to get back in if you lose your phone.",
    status: <Badge tone="warning" dot>Not saved</Badge>,
    action: "View codes",
  },
];

function Field({ id, label, children, aside, className }: { id: string; label: string; children: ReactNode; aside?: ReactNode; className?: string }) {
  return (
    <div className={`flex flex-col gap-2 ${className ?? ""}`}>
      <div className="flex items-center justify-between gap-3">
        <label htmlFor={id} className={fieldLabelClass}>
          {label}
        </label>
        {aside}
      </div>
      {children}
    </div>
  );
}

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow="Settings"
        title="Profile"
        description="Your personal details, how you sign in, and what we email you about."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10">
        <nav aria-label="Profile sections" className="-mx-4 overflow-x-auto px-4 lg:mx-0 lg:overflow-visible lg:px-0">
          <ul className="flex gap-1 lg:sticky lg:top-24 lg:flex-col">
            {sections.map(({ id, label, icon: Icon }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="flex h-10 items-center gap-2.5 rounded-[10px] px-3 text-sm font-medium whitespace-nowrap text-body transition-colors duration-150 hover:bg-white hover:text-ink hover:shadow-control focus-visible:ring-4 focus-visible:ring-accent/20 focus-visible:outline-none lg:h-9"
                >
                  <Icon className="size-4 text-muted" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex min-w-0 flex-col gap-6">
          <Card id="personal" className="scroll-mt-24">
            <CardHeader title="Personal info" description="This is how other members see you across the workspace." />
            <div className="flex flex-col gap-6 px-5 pt-5 pb-6 sm:px-6">
              <div className="flex flex-wrap items-center gap-4">
                <Avatar name={currentUser.name} size="lg" />
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <button type="button" className={buttonClass({ size: "sm" })}>
                      Change photo
                    </button>
                    <button type="button" className={buttonClass({ variant: "ghost", size: "sm" })}>
                      Remove
                    </button>
                  </div>
                  <p className="text-[12px] leading-4 text-muted">JPG or PNG, up to 2 MB.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field id="first-name" label="First name">
                  <input id="first-name" className={inputClass} defaultValue={currentUser.firstName} autoComplete="given-name" />
                </Field>
                <Field id="last-name" label="Last name">
                  <input id="last-name" className={inputClass} defaultValue={currentUser.lastName} autoComplete="family-name" />
                </Field>
                <Field id="email" label="Email" aside={<Badge tone="success" dot>Verified</Badge>} className="sm:col-span-2">
                  <input
                    id="email"
                    type="email"
                    className={inputClass}
                    defaultValue={currentUser.email}
                    autoComplete="email"
                    aria-describedby="email-help"
                  />
                  <p id="email-help" className="text-[12.5px] leading-4.5 text-muted">
                    We’ll send a verification link if you change it.
                  </p>
                </Field>
                <Field id="job-title" label="Job title">
                  <input id="job-title" className={inputClass} defaultValue={currentUser.jobTitle} autoComplete="organization-title" />
                </Field>
                <Field id="time-zone" label="Time zone">
                  <Select id="time-zone" defaultValue="America/New_York">
                    <option value="America/Los_Angeles">Pacific Time (UTC−08:00)</option>
                    <option value="America/Chicago">Central Time (UTC−06:00)</option>
                    <option value="America/New_York">Eastern Time (UTC−05:00)</option>
                    <option value="Europe/London">London (UTC+00:00)</option>
                    <option value="Asia/Singapore">Singapore (UTC+08:00)</option>
                  </Select>
                </Field>
              </div>
            </div>
            <div className="flex justify-end gap-2 rounded-b-2xl border-t border-line-soft bg-fill-faint px-5 py-3 sm:px-6">
              <button type="button" className={buttonClass({ variant: "ghost" })}>
                Cancel
              </button>
              <button type="button" className={buttonClass({ variant: "primary" })}>
                Save changes
              </button>
            </div>
          </Card>

          <Card id="security" className="scroll-mt-24">
            <CardHeader title="Security" description="The ways you prove it’s really you." />
            <ul className="flex flex-col px-5 pt-2 pb-2 sm:px-6">
              {securityRows.map((row) => (
                <li
                  key={row.title}
                  className="flex flex-wrap items-center gap-x-4 gap-y-3 border-b border-line-soft py-4 last:border-0"
                >
                  <IconTile icon={row.icon} />
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <p className="flex flex-wrap items-center gap-2 text-sm leading-5 font-medium">
                      {row.title}
                      {row.status}
                    </p>
                    <p className="text-[13px] leading-4.5 text-muted">{row.description}</p>
                  </div>
                  <button type="button" className={buttonClass({ size: "sm" })}>
                    {row.action}
                  </button>
                </li>
              ))}
            </ul>
          </Card>

          <Card id="connected" className="scroll-mt-24">
            <CardHeader title="Connected accounts" description="Sign in faster with an account you already use." />
            <ul className="flex flex-col px-5 pt-2 pb-2 sm:px-6">
              {connectedAccounts.map((account) => {
                const Logo = providerIcon[account.provider];
                return (
                  <li key={account.provider} className="flex items-center gap-4 border-b border-line-soft py-4 last:border-0">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-[10px] border border-line-soft bg-white text-ink shadow-control">
                      <Logo className="size-4.5" />
                    </span>
                    <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                      <p className="text-sm leading-5 font-medium">{account.provider}</p>
                      <p className="truncate text-[13px] leading-4.5 text-muted">{account.detail}</p>
                    </div>
                    <button
                      type="button"
                      className={buttonClass({ variant: account.connected ? "ghost" : "secondary", size: "sm" })}
                    >
                      {account.connected ? "Disconnect" : "Connect"}
                    </button>
                  </li>
                );
              })}
            </ul>
          </Card>

          <Card id="notifications" className="scroll-mt-24">
            <CardHeader title="Notifications" description={`Emails go to ${currentUser.email}.`} />
            <div className="flex flex-col divide-y divide-line-soft px-5 pt-1 pb-1 sm:px-6">
              {notificationSettings.map((setting) => (
                <SwitchRow
                  key={setting.label}
                  label={setting.label}
                  description={setting.description}
                  defaultChecked={setting.on}
                  disabled={setting.locked}
                />
              ))}
            </div>
          </Card>

          <Card id="delete" className="scroll-mt-24 border-danger/20">
            <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div className="flex flex-col gap-0.5">
                <h2 className="text-[15px] leading-5.5 font-semibold tracking-[-0.01em]">Delete account</h2>
                <p className="max-w-lg text-[13px] leading-4.5 text-pretty text-muted">
                  Permanently remove your account, sessions and sign-in methods. This can’t be undone.
                </p>
              </div>
              <button type="button" className={buttonClass({ variant: "danger" })}>
                <TrashIcon className="size-4" />
                Delete account
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
