import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Developer Docs — SignSimple",
  description: "Feature documentation for the SignSimple demo — what's mocked vs. production.",
};

interface FeatureDoc {
  name: string;
  description: string;
  demoLocation: string;
  mocked: string[];
  production: string[];
  dataFlow: string;
}

const features: FeatureDoc[] = [
  {
    name: "One-Click Sign Link (SMS + Email)",
    description:
      "Preparer uploads a PDF and enters client contact info. System sends a one-tap signing link via SMS and a parallel email — no account creation for signers.",
    demoLocation: "Demo → Send Envelope tab (3-step wizard) → step 3 'Send Envelope' button",
    mocked: [
      "PDF upload is simulated (click triggers toast)",
      "SMS/email delivery shown as success toast",
      "No actual Twilio or Resend API calls",
    ],
    production: [
      "PDF stored in Supabase Storage",
      "Unique signing URL generated per envelope (JWT or UUID token)",
      "Twilio sends SMS with one-tap deep link",
      "Resend sends branded HTML email in parallel",
      "Delivery status webhooks update envelope record",
    ],
    dataFlow:
      "Preparer uploads PDF → envelope record created in Supabase → signing URL generated → Twilio SMS API + Resend Email API called in parallel → delivery webhooks update status → client opens link (no auth required)",
  },
  {
    name: "Mobile-First Client Signing Flow",
    description:
      "Large buttons, plain language, no login. Optimized for older/non-technical clients signing on their phone.",
    demoLocation: "Demo → Client Signing tab → tap through Welcome → Review → Sign → Done",
    mocked: [
      "Phone frame UI with simulated document preview",
      "Signature captured by clicking (not canvas drawing)",
      "No actual PDF overlay or storage",
    ],
    production: [
      "Unique URL opens mobile-optimized signing page",
      "Document rendered via PDF.js viewer",
      "Signature captured via HTML canvas → base64 image",
      "PDF-lib overlays signature at predefined coordinates",
      "Signed PDF stored in Supabase Storage",
      "Audit event logged with IP, timestamp, device",
    ],
    dataFlow:
      "Client taps SMS link → signing page loads (no auth) → reviews PDF → draws signature on canvas → signature overlaid on PDF via PDF-lib → signed PDF uploaded to storage → webhook notifies preparer → envelope marked signed",
  },
  {
    name: "Audit Trail",
    description:
      "Every signature event logged with IP address, timestamp, and device fingerprint for compliance.",
    demoLocation: "Demo → Audit Trail tab → filter by envelope → Export button",
    mocked: [
      "8 hardcoded audit events with realistic IPs and devices",
      "Filter dropdown works client-side",
      "Export shows toast (no actual PDF generated)",
    ],
    production: [
      "Append-only audit log table in Supabase",
      "IP from request headers (X-Forwarded-For)",
      "User-Agent parsed to device/browser string",
      "Geolocation via IP lookup (MaxMind or similar)",
      "Exportable PDF certificate with full chain of custody",
    ],
    dataFlow:
      "Every envelope action (send, open, sign, remind) → server-side middleware captures IP + User-Agent → geolocation lookup → immutable row inserted into audit_events table → preparer can filter/export at any time",
  },
  {
    name: "Bulk Send for Engagement Letters",
    description:
      "Upload one template, import client list, send to entire roster at tax season start.",
    demoLocation: "Demo → Bulk Send tab → select template → 'Send to All 47 Clients' → view campaign history → 'View all recipients'",
    mocked: [
      "CSV import simulated via toast",
      "2 hardcoded campaigns with progress bars",
      "Recipient list is static mock data",
    ],
    production: [
      "CSV upload or QuickBooks Online OAuth import",
      "Merge fields populated per client from CSV columns",
      "Batch envelope creation (queue-based, not synchronous)",
      "Progress tracked per campaign with real-time updates",
      "Same SMS/email delivery per recipient",
    ],
    dataFlow:
      "Preparer selects template → imports client CSV → system creates N envelope records → each triggers parallel SMS/email → campaign tracks aggregate signed/pending/expired counts → preparer monitors via dashboard",
  },
  {
    name: "Automatic Reminder Sequence",
    description:
      "24hr, 72hr, and 7-day reminders fire automatically until signed or expired. Zero manual follow-up.",
    demoLocation: "Demo → Reminders tab → toggle on/off → Preview templates → 'Send now' on upcoming reminders",
    mocked: [
      "Reminder sequence displayed as static config",
      "Toggle enables/disables with toast",
      "Upcoming reminders from mock envelope data",
      "Manual 'Send now' shows toast only",
    ],
    production: [
      "Vercel cron job runs daily at 8am UTC",
      "Queries unsigned envelopes where elapsed time matches reminder threshold",
      "Fires Twilio SMS + Resend email with escalating templates",
      "After 7-day reminder, envelope auto-expires",
      "Preparer can pause reminders per envelope or globally",
    ],
    dataFlow:
      "Cron triggers daily → SELECT envelopes WHERE status='pending' AND next_reminder_at <= NOW() → for each: send SMS + email via Twilio/Resend → increment reminders_sent → set next_reminder_at to next threshold → if day 7 passed: set status='expired'",
  },
  {
    name: "Dashboard & Envelope Management",
    description:
      "Overview of all envelopes with stats, charts, activity feed, and searchable/filterable table.",
    demoLocation: "Demo → Dashboard tab → stats cards → chart → activity feed → envelope table with search/filter → click 'View' on any row",
    mocked: [
      "8 envelopes with realistic tax preparer client data",
      "Bar chart from 6 months of static stats",
      "Activity feed with 8 events",
      "Search and status filter work client-side",
      "Envelope detail modal with action buttons",
    ],
    production: [
      "Real-time stats aggregated from Supabase queries",
      "Chart data from envelope creation timestamps",
      "Activity feed from audit_events table (latest N)",
      "Full-text search on client name and document",
      "Envelope detail with real PDF preview and actions",
    ],
    dataFlow:
      "Dashboard loads → aggregate queries for counts/stats → chart from monthly GROUP BY → activity from recent audit events → table from envelopes table with filters → detail modal fetches envelope + audit trail",
  },
  {
    name: "Stripe Metered Billing",
    description:
      "$19/month base (20 envelopes) + $0.50/envelope overage. Annual plan at $180/year.",
    demoLocation: "Demo → Billing tab → toggle Monthly/Annual → view invoice history → Download buttons",
    mocked: [
      "Usage calculated from hardcoded envelope count (34)",
      "Invoice history is static data",
      "Plan toggle switches display only",
    ],
    production: [
      "Stripe Customer + Subscription with metered price",
      "Usage records reported per envelope creation",
      "Monthly invoice: $19 base + overage auto-calculated",
      "Annual plan via separate Stripe price ID",
      "Invoice PDFs from Stripe billing portal",
    ],
    dataFlow:
      "Envelope created → Stripe usage record reported (quantity: 1) → month-end: Stripe aggregates usage → invoice generated ($19 + max(0, total-20) × $0.50) → auto-charge saved payment method → invoice available in billing portal",
  },
];

export default function DevelopersPage() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-medium text-brand-400">Developer Documentation</p>
          <h1 className="mt-2 text-4xl font-bold text-white">SignSimple Feature Map</h1>
          <p className="mt-4 text-lg text-slate-400">
            Every feature in the demo, what&apos;s mocked, and how it would work in production.
          </p>
        </div>

        {/* Architecture overview */}
        <section className="mt-12 rounded-xl border border-white/5 bg-surface-800 p-6">
          <h2 className="text-lg font-semibold text-white">Proposed Architecture</h2>
          <div className="mt-4 font-mono text-sm text-slate-400 leading-relaxed">
            <p>Next.js 14 (App Router) · Supabase (DB + Storage + Auth)</p>
            <p>PDF-lib (signature overlay) · Twilio (SMS) · Resend (email)</p>
            <p>Stripe (metered billing) · Vercel Cron (reminders)</p>
            <p>Deployed on Vercel · Zero custom server</p>
          </div>
          <div className="mt-4 rounded-lg bg-surface-900 p-4 text-sm text-slate-300">
            <p className="font-medium text-white">DEV NOTE badges in the demo</p>
            <p className="mt-1">
              Click the blue <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-blue-500/20 text-[10px] font-bold text-blue-400">i</span> icons
              next to major controls in the demo for inline production implementation notes.
            </p>
          </div>
        </section>

        {/* Feature docs */}
        <div className="mt-12 space-y-8">
          {features.map((feature, i) => (
            <section
              key={feature.name}
              className="rounded-xl border border-white/5 bg-surface-800 p-6"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-500/20 text-sm font-bold text-brand-400">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white">{feature.name}</h3>
                  <p className="mt-1 text-sm text-slate-400">{feature.description}</p>
                </div>
              </div>

              <div className="mt-4 rounded-lg bg-brand-500/5 border border-brand-500/10 p-3">
                <p className="text-xs font-medium text-brand-400">Where to try it</p>
                <p className="mt-1 text-sm text-slate-300">{feature.demoLocation}</p>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                    Mocked in demo
                  </p>
                  <ul className="mt-2 space-y-1">
                    {feature.mocked.map((m) => (
                      <li key={m} className="flex items-start gap-2 text-sm text-slate-400">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                    Production implementation
                  </p>
                  <ul className="mt-2 space-y-1">
                    {feature.production.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-sm text-slate-400">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-4 rounded-lg bg-surface-900 p-3">
                <p className="text-xs font-medium text-slate-500">Intended data flow</p>
                <p className="mt-1 text-sm text-slate-300">{feature.dataFlow}</p>
              </div>
            </section>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/demo"
            className="inline-block rounded-xl bg-brand-500 px-8 py-3 text-base font-semibold text-white hover:bg-brand-400"
          >
            Open Interactive Demo →
          </Link>
        </div>
      </div>
    </div>
  );
}
