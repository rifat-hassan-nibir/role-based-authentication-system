"use client";

import { useState } from "react";
import type { Member, MemberStatus, Role } from "../../_data/sample";
import { CheckCircleIcon, CircleIcon, PencilIcon, SearchIcon } from "../../_components/icons";
import { Avatar, Badge, Card, CardHeader, buttonClass, cn, inputClass, type Tone } from "../../_components/ui";

const filters: { label: string; role: Role | null }[] = [
  { label: "All", role: null },
  { label: "Admins", role: "Admin" },
  { label: "Editors", role: "Editor" },
  { label: "Users", role: "User" },
];

const statusTone: Record<MemberStatus, Tone> = {
  Active: "success",
  Invited: "warning",
  Suspended: "danger",
};

export function MembersTable({ members, total }: { members: Member[]; total: number }) {
  const [role, setRole] = useState<Role | null>(null);
  const [query, setQuery] = useState("");

  const needle = query.trim().toLowerCase();
  const rows = members.filter(
    (member) =>
      (!role || member.role === role) &&
      (!needle || member.name.toLowerCase().includes(needle) || member.email.includes(needle)),
  );

  return (
    <Card>
      <CardHeader title="Members" description={`${total} people have access to this workspace.`} />

      <div className="flex flex-col gap-3 px-5 pt-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex w-fit gap-1 rounded-[10px] bg-fill p-1" role="group" aria-label="Filter by role">
          {filters.map((filter) => {
            const selected = role === filter.role;
            return (
              <button
                key={filter.label}
                type="button"
                aria-pressed={selected}
                onClick={() => setRole(filter.role)}
                className={cn(
                  "h-8 rounded-[7px] px-3 text-[13px] font-medium transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none sm:h-7",
                  selected ? "bg-white text-ink shadow-control" : "text-body hover:text-ink",
                )}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        <div className="relative sm:w-64">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" />
          <label htmlFor="member-search" className="sr-only">
            Search members
          </label>
          <input
            id="member-search"
            type="search"
            placeholder="Search name or email"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className={cn(inputClass, "pl-9")}
          />
        </div>
      </div>

      <div className="relative mt-4 overflow-x-auto">
        <table className="w-full min-w-190 text-left text-sm">
          <thead className="border-y border-line-soft bg-fill-faint text-[12px] leading-4 font-medium text-muted">
            <tr>
              <th scope="col" className="py-2.5 pr-4 pl-5 font-medium sm:pl-6">Member</th>
              <th scope="col" className="px-4 py-2.5 font-medium">Role</th>
              <th scope="col" className="px-4 py-2.5 font-medium">Status</th>
              <th scope="col" className="px-4 py-2.5 font-medium">Two-factor</th>
              <th scope="col" className="px-4 py-2.5 font-medium">Last active</th>
              <th scope="col" className="py-2.5 pr-5 pl-4 sm:pr-6">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line-soft">
            {rows.map((member) => (
              <tr key={member.email} className="transition-colors duration-150 hover:bg-fill-faint">
                <td className="py-3 pr-4 pl-5 sm:pl-6">
                  <div className="flex items-center gap-3">
                    <Avatar name={member.name} />
                    <div className="flex min-w-0 flex-col">
                      <span className="leading-5 font-medium">{member.name}</span>
                      <span className="text-[13px] leading-4.5 text-muted">{member.email}</span>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <Badge tone={member.role === "Admin" ? "accent" : "neutral"}>{member.role}</Badge>
                </td>
                <td className="px-4 py-3">
                  <Badge tone={statusTone[member.status]} dot>
                    {member.status}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  {member.twoFactor ? (
                    <span className="inline-flex items-center gap-1.5 text-[13px] text-success">
                      <CheckCircleIcon className="size-4" />
                      On
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-[13px] text-muted">
                      <CircleIcon className="size-4" />
                      Off
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-[13px] text-body">{member.lastActive}</td>
                <td className="py-3 pr-5 pl-4 text-right sm:pr-6">
                  <button
                    type="button"
                    aria-label={`Edit ${member.name}`}
                    className={buttonClass({ variant: "ghost", size: "sm" })}
                  >
                    <PencilIcon className="size-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {rows.length === 0 && (
          <p className="px-6 py-10 text-center text-sm text-muted">
            No members match {needle ? `“${query.trim()}”` : "this filter"}.
          </p>
        )}
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-line-soft px-5 py-3 sm:px-6">
        <p className="text-[13px] leading-4.5 text-muted">
          Showing {rows.length} of {total}
        </p>
        <div className="flex gap-2">
          <button type="button" disabled className={buttonClass({ size: "sm" })}>
            Previous
          </button>
          <button type="button" className={buttonClass({ size: "sm" })}>
            Next
          </button>
        </div>
      </div>
    </Card>
  );
}
