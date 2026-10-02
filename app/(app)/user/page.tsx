import type { Metadata } from "next";
import Link from "next/link";
import { currentUser, securityChecklist, sessions, signInHistory, type SignInResult } from "../_data/sample";
import {
  AlertTriangleIcon,
  CheckCircleIcon,
  CircleIcon,
  MonitorIcon,
  PencilIcon,
  SmartphoneIcon,
} from "../_components/icons";
import { Avatar, Badge, Card, CardHeader, Meter, PageHeader, buttonClass, cn, type Tone } from "../_components/ui";

export const metadata: Metadata = {
  title: "Your account",
};

const resultTone: Record<SignInResult, Tone> = {
  Success: "success",
  Failed: "danger",
  Blocked: "warning",
};

export default function UserPage() {
  const done = securityChecklist.filter((item) => item.done).length;

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow="User"
        title="Your account"
        description="How you sign in, where you’re signed in, and what’s happened on your account lately."
        actions={
          <Link href="/profile" className={buttonClass()}>
            <PencilIcon className="size-4" />
            Edit profile
          </Link>
        }
      />

      <div
        role="status"
        className="flex flex-col gap-3 rounded-2xl border border-warning/25 bg-warning/5 p-4 sm:flex-row sm:items-center sm:gap-4 sm:px-5"
      >
        <AlertTriangleIcon className="size-5 shrink-0 text-warning" />
        <p className="flex-1 text-sm leading-5 text-pretty text-body">
          <span className="font-medium text-ink">We blocked a sign-in attempt from Lagos, NG on Sep 30.</span> If
          that wasn’t you, your password is still safe — but it’s a good moment to save your recovery codes.
        </p>
        <button type="button" className={buttonClass({ size: "sm" })}>
          Review activity
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="flex flex-col">
          <div className="flex flex-col items-center gap-4 px-6 pt-8 pb-6 text-center">
            <Avatar name={currentUser.name} size="lg" />
            <div className="flex flex-col items-center gap-1.5">
              <p className="text-lg leading-6 font-semibold tracking-[-0.01em]">{currentUser.name}</p>
              <p className="text-sm leading-5 text-muted">{currentUser.email}</p>
              <Badge tone="accent">{currentUser.role}</Badge>
            </div>
          </div>
          <dl className="mt-auto grid grid-cols-2 border-t border-line-soft">
            <div className="flex flex-col gap-0.5 border-r border-line-soft px-5 py-4">
              <dt className="text-[12px] leading-4 text-muted">Member since</dt>
              <dd className="text-sm leading-5 font-medium">{currentUser.memberSince}</dd>
            </div>
            <div className="flex flex-col gap-0.5 px-5 py-4">
              <dt className="text-[12px] leading-4 text-muted">Usual sign-in</dt>
              <dd className="text-sm leading-5 font-medium">Passkey</dd>
            </div>
          </dl>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader
            title="Account security"
            description={`${done} of ${securityChecklist.length} steps complete`}
            action={<Badge tone="warning" dot>1 to do</Badge>}
          />
          <div className="px-5 pt-4 sm:px-6">
            <Meter value={done} max={securityChecklist.length} label="Account security steps complete" />
          </div>
          <ul className="grid grid-cols-1 gap-x-6 px-5 pt-2 pb-3 sm:grid-cols-2 sm:px-6">
            {securityChecklist.map((item) => (
              <li key={item.label} className="flex items-center gap-3 border-b border-line-soft py-3.5 last:border-0 sm:nth-last-2:border-0">
                {item.done ? (
                  <CheckCircleIcon className="size-5 shrink-0 text-success" />
                ) : (
                  <CircleIcon className="size-5 shrink-0 text-warning" />
                )}
                <span className={`flex-1 text-sm leading-5 ${item.done ? "text-body" : "font-medium"}`}>
                  {item.label}
                  <span className="sr-only">{item.done ? " (done)" : " (to do)"}</span>
                </span>
                {!item.done && (
                  <button type="button" className={buttonClass({ variant: "primary", size: "sm" })}>
                    Save codes
                  </button>
                )}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card>
        <CardHeader
          title="Where you’re signed in"
          description="Sign out of any device you don’t recognise."
          action={
            <button type="button" className={buttonClass({ size: "sm" })}>
              Sign out of other sessions
            </button>
          }
        />
        <ul className="flex flex-col px-5 pt-2 pb-2 sm:px-6">
          {sessions.map((session) => {
            const Icon = session.kind === "mobile" ? SmartphoneIcon : MonitorIcon;
            return (
              <li key={session.device} className="flex items-center gap-4 border-b border-line-soft py-4 last:border-0">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-line-soft bg-fill-faint text-body">
                  <Icon className="size-5" />
                </span>
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <p className="flex flex-wrap items-center gap-2 text-sm leading-5 font-medium">
                    {session.device}
                    {session.current && <Badge tone="success" dot>This device</Badge>}
                  </p>
                  <p className="text-[13px] leading-4.5 text-muted">
                    {session.browser} · {session.location}
                  </p>
                </div>
                <p className="hidden text-[13px] leading-4.5 text-body sm:block">{session.lastActive}</p>
                {!session.current && (
                  <button type="button" className={buttonClass({ variant: "ghost", size: "sm" })}>
                    Sign out
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </Card>

      <Card>
        <CardHeader title="Recent sign-ins" description="Every attempt to get into your account in the last 7 days." />
        <div className="relative mt-4 overflow-x-auto">
          <table className="w-full min-w-180 text-left text-sm">
            <thead className="border-y border-line-soft bg-fill-faint text-[12px] leading-4 text-muted">
              <tr>
                <th scope="col" className="py-2.5 pr-4 pl-5 font-medium sm:pl-6">When</th>
                <th scope="col" className="px-4 py-2.5 font-medium">Method</th>
                <th scope="col" className="px-4 py-2.5 font-medium">Device</th>
                <th scope="col" className="px-4 py-2.5 font-medium">Location</th>
                <th scope="col" className="px-4 py-2.5 font-medium">IP address</th>
                <th scope="col" className="py-2.5 pr-5 pl-4 font-medium sm:pr-6">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft">
              {signInHistory.map((entry) => (
                <tr key={entry.time} className="transition-colors duration-150 hover:bg-fill-faint">
                  <td className="py-3 pr-4 pl-5 font-medium whitespace-nowrap sm:pl-6">{entry.time}</td>
                  <td className="px-4 py-3 text-body">{entry.method}</td>
                  <td className="px-4 py-3 text-body">{entry.device}</td>
                  <td className="px-4 py-3 text-body">{entry.location}</td>
                  <td className="px-4 py-3 font-mono text-[13px] text-body">{entry.ip}</td>
                  <td className="py-3 pr-5 pl-4 sm:pr-6">
                    <Badge tone={resultTone[entry.result]} dot>
                      {entry.result}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-t border-line-soft px-5 py-3 sm:px-6">
          <button type="button" className={cn(buttonClass({ variant: "ghost", size: "sm" }), "-ml-3 sm:-ml-2.5")}>
            View full history
          </button>
        </div>
      </Card>
    </div>
  );
}
