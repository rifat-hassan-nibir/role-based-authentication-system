// Static sample content for the app screens. Replace with real data sources.

export type Role = "Admin" | "Editor" | "User";

export const currentUser = {
  firstName: "Alex",
  lastName: "Morgan",
  name: "Alex Morgan",
  email: "alex.morgan@company.com",
  role: "Admin" as Role,
  jobTitle: "Head of Operations",
  memberSince: "March 2024",
};

/* ---------- Home ---------- */

export const attentionItems = [
  {
    title: "Save your recovery codes",
    description: "You’ll need them if you lose access to your authenticator app.",
    href: "/user",
    area: "User",
  },
  {
    title: "3 articles are waiting for review",
    description: "The oldest has been in the queue for 2 days.",
    href: "/editor",
    area: "Editor",
  },
  {
    title: "Daniel Kim hasn’t accepted the invite",
    description: "Sent 2 days ago. Resend it or revoke access.",
    href: "/admin",
    area: "Admin",
  },
];

export const myRecentActivity = [
  { action: "Signed in with a passkey", detail: "Chrome on macOS · New York, US", time: "2 min ago" },
  { action: "Approved “Sign in with Google, Apple or GitHub”", detail: "Help center · Getting started", time: "4 hours ago" },
  { action: "Changed Priya Raman’s role to Editor", detail: "Admin · Members", time: "Yesterday" },
  { action: "Turned on two-factor for all admins", detail: "Admin · Security policies", time: "Yesterday" },
  { action: "Added a new device", detail: "iPhone 15 · Safari", time: "Sep 27" },
];

/* ---------- Admin ---------- */

export type MemberStatus = "Active" | "Invited" | "Suspended";

export type Member = {
  name: string;
  email: string;
  role: Role;
  status: MemberStatus;
  twoFactor: boolean;
  lastActive: string;
};

export const members: Member[] = [
  { name: "Alex Morgan", email: "alex.morgan@company.com", role: "Admin", status: "Active", twoFactor: true, lastActive: "Just now" },
  { name: "Priya Raman", email: "priya.raman@company.com", role: "Editor", status: "Active", twoFactor: true, lastActive: "12 min ago" },
  { name: "Jordan Lee", email: "jordan.lee@company.com", role: "User", status: "Active", twoFactor: false, lastActive: "1 hour ago" },
  { name: "Sofia Alvarez", email: "sofia.alvarez@company.com", role: "Editor", status: "Active", twoFactor: true, lastActive: "3 hours ago" },
  { name: "Daniel Kim", email: "daniel.kim@company.com", role: "User", status: "Invited", twoFactor: false, lastActive: "—" },
  { name: "Amara Okafor", email: "amara.okafor@company.com", role: "Admin", status: "Active", twoFactor: true, lastActive: "Yesterday" },
  { name: "Mei Chen", email: "mei.chen@company.com", role: "User", status: "Active", twoFactor: true, lastActive: "2 days ago" },
  { name: "Lucas Martin", email: "lucas.martin@company.com", role: "User", status: "Suspended", twoFactor: false, lastActive: "Sep 12" },
];

export const adminStats = [
  { label: "Total members", value: "248", delta: "+12", direction: "up", good: true, period: "vs last month" },
  { label: "Active sessions", value: "312", delta: "+8%", direction: "up", good: true, period: "vs last week" },
  { label: "Two-factor adoption", value: "86%", delta: "+4 pts", direction: "up", good: true, period: "vs last month" },
  { label: "Failed sign-ins", value: "37", delta: "−18%", direction: "down", good: true, period: "vs last week" },
] as const;

/** Successful sign-ins per day, Sep 18 – Oct 1. */
export const dailySignIns = [
  { day: "Fri", date: "Sep 18", count: 452 },
  { day: "Sat", date: "Sep 19", count: 188 },
  { day: "Sun", date: "Sep 20", count: 164 },
  { day: "Mon", date: "Sep 21", count: 478 },
  { day: "Tue", date: "Sep 22", count: 503 },
  { day: "Wed", date: "Sep 23", count: 491 },
  { day: "Thu", date: "Sep 24", count: 486 },
  { day: "Fri", date: "Sep 25", count: 447 },
  { day: "Sat", date: "Sep 26", count: 201 },
  { day: "Sun", date: "Sep 27", count: 172 },
  { day: "Mon", date: "Sep 28", count: 512 },
  { day: "Tue", date: "Sep 29", count: 528 },
  { day: "Wed", date: "Sep 30", count: 507 },
  { day: "Thu", date: "Oct 1", count: 496 },
];

export const roles = [
  { name: "Admin" as Role, members: 6, description: "Full access to members, roles, security policies and billing." },
  { name: "Editor" as Role, members: 18, description: "Create, review and publish help-center articles." },
  { name: "User" as Role, members: 224, description: "Manage their own account, devices and sign-in methods." },
];

export const auditEvents = [
  { kind: "role", actor: "Amara Okafor", text: "changed Priya Raman’s role to Editor", time: "18 min ago" },
  { kind: "alert", actor: "System", text: "blocked 5 failed sign-ins for jordan.lee@company.com from 203.0.113.42", time: "1 hour ago" },
  { kind: "policy", actor: "Alex Morgan", text: "required two-factor authentication for all admins", time: "Yesterday" },
  { kind: "invite", actor: "Alex Morgan", text: "invited daniel.kim@company.com as a User", time: "2 days ago" },
  { kind: "suspend", actor: "Amara Okafor", text: "suspended Lucas Martin after a password-spray alert", time: "Sep 12" },
] as const;

export const securityPolicies = [
  { label: "Two-factor for admins", value: "Required", on: true },
  { label: "Minimum password length", value: "12 characters", on: true },
  { label: "Session timeout", value: "12 hours", on: true },
  { label: "Passkeys", value: "Allowed", on: true },
  { label: "Sign-in from new countries", value: "Email alert only", on: false },
];

/* ---------- User ---------- */

export const securityChecklist = [
  { label: "Email address verified", done: true },
  { label: "Strong password set", done: true },
  { label: "Two-factor authentication on", done: true },
  { label: "Recovery codes saved", done: false },
];

export const sessions = [
  { device: "MacBook Pro", kind: "desktop", browser: "Chrome on macOS", location: "New York, US", lastActive: "Active now", current: true },
  { device: "iPhone 15", kind: "mobile", browser: "Safari on iOS", location: "New York, US", lastActive: "2 hours ago", current: false },
  { device: "Windows PC", kind: "desktop", browser: "Edge on Windows 11", location: "Chicago, US", lastActive: "3 days ago", current: false },
] as const;

export type SignInResult = "Success" | "Failed" | "Blocked";

export const signInHistory: {
  time: string;
  method: string;
  device: string;
  location: string;
  ip: string;
  result: SignInResult;
}[] = [
  { time: "Today, 9:41 AM", method: "Passkey", device: "Chrome · macOS", location: "New York, US", ip: "198.51.100.24", result: "Success" },
  { time: "Today, 7:02 AM", method: "Password + 2FA", device: "Safari · iOS", location: "New York, US", ip: "198.51.100.24", result: "Success" },
  { time: "Sep 30, 11:18 PM", method: "Password", device: "Firefox · Linux", location: "Lagos, NG", ip: "203.0.113.42", result: "Blocked" },
  { time: "Sep 30, 11:17 PM", method: "Password", device: "Firefox · Linux", location: "Lagos, NG", ip: "203.0.113.42", result: "Failed" },
  { time: "Sep 28, 8:55 AM", method: "Google", device: "Edge · Windows", location: "Chicago, US", ip: "192.0.2.117", result: "Success" },
];

/* ---------- Editor ---------- */

export type ArticleStatus = "Draft" | "In review" | "Scheduled" | "Published";

export type Article = {
  title: string;
  category: string;
  author: string;
  status: ArticleStatus;
  updated: string;
  readTime: string;
};

export const articles: Article[] = [
  { title: "Reset a forgotten password", category: "Account", author: "Priya Raman", status: "In review", updated: "2 hours ago", readTime: "3 min" },
  { title: "Password requirements explained", category: "Security", author: "Priya Raman", status: "In review", updated: "5 hours ago", readTime: "4 min" },
  { title: "Recognise and report suspicious sign-ins", category: "Security", author: "Noah Williams", status: "In review", updated: "2 days ago", readTime: "5 min" },
  { title: "Manage your active sessions", category: "Account", author: "Noah Williams", status: "Draft", updated: "Yesterday", readTime: "3 min" },
  { title: "Invite members to your workspace", category: "Admin guides", author: "Sofia Alvarez", status: "Draft", updated: "Sep 29", readTime: "4 min" },
  { title: "Passkeys are here: sign in without a password", category: "Announcements", author: "Sofia Alvarez", status: "Scheduled", updated: "Sep 30", readTime: "2 min" },
  { title: "Q4 security policy update", category: "Announcements", author: "Noah Williams", status: "Scheduled", updated: "Sep 26", readTime: "3 min" },
  { title: "Set up two-factor authentication", category: "Security", author: "Priya Raman", status: "Published", updated: "Sep 28", readTime: "4 min" },
  { title: "Sign in with Google, Apple or GitHub", category: "Getting started", author: "Sofia Alvarez", status: "Published", updated: "Sep 24", readTime: "2 min" },
  { title: "Recovery codes: what they are and where to keep them", category: "Security", author: "Noah Williams", status: "Published", updated: "Sep 15", readTime: "3 min" },
];

export const publishingSchedule = [
  { title: "Passkeys are here: sign in without a password", date: "Tue, Oct 6", time: "9:00 AM" },
  { title: "Q4 security policy update", date: "Mon, Oct 12", time: "10:00 AM" },
];

/* ---------- Profile ---------- */

export const connectedAccounts = [
  { provider: "Google", connected: true, detail: "alex.morgan@company.com" },
  { provider: "GitHub", connected: true, detail: "@alexmorgan" },
  { provider: "Apple", connected: false, detail: "Not connected" },
] as const;

export const notificationSettings = [
  { label: "Security alerts", description: "New sign-ins, password changes and two-factor updates. Always on for admins.", on: true, locked: true },
  { label: "Account activity", description: "Role changes, invitations and members joining.", on: true, locked: false },
  { label: "Weekly summary", description: "A Monday email with sign-in trends and pending reviews.", on: true, locked: false },
  { label: "Product updates", description: "New features and improvements, about once a month.", on: false, locked: false },
];
