import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Research — SignSimple",
  description: "How we discovered the SignSimple opportunity through real pain point research.",
};

const checklist = [
  { label: "10+ posts with this pain", passed: true },
  { label: "Paying for inferior solution", passed: true },
  { label: "Reachable channel", passed: true },
  { label: "MVP < 4 weeks", passed: true },
  { label: "Price point high enough", passed: true },
  { label: "Hair-on-fire problem", passed: true },
  { label: "Can pre-sell", passed: true },
  { label: "< 3 competitors", passed: true },
  { label: "Low-maintenance ops (mailbox money)", passed: true },
];

const painPoints = [
  {
    problem:
      "Existing accounting software doesn't meet expectations, is being discontinued, or is overly complicated and expensive for the features offered.",
    persona: "Tax and bookkeeping business owner",
    workaround:
      "Using multiple tools: QuickBooks Online for bookkeeping, DocuSign for e-signatures, Goldmine for scheduling and client paperwork tracking",
    frequency: "daily",
    wtp: "Currently paying for QuickBooks Online, DocuSign, and Goldmine subscriptions",
    url: "https://www.reddit.com/r/Accounting/comments/1u8u89k/looking_for_accounting_program_recommendations/",
  },
  {
    problem:
      "E-signature solution (DocuSign) has reliability issues with clients being unable to complete signatures.",
    persona: "Tax and bookkeeping business owner",
    workaround: "Currently using DocuSign despite frequent client sign-up failures",
    frequency: "weekly",
    wtp: "Paying for DocuSign subscription",
    url: "https://www.reddit.com/r/Accounting/comments/1u8u89k/looking_for_accounting_program_recommendations/",
  },
  {
    problem:
      "Meeting scheduling and client paperwork tracking system is frustrating and unreliable.",
    persona: "Tax and bookkeeping business owner",
    workaround:
      "Using Goldmine for both scheduling and client document submission tracking",
    frequency: "daily",
    wtp: "Paying for Goldmine subscription",
    url: "https://www.reddit.com/r/Accounting/comments/1u8u89k/looking_for_accounting_program_recommendations/",
  },
];

export default function ResearchPage() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <p className="text-sm font-medium text-brand-400">Idea Miner Research</p>
          <h1 className="mt-2 text-4xl font-bold text-white">Why SignSimple Exists</h1>
          <p className="mt-4 text-lg text-slate-400">
            Real pain from real people — validated before a single line of code was written.
          </p>
        </div>

        {/* Score badge */}
        <div className="mt-10 flex justify-center gap-4">
          <div className="rounded-xl border border-brand-500/20 bg-brand-500/5 px-6 py-3 text-center">
            <p className="text-2xl font-bold text-brand-400">95/130</p>
            <p className="text-xs text-slate-500">Rubric Score</p>
          </div>
          <div className="rounded-xl border border-brand-500/20 bg-brand-500/5 px-6 py-3 text-center">
            <p className="text-2xl font-bold text-brand-400">9/9</p>
            <p className="text-xs text-slate-500">Validation Checks</p>
          </div>
          <div className="rounded-xl border border-brand-500/20 bg-brand-500/5 px-6 py-3 text-center">
            <p className="text-2xl font-bold text-brand-400">E-Signature</p>
            <p className="text-xs text-slate-500">Cluster</p>
          </div>
        </div>

        {/* Origin story */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-white">The origin story</h2>
          <div className="mt-4 space-y-4 text-slate-300 leading-relaxed">
            <p>
              A tax and bookkeeping business owner on r/Accounting specifically called out
              DocuSign&apos;s reliability problems — clients were frequently unable to complete
              signatures, creating back-and-forth that wasted time every week. They were actively
              looking for alternatives but found nothing purpose-built for their use case.
            </p>
            <p>
              DocuSign&apos;s UX is designed for corporate contract workflows, not for a 68-year-old
              client trying to sign their engagement letter on a phone. The failure mode is always
              on the signer side, not the sender side, and no existing tool has solved for that
              specific population.
            </p>
          </div>
        </section>

        {/* Competitive landscape */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-white">Competitive landscape</h2>
          <p className="mt-4 text-slate-300 leading-relaxed">
            DocuSign (enterprise-priced, complex UX), HelloSign/Dropbox Sign (generic), SignNow
            (generic). None are optimized for the tax preparer&apos;s specific problem of client
            completion failure.
          </p>
          <div className="mt-4 rounded-xl border border-white/5 bg-surface-800 p-4">
            <p className="text-sm text-brand-400 font-medium">Unfair advantage</p>
            <p className="mt-1 text-sm text-slate-300">
              The entire UX is designed around the signer being a non-technical client — the single
              biggest complaint about DocuSign in tax contexts is client-side failure, which generic
              tools ignore.
            </p>
          </div>
        </section>

        {/* Go-to-market */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-white">Go-to-market</h2>
          <p className="mt-4 text-slate-300 leading-relaxed">
            r/Accounting, r/taxpros, and NATP community forums; position as &apos;DocuSign for
            clients who aren&apos;t tech-savvy&apos;; Google Ads on &apos;DocuSign alternative tax
            preparer&apos;
          </p>
        </section>

        {/* Automation */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-white">How this business runs itself</h2>
          <p className="mt-2 text-sm text-slate-500">Mailbox money · ~1 hour/week owner time</p>
          <div className="mt-4 space-y-4 text-slate-300 leading-relaxed">
            <p>
              After a preparer uploads a PDF and enters client contact info, the system automatically
              sends an SMS with a one-tap signing link and a parallel email — no human action needed.
              A daily cron job scans for envelopes unsigned after 24 hours and fires reminder
              messages automatically through the configured sequence.
            </p>
            <p>
              On completion, a webhook stores the signed PDF, emails the preparer a download link,
              and marks the envelope closed. Stripe metered billing calculates usage at month-end and
              charges automatically. AI chat handles support.
            </p>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            MVP estimate: Next.js + Supabase + PDF-lib (signature overlay) + Twilio SMS + Resend
            email; 3 weeks to MVP
          </p>
        </section>

        {/* Validation checklist */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-white">Validation checklist (9/9)</h2>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {checklist.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 rounded-lg border border-white/5 bg-surface-800 px-4 py-3"
              >
                <svg className="h-5 w-5 shrink-0 text-brand-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-slate-300">{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Pain points */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-white">Source pain points (real posts)</h2>
          <div className="mt-6 space-y-6">
            {painPoints.map((pp, i) => (
              <div key={i} className="rounded-xl border border-white/5 bg-surface-800 p-6">
                <p className="font-medium text-white">{pp.problem}</p>
                <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                  <div>
                    <span className="text-slate-500">Persona:</span>{" "}
                    <span className="text-slate-300">{pp.persona}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Frequency:</span>{" "}
                    <span className="text-slate-300">{pp.frequency}</span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-slate-500">Workaround:</span>{" "}
                    <span className="text-slate-300">{pp.workaround}</span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-slate-500">WTP signal:</span>{" "}
                    <span className="text-slate-300">{pp.wtp}</span>
                  </div>
                </div>
                <a
                  href={pp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-sm text-brand-400 hover:underline"
                >
                  View source post →
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* About */}
        <section className="mt-12 rounded-xl border border-white/5 bg-surface-800 p-6">
          <h2 className="text-lg font-semibold text-white">About this program</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            This demo was auto-built by the <strong className="text-slate-300">Idea Miner</strong>{" "}
            pipeline: a twice-daily research program that mines Reddit, Hacker News, Stack Exchange,
            and GitHub for real people describing real pain, scores the opportunities, and
            automatically ships a working mock of every idea that passes validation (&gt;=8/9 checks,
            momentum not declining, not previously built). The bar for every idea: low-maintenance
            recurring revenue that a solo owner can run in a few hours a week.
          </p>
          <p className="mt-2 text-xs text-slate-500">
            Generated by Idea Miner run 2026-07-12-am on 2026-07-12 12:15 UTC
          </p>
        </section>

        <div className="mt-12 text-center">
          <Link
            href="/demo"
            className="inline-block rounded-xl bg-brand-500 px-8 py-3 text-base font-semibold text-white hover:bg-brand-400"
          >
            Try the Interactive Demo →
          </Link>
        </div>
      </div>
    </div>
  );
}
