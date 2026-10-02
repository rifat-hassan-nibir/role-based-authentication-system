import type { Metadata } from "next";
import { adminStats, auditEvents, dailySignIns, members, roles, securityPolicies } from "../_data/sample";
import {
  AlertTriangleIcon,
  CheckCircleIcon,
  CircleIcon,
  DownloadIcon,
  LockIcon,
  PencilIcon,
  ShieldCheckIcon,
  UserIcon,
  UserPlusIcon,
  UsersIcon,
} from "../_components/icons";
import { Card, CardHeader, IconTile, PageHeader, StatTile, buttonClass, cn, type Tone } from "../_components/ui";
import { MembersTable } from "./_components/members-table";
import { SignInsChart } from "./_components/sign-ins-chart";

export const metadata: Metadata = {
  title: "Admin",
};

const roleIcon = { Admin: ShieldCheckIcon, Editor: PencilIcon, User: UserIcon };

const eventStyle: Record<(typeof auditEvents)[number]["kind"], { icon: typeof UserIcon; tone: Tone }> = {
  role: { icon: UsersIcon, tone: "neutral" },
  alert: { icon: AlertTriangleIcon, tone: "danger" },
  policy: { icon: ShieldCheckIcon, tone: "success" },
  invite: { icon: UserPlusIcon, tone: "accent" },
  suspend: { icon: LockIcon, tone: "warning" },
};

export default function AdminPage() {
  const totalMembers = roles.reduce((sum, role) => sum + role.members, 0);
  const totalSignIns = dailySignIns.reduce((sum, day) => sum + day.count, 0);

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow="Admin"
        title="Workspace admin"
        description="Members, roles and the security policies that keep every sign-in safe."
        actions={
          <>
            <button type="button" className={buttonClass()}>
              <DownloadIcon className="size-4" />
              Export
            </button>
            <button type="button" className={buttonClass({ variant: "primary" })}>
              <UserPlusIcon className="size-4" />
              Invite member
            </button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {adminStats.map((stat) => (
          <StatTile key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="Sign-ins"
            description="Successful sign-ins per day, last 14 days"
            action={
              <p className="text-right text-[13px] leading-4.5 text-muted">
                <span className="block text-lg leading-6 font-semibold text-ink">
                  {totalSignIns.toLocaleString("en-US")}
                </span>
                total
              </p>
            }
          />
          <SignInsChart data={dailySignIns} />
        </Card>

        <Card className="flex flex-col">
          <CardHeader title="Roles" description={`${totalMembers} members across ${roles.length} roles`} />
          <ul className="flex flex-col gap-1 p-2 pt-3 sm:px-3">
            {roles.map((role) => (
              <li key={role.name} className="flex gap-3 rounded-xl px-3 py-3">
                <IconTile icon={roleIcon[role.name]} tone={role.name === "Admin" ? "accent" : "neutral"} />
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="text-sm leading-5 font-semibold">{role.name}</p>
                    <p className="text-[13px] leading-4.5 text-muted tabular-nums">
                      {role.members} {role.members === 1 ? "member" : "members"}
                    </p>
                  </div>
                  <p className="text-[13px] leading-4.5 text-pretty text-body">{role.description}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-auto border-t border-line-soft px-5 py-3 sm:px-6">
            <button type="button" className={cn(buttonClass({ variant: "ghost", size: "sm" }), "-ml-3 sm:-ml-2.5")}>
              Manage roles
            </button>
          </div>
        </Card>
      </div>

      <MembersTable members={members} total={totalMembers} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Audit log" description="Security-relevant changes, newest first." />
          <ul className="flex flex-col px-5 pt-2 pb-3 sm:px-6">
            {auditEvents.map((event) => {
              const style = eventStyle[event.kind];
              return (
                <li key={event.text} className="flex items-start gap-3 border-b border-line-soft py-3.5 last:border-0">
                  <IconTile icon={style.icon} tone={style.tone} />
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                    <p className="text-sm leading-5 text-pretty text-body">
                      <span className="font-medium text-ink">{event.actor}</span> {event.text}
                    </p>
                    <p className="shrink-0 text-[13px] leading-4.5 text-muted">{event.time}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Card>

        <Card className="flex flex-col">
          <CardHeader title="Security policies" description="Applied to every member at sign-in." />
          <dl className="flex flex-col px-5 pt-2 sm:px-6">
            {securityPolicies.map((policy) => (
              <div key={policy.label} className="flex items-center gap-3 border-b border-line-soft py-3 last:border-0">
                {policy.on ? (
                  <CheckCircleIcon className="size-4 shrink-0 text-success" aria-label="Enforced" />
                ) : (
                  <CircleIcon className="size-4 shrink-0 text-muted" aria-label="Not enforced" />
                )}
                <dt className="flex-1 text-sm leading-5 text-body">{policy.label}</dt>
                <dd className="text-right text-[13px] leading-4.5 font-medium">{policy.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-auto border-t border-line-soft px-5 py-3 sm:px-6">
            <button type="button" className={cn(buttonClass({ variant: "ghost", size: "sm" }), "-ml-3 sm:-ml-2.5")}>
              Edit policies
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
