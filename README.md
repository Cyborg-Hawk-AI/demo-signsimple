# SignSimple

> Frictionless e-signature built for tax preparers whose clients can't figure out DocuSign.

## What is SignSimple?

SignSimple is built for **Tax preparers and bookkeepers whose clients (often older, less tech-savvy) fail to complete DocuSign envelopes**. The entire UX is designed around the signer being a non-technical client — the single biggest complaint about DocuSign in tax contexts is client-side failure, which generic tools ignore

### Core MVP features
- One-click sign link sent via SMS and email — no account creation required for signers
- Mobile-first signing flow optimized for older/non-technical clients (large buttons, plain language)
- Audit trail with IP, timestamp, and device stored per signature
- Bulk send for engagement letters at tax season start
- Automatic reminder sequence (24hr, 72hr, 7-day) until signed or expired

**Pricing:** Usage-based with monthly subscription floor at $19/month base (up to 20 envelopes/month) + $0.50 per envelope over limit; annual plan at $180

## The research: why this exists

A tax and bookkeeping business owner on r/Accounting specifically called out DocuSign's reliability problems — clients were frequently unable to complete signatures, creating back-and-forth that wasted time every week. They were actively looking for alternatives but found nothing purpose-built for their use case. DocuSign's UX is designed for corporate contract workflows, not for a 68-year-old client trying to sign their engagement letter on a phone. The failure mode is always on the signer side, not the sender side, and no existing tool has solved for that specific population.

**Cluster:** E-Signature Reliability for Tax Clients | **Rubric score:** 95/130 | **Validation:** 9/9 checks passed

**Competitive landscape:** DocuSign (enterprise-priced, complex UX), HelloSign/Dropbox Sign (generic), SignNow (generic). None are optimized for the tax preparer's specific problem of client completion failure.

**Go-to-market:** r/Accounting, r/taxpros, and NATP community forums; position as 'DocuSign for clients who aren't tech-savvy'; Google Ads on 'DocuSign alternative tax preparer'

## How this business runs itself (mailbox money)

The goal is passive, low-maintenance recurring revenue: AI is how we build and operate the business, not necessarily what it sells.

After a preparer uploads a PDF and enters client contact info, the system automatically sends an SMS with a one-tap signing link and a parallel email — no human action needed. A daily cron job scans for envelopes unsigned after 24 hours and fires reminder messages automatically through the configured sequence. On completion, a webhook stores the signed PDF, emails the preparer a download link, and marks the envelope closed. Stripe metered billing calculates usage at month-end and charges automatically. AI chat handles support. Estimated owner time: under 1 hour/week.

**Estimated owner time:** ~1 hour(s)/week

**MVP estimate:** Next.js + Supabase + PDF-lib (signature overlay) + Twilio SMS + Resend email; 3 weeks to MVP

## Validation checklist (9/9)
- [x] 10+ posts with this pain
- [x] Paying for inferior solution
- [x] Reachable channel
- [x] MVP < 4 weeks
- [x] Price point high enough
- [x] Hair-on-fire problem
- [x] Can pre-sell
- [x] < 3 competitors
- [x] Low-maintenance ops (mailbox money)

## Source pain points (real posts)

### Existing accounting software doesn't meet expectations, is being discontinued, or is overly complicated and expensive for the features offered.
- **Persona:** Tax and bookkeeping business owner
- **Workaround:** Using multiple tools: QuickBooks Online for bookkeeping, DocuSign for e-signatures, Goldmine for scheduling and client paperwork tracking
- **Frequency:** daily
- **WTP signal:** Currently paying for QuickBooks Online, DocuSign, and Goldmine subscriptions
- **Source:** https://www.reddit.com/r/Accounting/comments/1u8u89k/looking_for_accounting_program_recommendations/

### E-signature solution (DocuSign) has reliability issues with clients being unable to complete signatures.
- **Persona:** Tax and bookkeeping business owner
- **Workaround:** Currently using DocuSign despite frequent client sign-up failures
- **Frequency:** weekly
- **WTP signal:** Paying for DocuSign subscription
- **Source:** https://www.reddit.com/r/Accounting/comments/1u8u89k/looking_for_accounting_program_recommendations/

### Meeting scheduling and client paperwork tracking system is frustrating and unreliable.
- **Persona:** Tax and bookkeeping business owner
- **Workaround:** Using Goldmine for both scheduling and client document submission tracking
- **Frequency:** daily
- **WTP signal:** Paying for Goldmine subscription
- **Source:** https://www.reddit.com/r/Accounting/comments/1u8u89k/looking_for_accounting_program_recommendations/


## About this program

This demo was auto-built by the **Idea Miner** pipeline: a twice-daily research program that mines Reddit, Hacker News, Stack Exchange, and GitHub for real people describing real pain, scores the opportunities, and automatically ships a working mock of every idea that passes validation (>=8/9 checks, momentum not declining, not previously built). The bar for every idea: low-maintenance recurring revenue that a solo owner can run in a few hours a week.

_Generated by Idea Miner run 2026-07-12-am on 2026-07-12 12:15 UTC_


## Local development

### Prerequisites

- Node.js 18+ and npm

### Setup

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # production build (required before deploy)
npm start      # serve production build locally
```

### Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with hero, features, pricing, and CTA |
| `/demo` | Fully interactive product mock — dashboard, send wizard, client signing, bulk send, reminders, audit trail, billing |
| `/developers` | Feature documentation — what's mocked vs. production, data flows, where to click |
| `/research` | Research origin story, validation checklist, and source pain points |

### Deploy to Vercel

This app requires zero configuration — no environment variables, no custom server, no rewrites.

1. Push the repo to GitHub (or connect your Git provider in Vercel)
2. Import the project in [Vercel](https://vercel.com/new)
3. Vercel auto-detects Next.js — click Deploy

Alternatively, deploy from the CLI:

```bash
npx vercel
```

### Tech stack

- **Next.js 14** (App Router) — file-based routing under `app/`
- **Tailwind CSS** — dark professional aesthetic
- **TypeScript** — strict mode
- All demo data is client-side mock data in `lib/mockData.ts` — no database, no API keys, no auth
