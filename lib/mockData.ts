export type EnvelopeStatus =
  | "signed"
  | "pending"
  | "reminded"
  | "expired"
  | "draft";

export interface Envelope {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  documentName: string;
  status: EnvelopeStatus;
  sentAt: string;
  signedAt?: string;
  remindersSent: number;
  nextReminder?: string;
  fee: number;
  company: string;
}

export interface AuditEvent {
  id: string;
  envelopeId: string;
  action: string;
  timestamp: string;
  ip: string;
  device: string;
  location: string;
}

export interface ActivityItem {
  id: string;
  type: "signed" | "sent" | "reminder" | "bulk" | "expired";
  message: string;
  timestamp: string;
  envelopeId?: string;
}

export interface BulkCampaign {
  id: string;
  name: string;
  totalRecipients: number;
  signed: number;
  pending: number;
  reminded: number;
  expired: number;
  createdAt: string;
  status: "active" | "completed" | "draft";
}

export const PREPARER = {
  name: "Sarah Chen, CPA",
  firm: "Chen & Associates Tax Services",
  email: "sarah@chenassociates.com",
  envelopesThisMonth: 34,
  envelopeLimit: 20,
  plan: "Professional Monthly",
};

export const ENVELOPES: Envelope[] = [
  {
    id: "env-001",
    clientName: "Robert & Margaret Whitfield",
    clientEmail: "rwhitfield@email.com",
    clientPhone: "(503) 555-0142",
    documentName: "2025 Engagement Letter",
    status: "signed",
    sentAt: "2026-01-08T09:15:00Z",
    signedAt: "2026-01-08T14:32:00Z",
    remindersSent: 0,
    fee: 0,
    company: "Whitfield Family Trust",
  },
  {
    id: "env-002",
    clientName: "James O'Brien",
    clientEmail: "jobrien@gmail.com",
    clientPhone: "(206) 555-0287",
    documentName: "Form 8879 Authorization",
    status: "pending",
    sentAt: "2026-01-10T11:00:00Z",
    remindersSent: 1,
    nextReminder: "2026-01-11T11:00:00Z",
    fee: 0,
    company: "O'Brien Plumbing LLC",
  },
  {
    id: "env-003",
    clientName: "Dorothy Henderson",
    clientEmail: "dorothy.h@aol.com",
    clientPhone: "(541) 555-0391",
    documentName: "2025 Engagement Letter",
    status: "reminded",
    sentAt: "2026-01-05T08:30:00Z",
    remindersSent: 2,
    nextReminder: "2026-01-12T08:30:00Z",
    fee: 0,
    company: "Henderson Retirement",
  },
  {
    id: "env-004",
    clientName: "Michael & Lisa Tran",
    clientEmail: "mtran@outlook.com",
    clientPhone: "(971) 555-0456",
    documentName: "S-Corp Election Consent",
    status: "signed",
    sentAt: "2026-01-07T10:00:00Z",
    signedAt: "2026-01-07T16:45:00Z",
    remindersSent: 0,
    fee: 0,
    company: "Tran Digital Marketing",
  },
  {
    id: "env-005",
    clientName: "Frank Delgado",
    clientEmail: "fdelgado@yahoo.com",
    clientPhone: "(503) 555-0512",
    documentName: "2025 Engagement Letter",
    status: "expired",
    sentAt: "2025-12-20T09:00:00Z",
    remindersSent: 3,
    fee: 0,
    company: "Delgado Auto Repair",
  },
  {
    id: "env-006",
    clientName: "Patricia Wu",
    clientEmail: "pwu@icloud.com",
    clientPhone: "(425) 555-0678",
    documentName: "Form 8879 Authorization",
    status: "pending",
    sentAt: "2026-01-10T15:30:00Z",
    remindersSent: 0,
    nextReminder: "2026-01-11T15:30:00Z",
    fee: 0,
    company: "Wu Consulting",
  },
  {
    id: "env-007",
    clientName: "George & Helen Morrison",
    clientEmail: "gmorrison@comcast.net",
    clientPhone: "(360) 555-0789",
    documentName: "Estate Tax Return Authorization",
    status: "signed",
    sentAt: "2026-01-06T13:00:00Z",
    signedAt: "2026-01-06T18:22:00Z",
    remindersSent: 0,
    fee: 0,
    company: "Morrison Estate",
  },
  {
    id: "env-008",
    clientName: "Angela Brooks",
    clientEmail: "abrooks@gmail.com",
    clientPhone: "(503) 555-0834",
    documentName: "2025 Engagement Letter",
    status: "reminded",
    sentAt: "2026-01-04T10:15:00Z",
    remindersSent: 2,
    nextReminder: "2026-01-11T10:15:00Z",
    fee: 0,
    company: "Brooks Bakery Inc",
  },
];

export const AUDIT_TRAIL: AuditEvent[] = [
  {
    id: "aud-001",
    envelopeId: "env-001",
    action: "Document signed",
    timestamp: "2026-01-08T14:32:00Z",
    ip: "73.42.18.91",
    device: "iPhone 14 Pro · Safari 18.2",
    location: "Portland, OR",
  },
  {
    id: "aud-002",
    envelopeId: "env-001",
    action: "Signing link opened",
    timestamp: "2026-01-08T14:28:00Z",
    ip: "73.42.18.91",
    device: "iPhone 14 Pro · Safari 18.2",
    location: "Portland, OR",
  },
  {
    id: "aud-003",
    envelopeId: "env-001",
    action: "SMS delivered",
    timestamp: "2026-01-08T09:15:03Z",
    ip: "—",
    device: "Twilio SMS Gateway",
    location: "—",
  },
  {
    id: "aud-004",
    envelopeId: "env-001",
    action: "Email delivered",
    timestamp: "2026-01-08T09:15:05Z",
    ip: "—",
    device: "Resend Email API",
    location: "—",
  },
  {
    id: "aud-005",
    envelopeId: "env-002",
    action: "24hr reminder sent (SMS + email)",
    timestamp: "2026-01-11T11:00:00Z",
    ip: "—",
    device: "Automated Cron Job",
    location: "—",
  },
  {
    id: "aud-006",
    envelopeId: "env-003",
    action: "72hr reminder sent (SMS + email)",
    timestamp: "2026-01-08T08:30:00Z",
    ip: "—",
    device: "Automated Cron Job",
    location: "—",
  },
  {
    id: "aud-007",
    envelopeId: "env-004",
    action: "Document signed",
    timestamp: "2026-01-07T16:45:00Z",
    ip: "192.168.1.45",
    device: "Samsung Galaxy S23 · Chrome 131",
    location: "Beaverton, OR",
  },
  {
    id: "aud-008",
    envelopeId: "env-005",
    action: "Envelope expired (7-day limit)",
    timestamp: "2025-12-27T09:00:00Z",
    ip: "—",
    device: "Automated Cron Job",
    location: "—",
  },
];

export const ACTIVITY_FEED: ActivityItem[] = [
  {
    id: "act-001",
    type: "signed",
    message: "Robert & Margaret Whitfield signed 2025 Engagement Letter",
    timestamp: "2026-01-08T14:32:00Z",
    envelopeId: "env-001",
  },
  {
    id: "act-002",
    type: "reminder",
    message: "24hr reminder sent to James O'Brien for Form 8879",
    timestamp: "2026-01-11T11:00:00Z",
    envelopeId: "env-002",
  },
  {
    id: "act-003",
    type: "signed",
    message: "Michael & Lisa Tran signed S-Corp Election Consent",
    timestamp: "2026-01-07T16:45:00Z",
    envelopeId: "env-004",
  },
  {
    id: "act-004",
    type: "bulk",
    message: "Bulk campaign 'Tax Season 2026' sent to 47 clients",
    timestamp: "2026-01-03T08:00:00Z",
  },
  {
    id: "act-005",
    type: "sent",
    message: "Engagement letter sent to Patricia Wu",
    timestamp: "2026-01-10T15:30:00Z",
    envelopeId: "env-006",
  },
  {
    id: "act-006",
    type: "reminder",
    message: "72hr reminder sent to Dorothy Henderson",
    timestamp: "2026-01-08T08:30:00Z",
    envelopeId: "env-003",
  },
  {
    id: "act-007",
    type: "expired",
    message: "Frank Delgado envelope expired after 7 days",
    timestamp: "2025-12-27T09:00:00Z",
    envelopeId: "env-005",
  },
  {
    id: "act-008",
    type: "signed",
    message: "George & Helen Morrison signed Estate Tax Authorization",
    timestamp: "2026-01-06T18:22:00Z",
    envelopeId: "env-007",
  },
];

export const BULK_CAMPAIGNS: BulkCampaign[] = [
  {
    id: "bulk-001",
    name: "Tax Season 2026 — Engagement Letters",
    totalRecipients: 47,
    signed: 31,
    pending: 9,
    reminded: 5,
    expired: 2,
    createdAt: "2026-01-03T08:00:00Z",
    status: "active",
  },
  {
    id: "bulk-002",
    name: "Q4 2025 — Form 8879 Batch",
    totalRecipients: 23,
    signed: 23,
    pending: 0,
    reminded: 0,
    expired: 0,
    createdAt: "2025-12-15T10:00:00Z",
    status: "completed",
  },
];

export const MONTHLY_STATS = [
  { month: "Aug", envelopes: 12, signed: 11 },
  { month: "Sep", envelopes: 15, signed: 14 },
  { month: "Oct", envelopes: 18, signed: 16 },
  { month: "Nov", envelopes: 22, signed: 20 },
  { month: "Dec", envelopes: 28, signed: 24 },
  { month: "Jan", envelopes: 34, signed: 22 },
];

export const REMINDER_SEQUENCE = [
  { day: 1, label: "24 hours", channel: "SMS + Email", template: "Friendly nudge" },
  { day: 3, label: "72 hours", channel: "SMS + Email", template: "Second reminder" },
  { day: 7, label: "7 days", channel: "SMS + Email", template: "Final notice + expiry warning" },
];

export const BULK_RECIPIENTS = [
  { name: "Robert & Margaret Whitfield", email: "rwhitfield@email.com", status: "signed" as const },
  { name: "James O'Brien", email: "jobrien@gmail.com", status: "pending" as const },
  { name: "Dorothy Henderson", email: "dorothy.h@aol.com", status: "reminded" as const },
  { name: "Michael & Lisa Tran", email: "mtran@outlook.com", status: "signed" as const },
  { name: "Frank Delgado", email: "fdelgado@yahoo.com", status: "expired" as const },
  { name: "Patricia Wu", email: "pwu@icloud.com", status: "pending" as const },
  { name: "George & Helen Morrison", email: "gmorrison@comcast.net", status: "signed" as const },
  { name: "Angela Brooks", email: "abrooks@gmail.com", status: "reminded" as const },
];

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function statusColor(status: EnvelopeStatus): string {
  switch (status) {
    case "signed":
      return "text-brand-400 bg-brand-400/10";
    case "pending":
      return "text-amber-400 bg-amber-400/10";
    case "reminded":
      return "text-orange-400 bg-orange-400/10";
    case "expired":
      return "text-red-400 bg-red-400/10";
    case "draft":
      return "text-slate-400 bg-slate-400/10";
  }
}
