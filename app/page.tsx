import Link from "next/link";

const features = [
  {
    title: "One-Tap Sign Links",
    description:
      "Send via SMS and email simultaneously. Clients tap once — no account, no app download, no password.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    ),
  },
  {
    title: "Built for Non-Tech Clients",
    description:
      "Large buttons, plain language, mobile-first. Designed for the 68-year-old signing on their phone.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    title: "Full Audit Trail",
    description:
      "IP address, timestamp, and device fingerprint stored for every signature event. IRS-ready compliance.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: "Bulk Send",
    description:
      "Upload one engagement letter template, send to your entire client list at tax season start. One click.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
      </svg>
    ),
  },
  {
    title: "Auto Reminders",
    description:
      "24hr, 72hr, and 7-day reminder sequence fires automatically until signed or expired. Zero manual follow-up.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
      </svg>
    ),
  },
  {
    title: "Runs Itself",
    description:
      "Stripe metered billing, AI support chat, automated delivery and archiving. Under 1 hour/week to operate.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-500/5 via-transparent to-transparent" />
        <div className="absolute -top-40 right-0 h-80 w-80 rounded-full bg-brand-500/10 blur-3xl" />
        <div className="absolute -bottom-20 left-0 h-60 w-60 rounded-full bg-blue-500/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-500/10 px-4 py-1.5 text-sm text-brand-400">
              <span className="h-2 w-2 rounded-full bg-brand-400 animate-pulse" />
              Built for tax preparers, not enterprise legal teams
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl text-balance">
              Your clients can&apos;t figure out DocuSign.{" "}
              <span className="text-brand-400">SignSimple fixes that.</span>
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-400 text-balance">
              Frictionless e-signature with one-tap SMS links, mobile-first signing for
              non-technical clients, and automatic reminders — so you stop chasing signatures
              every tax season.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/demo"
                className="w-full rounded-xl bg-brand-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-500/25 transition-all hover:bg-brand-400 hover:shadow-brand-500/40 sm:w-auto"
              >
                Try the Interactive Demo
              </Link>
              <Link
                href="/research"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
              >
                See the Research
              </Link>
            </div>

            <p className="mt-6 text-sm text-slate-500">
              No signup required · Validated 9/9 · ~1 hr/week to operate
            </p>
          </div>
        </div>
      </section>

      {/* Social proof bar */}
      <section className="border-y border-white/5 bg-surface-800/50">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-12 gap-y-4 px-4 py-8 sm:px-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">94%</div>
            <div className="text-xs text-slate-500">Client completion rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">&lt;2 min</div>
            <div className="text-xs text-slate-500">Avg. time to sign</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">$19/mo</div>
            <div className="text-xs text-slate-500">Starting price</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">0</div>
            <div className="text-xs text-slate-500">Client accounts needed</div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">Everything tax preparers need</h2>
            <p className="mt-4 text-slate-400">
              Purpose-built for the signer-side failure that DocuSign ignores.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-white/5 bg-surface-800/50 p-6 transition-colors hover:border-brand-500/20 hover:bg-surface-800"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10 text-brand-400 transition-colors group-hover:bg-brand-500/20">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="border-t border-white/5 bg-surface-800/30 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">Simple, usage-based pricing</h2>
            <p className="mt-4 text-slate-400">Pay for what you send. No per-seat fees.</p>
          </div>

          <div className="mx-auto mt-16 grid max-w-4xl gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-surface-800 p-8">
              <h3 className="text-lg font-semibold text-white">Monthly</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-5xl font-bold text-white">$19</span>
                <span className="text-slate-400">/month</span>
              </div>
              <p className="mt-2 text-sm text-slate-400">Up to 20 envelopes included</p>
              <ul className="mt-6 space-y-3 text-sm text-slate-300">
                <li className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-brand-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  $0.50 per envelope over limit
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-brand-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  SMS + email delivery
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-brand-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Auto reminders included
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-brand-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Full audit trail
                </li>
              </ul>
              <Link
                href="/demo"
                className="mt-8 block w-full rounded-xl bg-white/10 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-white/15"
              >
                Start with Demo
              </Link>
            </div>

            <div className="relative rounded-2xl border border-brand-500/30 bg-surface-800 p-8">
              <div className="absolute -top-3 right-6 rounded-full bg-brand-500 px-3 py-1 text-xs font-semibold text-white">
                Save 21%
              </div>
              <h3 className="text-lg font-semibold text-white">Annual</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-5xl font-bold text-white">$180</span>
                <span className="text-slate-400">/year</span>
              </div>
              <p className="mt-2 text-sm text-slate-400">Same 20 envelopes/month + overage</p>
              <ul className="mt-6 space-y-3 text-sm text-slate-300">
                <li className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-brand-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Everything in Monthly
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-brand-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Priority support
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-brand-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Bulk send campaigns
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-brand-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Custom branding
                </li>
              </ul>
              <Link
                href="/demo"
                className="mt-8 block w-full rounded-xl bg-brand-500 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-brand-400"
              >
                Start with Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-brand-500/20 bg-gradient-to-br from-brand-500/10 via-surface-800 to-surface-800 px-8 py-16 text-center sm:px-16">
            <h2 className="text-3xl font-bold text-white">
              Stop chasing signatures. Start the demo.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-400">
              See how SignSimple handles bulk sends, auto-reminders, client signing, and audit
              trails — all in one interactive dashboard.
            </p>
            <Link
              href="/demo"
              className="mt-8 inline-block rounded-xl bg-brand-500 px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-brand-400"
            >
              Open Live Demo →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
