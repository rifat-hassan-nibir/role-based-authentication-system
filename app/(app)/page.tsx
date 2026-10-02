import Link from "next/link";
import { attentionItems, currentUser, myRecentActivity, securityChecklist } from "./_data/sample";
import {
  AlertTriangleIcon,
  ArrowRightIcon,
  FileTextIcon,
  ShieldCheckIcon,
  UserIcon,
  UserPlusIcon,
  UsersIcon,
} from "./_components/icons";
import { Badge, Card, CardHeader, IconTile, Meter, buttonClass, type Tone } from "./_components/ui";

const areas = [
  {
    href: "/admin",
    title: "Admin",
    description: "Manage members, roles and the security policies everyone signs in under.",
    meta: "248 members · 6 admins",
    icon: UsersIcon,
  },
  {
    href: "/user",
    title: "User",
    description: "Your sign-in methods, signed-in devices and recent account activity.",
    meta: "3 active sessions",
    icon: UserIcon,
  },
  {
    href: "/editor",
    title: "Editor",
    description: "Draft, review and publish the help-center articles members rely on.",
    meta: "3 articles in review",
    icon: FileTextIcon,
  },
];

const attentionStyle: Record<string, { icon: typeof UserIcon; tone: Tone }> = {
  User: { icon: AlertTriangleIcon, tone: "warning" },
  Editor: { icon: FileTextIcon, tone: "accent" },
  Admin: { icon: UserPlusIcon, tone: "neutral" },
};

export default function HomePage() {
  const done = securityChecklist.filter((item) => item.done).length;

  return (
    <div className="flex flex-col gap-8">
      <section className="hero-wash relative overflow-hidden rounded-3xl border border-ink/6 shadow-card">
        <div className="grid grid-cols-1 gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-center lg:p-10">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <p className="text-[13px] leading-4.5 font-medium text-accent">Overview</p>
              <h1 className="text-[30px] leading-9 font-semibold tracking-[-0.025em] sm:text-[36px] sm:leading-[44px]">
                Welcome back, {currentUser.firstName}
              </h1>
              <p className="max-w-xl text-[15px] leading-6 text-pretty text-body sm:text-base">
                Your workspace is in good shape. Three things need a look today — start with your recovery codes.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href="/user" className={buttonClass({ variant: "primary" })}>
                Review security
                <ArrowRightIcon className="size-4" />
              </Link>
              <Link href="/admin" className={buttonClass()}>
                <UserPlusIcon className="size-4" />
                Invite member
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-2xl border border-ink/6 bg-white/80 p-5 shadow-control backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <IconTile icon={ShieldCheckIcon} tone="success" />
              <div className="flex flex-col">
                <p className="text-sm leading-5 font-semibold">Account security</p>
                <p className="text-[13px] leading-4.5 text-muted">
                  {done} of {securityChecklist.length} steps complete
                </p>
              </div>
            </div>
            <Meter value={done} max={securityChecklist.length} label="Account security steps complete" />
            <ul className="flex flex-col gap-2">
              {securityChecklist.map((item) => (
                <li key={item.label} className="flex items-center gap-2 text-[13px] leading-4.5">
                  <span
                    aria-hidden="true"
                    className={`size-1.5 shrink-0 rounded-full ${item.done ? "bg-success" : "bg-warning"}`}
                  />
                  <span className={item.done ? "text-body" : "font-medium text-ink"}>{item.label}</span>
                  <span className="sr-only">{item.done ? "(done)" : "(to do)"}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="areas-heading" className="flex flex-col gap-4">
        <h2 id="areas-heading" className="text-[17px] leading-6 font-semibold tracking-[-0.01em]">
          Jump back in
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {areas.map(({ href, title, description, meta, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="group flex flex-col gap-4 rounded-2xl border border-ink/6 bg-white p-5 shadow-control transition-[border-color,box-shadow] duration-150 hover:border-line-strong hover:shadow-card focus-visible:ring-4 focus-visible:ring-accent/20 focus-visible:outline-none"
            >
              <div className="flex items-start justify-between">
                <span className="flex size-10 items-center justify-center rounded-xl bg-ink text-white shadow-logo">
                  <Icon className="size-5" />
                </span>
                <ArrowRightIcon className="size-4.5 text-muted transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-ink" />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-base leading-6 font-semibold">{title}</p>
                <p className="text-sm leading-5 text-pretty text-body">{description}</p>
              </div>
              <p className="mt-auto text-[13px] leading-4.5 font-medium text-muted">{meta}</p>
            </Link>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader title="Needs your attention" description="Things that are waiting on you across the workspace." />
          <ul className="flex flex-col p-2 pt-3 sm:px-3">
            {attentionItems.map((item) => {
              const style = attentionStyle[item.area];
              return (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-4 rounded-xl px-3 py-3 transition-colors duration-150 hover:bg-fill-subtle focus-visible:ring-4 focus-visible:ring-accent/20 focus-visible:outline-none"
                  >
                    <IconTile icon={style.icon} tone={style.tone} />
                    <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                      <p className="text-sm leading-5 font-medium">{item.title}</p>
                      <p className="text-[13px] leading-4.5 text-pretty text-muted">{item.description}</p>
                    </div>
                    <span className="hidden sm:block">
                      <Badge>{item.area}</Badge>
                    </span>
                    <ArrowRightIcon className="size-4 shrink-0 text-muted transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-ink" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader title="Your recent activity" description="The last few things you did." />
          <ol className="flex flex-col px-5 pt-4 pb-5 sm:px-6">
            {myRecentActivity.map((item, index) => (
              <li key={item.action} className="relative flex gap-3 pb-5 last:pb-0">
                {index < myRecentActivity.length - 1 && (
                  <span aria-hidden="true" className="absolute top-4 bottom-0 left-[4px] w-px bg-line-soft" />
                )}
                <span aria-hidden="true" className="relative mt-1.5 size-[9px] shrink-0 rounded-full border-2 border-white bg-accent ring-1 ring-accent/30" />
                <div className="flex min-w-0 flex-col gap-0.5">
                  <p className="text-sm leading-5 font-medium text-pretty">{item.action}</p>
                  <p className="text-[13px] leading-4.5 text-muted">
                    {item.detail} · {item.time}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Card>
      </div>
    </div>
  );
}
