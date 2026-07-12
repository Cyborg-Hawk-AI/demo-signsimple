"use client";

import { useState, useCallback } from "react";
import DevNote from "@/components/DevNote";
import Toast from "@/components/Toast";
import {
  ENVELOPES,
  AUDIT_TRAIL,
  ACTIVITY_FEED,
  BULK_CAMPAIGNS,
  MONTHLY_STATS,
  REMINDER_SEQUENCE,
  BULK_RECIPIENTS,
  PREPARER,
  formatDate,
  formatDateTime,
  statusColor,
  type Envelope,
  type EnvelopeStatus,
} from "@/lib/mockData";

type Tab = "dashboard" | "send" | "signing" | "bulk" | "reminders" | "audit" | "billing";

const TABS: { id: Tab; label: string }[] = [
  { id: "dashboard", label: "Dashboard" },
  { id: "send", label: "Send Envelope" },
  { id: "signing", label: "Client Signing" },
  { id: "bulk", label: "Bulk Send" },
  { id: "reminders", label: "Reminders" },
  { id: "audit", label: "Audit Trail" },
  { id: "billing", label: "Billing" },
];

export default function DemoApp() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [toast, setToast] = useState({ visible: false, message: "" });
  const [statusFilter, setStatusFilter] = useState<EnvelopeStatus | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEnvelope, setSelectedEnvelope] = useState<Envelope | null>(null);
  const [showModal, setShowModal] = useState<string | null>(null);

  const showToast = useCallback((message: string) => {
    setToast({ visible: true, message });
  }, []);

  const hideToast = useCallback(() => {
    setToast({ visible: false, message: "" });
  }, []);

  const filteredEnvelopes = ENVELOPES.filter((e) => {
    const matchesStatus = statusFilter === "all" || e.status === statusFilter;
    const matchesSearch =
      searchQuery === "" ||
      e.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.documentName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const signedCount = ENVELOPES.filter((e) => e.status === "signed").length;
  const pendingCount = ENVELOPES.filter((e) => e.status === "pending" || e.status === "reminded").length;
  const overageEnvelopes = Math.max(0, PREPARER.envelopesThisMonth - PREPARER.envelopeLimit);
  const overageCost = overageEnvelopes * 0.5;

  return (
    <div className="min-h-screen bg-surface-900">
      {/* Demo banner */}
      <div className="border-b border-blue-500/20 bg-blue-500/5 px-4 py-2 text-center text-sm text-blue-300">
        Interactive demo with mock data · Every control is functional ·{" "}
        <button
          onClick={() => showToast("This is a mock demo — no real data is sent or stored.")}
          className="underline hover:text-blue-200"
        >
          Learn more
        </button>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">{PREPARER.firm}</h1>
            <p className="text-sm text-slate-400">{PREPARER.name} · {PREPARER.plan}</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => { setActiveTab("send"); showToast("Opening new envelope wizard…"); }}
              className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-400"
            >
              + New Envelope
              <DevNote note="In production: opens upload wizard → stores PDF in Supabase Storage → creates envelope record → triggers Twilio SMS + Resend email in parallel via webhook." />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-1 overflow-x-auto rounded-xl border border-white/5 bg-surface-800 p-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); showToast(`Switched to ${tab.label}`); }}
              className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-brand-500 text-white"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === "dashboard" && (
          <DashboardView
            signedCount={signedCount}
            pendingCount={pendingCount}
            filteredEnvelopes={filteredEnvelopes}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setSelectedEnvelope={setSelectedEnvelope}
            showToast={showToast}
          />
        )}
        {activeTab === "send" && <SendEnvelopeView showToast={showToast} setActiveTab={setActiveTab} />}
        {activeTab === "signing" && <SigningFlowView showToast={showToast} />}
        {activeTab === "bulk" && <BulkSendView showToast={showToast} setShowModal={setShowModal} />}
        {activeTab === "reminders" && <RemindersView showToast={showToast} />}
        {activeTab === "audit" && <AuditTrailView showToast={showToast} />}
        {activeTab === "billing" && (
          <BillingView
            overageEnvelopes={overageEnvelopes}
            overageCost={overageCost}
            showToast={showToast}
          />
        )}
      </div>

      {/* Envelope detail modal */}
      {selectedEnvelope && (
        <Modal onClose={() => setSelectedEnvelope(null)} title="Envelope Details">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-slate-500">Client</span><p className="text-white">{selectedEnvelope.clientName}</p></div>
              <div><span className="text-slate-500">Company</span><p className="text-white">{selectedEnvelope.company}</p></div>
              <div><span className="text-slate-500">Email</span><p className="text-white">{selectedEnvelope.clientEmail}</p></div>
              <div><span className="text-slate-500">Phone</span><p className="text-white">{selectedEnvelope.clientPhone}</p></div>
              <div><span className="text-slate-500">Document</span><p className="text-white">{selectedEnvelope.documentName}</p></div>
              <div><span className="text-slate-500">Status</span><p><span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusColor(selectedEnvelope.status)}`}>{selectedEnvelope.status}</span></p></div>
              <div><span className="text-slate-500">Sent</span><p className="text-white">{formatDateTime(selectedEnvelope.sentAt)}</p></div>
              {selectedEnvelope.signedAt && <div><span className="text-slate-500">Signed</span><p className="text-white">{formatDateTime(selectedEnvelope.signedAt)}</p></div>}
              <div><span className="text-slate-500">Reminders</span><p className="text-white">{selectedEnvelope.remindersSent} sent</p></div>
            </div>
            <div className="flex gap-2 pt-2">
              <button onClick={() => { showToast(`Reminder sent to ${selectedEnvelope.clientName}`); }} className="rounded-lg bg-amber-500/20 px-3 py-1.5 text-xs font-medium text-amber-400 hover:bg-amber-500/30">Send Reminder Now</button>
              <button onClick={() => { showToast(`Download link emailed for ${selectedEnvelope.documentName}`); }} className="rounded-lg bg-brand-500/20 px-3 py-1.5 text-xs font-medium text-brand-400 hover:bg-brand-500/30">Download PDF</button>
              <button onClick={() => { setActiveTab("audit"); setSelectedEnvelope(null); showToast("Viewing audit trail for this envelope"); }} className="rounded-lg bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-white/10">View Audit Trail</button>
            </div>
          </div>
        </Modal>
      )}

      {/* Bulk campaign modal */}
      {showModal === "bulk-detail" && (
        <Modal onClose={() => setShowModal(null)} title={BULK_CAMPAIGNS[0].name}>
          <div className="max-h-64 overflow-y-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-white/5 text-left text-slate-500"><th className="pb-2">Client</th><th className="pb-2">Status</th></tr></thead>
              <tbody>
                {BULK_RECIPIENTS.map((r) => (
                  <tr key={r.email} className="border-b border-white/5">
                    <td className="py-2 text-white">{r.name}</td>
                    <td className="py-2"><span className={`rounded-full px-2 py-0.5 text-xs ${statusColor(r.status)}`}>{r.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Modal>
      )}

      <Toast message={toast.message} visible={toast.visible} onClose={hideToast} />
    </div>
  );
}

/* ─── Sub-components ─── */

function Modal({ children, onClose, title }: { children: React.ReactNode; onClose: () => void; title: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-surface-800 p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function DashboardView({
  signedCount, pendingCount, filteredEnvelopes, statusFilter, setStatusFilter,
  searchQuery, setSearchQuery, setSelectedEnvelope, showToast,
}: {
  signedCount: number; pendingCount: number; filteredEnvelopes: Envelope[];
  statusFilter: EnvelopeStatus | "all"; setStatusFilter: (s: EnvelopeStatus | "all") => void;
  searchQuery: string; setSearchQuery: (s: string) => void;
  setSelectedEnvelope: (e: Envelope | null) => void;
  showToast: (m: string) => void;
}) {
  const maxVal = Math.max(...MONTHLY_STATS.map((s) => s.envelopes));

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Envelopes This Month", value: PREPARER.envelopesThisMonth, sub: `of ${PREPARER.envelopeLimit} included` },
          { label: "Signed", value: signedCount, sub: `${Math.round((signedCount / ENVELOPES.length) * 100)}% completion` },
          { label: "Awaiting Signature", value: pendingCount, sub: "Auto-reminders active" },
          { label: "Overage Cost", value: `$${(Math.max(0, PREPARER.envelopesThisMonth - PREPARER.envelopeLimit) * 0.5).toFixed(2)}`, sub: `${Math.max(0, PREPARER.envelopesThisMonth - PREPARER.envelopeLimit)} envelopes over` },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-white/5 bg-surface-800 p-5">
            <p className="text-sm text-slate-400">{stat.label}</p>
            <p className="mt-1 text-3xl font-bold text-white">{stat.value}</p>
            <p className="mt-1 text-xs text-slate-500">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Chart */}
        <div className="rounded-xl border border-white/5 bg-surface-800 p-5 lg:col-span-2">
          <h3 className="mb-4 text-sm font-semibold text-white">Envelope Volume
            <DevNote note="Production: aggregated from envelope creation timestamps in Supabase. Powers Stripe metered billing at month-end." />
          </h3>
          <div className="flex h-48 items-end gap-3">
            {MONTHLY_STATS.map((s) => (
              <div key={s.month} className="flex flex-1 flex-col items-center gap-1">
                <div className="relative w-full">
                  <div className="w-full rounded-t bg-brand-500/80" style={{ height: `${(s.envelopes / maxVal) * 160}px` }} />
                  <div className="absolute bottom-0 w-full rounded-t bg-brand-300/40" style={{ height: `${(s.signed / maxVal) * 160}px` }} />
                </div>
                <span className="text-xs text-slate-500">{s.month}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-brand-500" /> Sent</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-brand-300/60" /> Signed</span>
          </div>
        </div>

        {/* Activity feed */}
        <div className="rounded-xl border border-white/5 bg-surface-800 p-5">
          <h3 className="mb-4 text-sm font-semibold text-white">Recent Activity</h3>
          <div className="space-y-3 max-h-48 overflow-y-auto">
            {ACTIVITY_FEED.map((a) => (
              <button
                key={a.id}
                onClick={() => showToast(a.message)}
                className="block w-full rounded-lg p-2 text-left text-xs transition-colors hover:bg-white/5"
              >
                <p className="text-slate-300">{a.message}</p>
                <p className="mt-0.5 text-slate-500">{formatDateTime(a.timestamp)}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Envelope table */}
      <div className="rounded-xl border border-white/5 bg-surface-800">
        <div className="flex flex-col gap-3 border-b border-white/5 p-4 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-sm font-semibold text-white">All Envelopes</h3>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search clients…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-lg border border-white/10 bg-surface-900 px-3 py-1.5 text-sm text-white placeholder:text-slate-500"
            />
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value as EnvelopeStatus | "all"); showToast(`Filtered by: ${e.target.value}`); }}
              className="rounded-lg border border-white/10 bg-surface-900 px-3 py-1.5 text-sm text-white"
            >
              <option value="all">All statuses</option>
              <option value="signed">Signed</option>
              <option value="pending">Pending</option>
              <option value="reminded">Reminded</option>
              <option value="expired">Expired</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5 text-left text-slate-500">
                <th className="px-4 py-3 font-medium">Client</th>
                <th className="px-4 py-3 font-medium">Document</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Sent</th>
                <th className="px-4 py-3 font-medium">Reminders</th>
                <th className="px-4 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {filteredEnvelopes.map((env) => (
                <tr key={env.id} className="border-b border-white/5 transition-colors hover:bg-white/[0.02]">
                  <td className="px-4 py-3">
                    <p className="font-medium text-white">{env.clientName}</p>
                    <p className="text-xs text-slate-500">{env.company}</p>
                  </td>
                  <td className="px-4 py-3 text-slate-300">{env.documentName}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${statusColor(env.status)}`}>{env.status}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-400">{formatDate(env.sentAt)}</td>
                  <td className="px-4 py-3 text-slate-400">{env.remindersSent}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setSelectedEnvelope(env)}
                      className="rounded-lg bg-white/5 px-3 py-1 text-xs text-slate-300 hover:bg-white/10"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function SendEnvelopeView({ showToast, setActiveTab }: { showToast: (m: string) => void; setActiveTab: (t: Tab) => void }) {
  const [step, setStep] = useState(1);
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [docName, setDocName] = useState("2025 Engagement Letter");

  const handleSend = () => {
    showToast(`Envelope sent to ${clientName || "client"} via SMS + email!`);
    setStep(4);
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8 flex items-center justify-center gap-2">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <button
              onClick={() => { if (s <= step || s === step + 1) setStep(s); }}
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                step >= s ? "bg-brand-500 text-white" : "bg-surface-700 text-slate-500"
              }`}
            >
              {s}
            </button>
            {s < 3 && <div className={`h-0.5 w-12 ${step > s ? "bg-brand-500" : "bg-surface-700"}`} />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="rounded-xl border border-white/5 bg-surface-800 p-6">
          <h3 className="text-lg font-semibold text-white">Upload Document
            <DevNote note="Production: PDF uploaded to Supabase Storage. PDF-lib places signature field coordinates. Max 25MB per file." />
          </h3>
          <div
            onClick={() => { showToast("PDF selected: 2025_Engagement_Letter_Template.pdf"); setStep(2); }}
            className="mt-4 flex cursor-pointer flex-col items-center rounded-xl border-2 border-dashed border-white/10 bg-surface-900 p-12 transition-colors hover:border-brand-500/30"
          >
            <svg className="h-12 w-12 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
            <p className="mt-3 text-sm text-slate-400">Click to upload PDF or drag & drop</p>
            <p className="mt-1 text-xs text-slate-600">Or use template: 2025 Engagement Letter</p>
          </div>
          <select
            value={docName}
            onChange={(e) => setDocName(e.target.value)}
            className="mt-4 w-full rounded-lg border border-white/10 bg-surface-900 px-3 py-2 text-sm text-white"
          >
            <option>2025 Engagement Letter</option>
            <option>Form 8879 Authorization</option>
            <option>S-Corp Election Consent</option>
            <option>Estate Tax Return Authorization</option>
          </select>
        </div>
      )}

      {step === 2 && (
        <div className="rounded-xl border border-white/5 bg-surface-800 p-6">
          <h3 className="text-lg font-semibold text-white">Client Information
            <DevNote note="Production: contact info stored in envelope record. Triggers parallel Twilio SMS (one-tap link) and Resend email delivery. No signer account created." />
          </h3>
          <div className="mt-4 space-y-4">
            <input type="text" placeholder="Client name" value={clientName} onChange={(e) => setClientName(e.target.value)} className="w-full rounded-lg border border-white/10 bg-surface-900 px-3 py-2.5 text-sm text-white placeholder:text-slate-500" />
            <input type="email" placeholder="Email address" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} className="w-full rounded-lg border border-white/10 bg-surface-900 px-3 py-2.5 text-sm text-white placeholder:text-slate-500" />
            <input type="tel" placeholder="Mobile phone (for SMS)" value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} className="w-full rounded-lg border border-white/10 bg-surface-900 px-3 py-2.5 text-sm text-white placeholder:text-slate-500" />
          </div>
          <div className="mt-6 flex justify-between">
            <button onClick={() => setStep(1)} className="rounded-lg px-4 py-2 text-sm text-slate-400 hover:text-white">Back</button>
            <button onClick={() => setStep(3)} className="rounded-lg bg-brand-500 px-6 py-2 text-sm font-semibold text-white hover:bg-brand-400">Continue</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="rounded-xl border border-white/5 bg-surface-800 p-6">
          <h3 className="text-lg font-semibold text-white">Review & Send</h3>
          <div className="mt-4 space-y-3 rounded-lg bg-surface-900 p-4 text-sm">
            <div className="flex justify-between"><span className="text-slate-500">Document</span><span className="text-white">{docName}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Client</span><span className="text-white">{clientName || "James O'Brien"}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Email</span><span className="text-white">{clientEmail || "jobrien@gmail.com"}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">SMS</span><span className="text-white">{clientPhone || "(206) 555-0287"}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Delivery</span><span className="text-brand-400">SMS + Email (parallel)</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Reminders</span><span className="text-white">24hr → 72hr → 7-day</span></div>
          </div>
          <div className="mt-6 flex justify-between">
            <button onClick={() => setStep(2)} className="rounded-lg px-4 py-2 text-sm text-slate-400 hover:text-white">Back</button>
            <button onClick={handleSend} className="rounded-lg bg-brand-500 px-6 py-2 text-sm font-semibold text-white hover:bg-brand-400">
              Send Envelope
              <DevNote note="Production: creates envelope → generates unique signing URL → Twilio sends SMS with one-tap link → Resend sends branded email → cron job schedules reminders." />
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="rounded-xl border border-brand-500/20 bg-brand-500/5 p-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-500/20">
            <svg className="h-8 w-8 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          </div>
          <h3 className="mt-4 text-xl font-semibold text-white">Envelope Sent!</h3>
          <p className="mt-2 text-sm text-slate-400">SMS and email delivered. Reminders will fire automatically if unsigned.</p>
          <div className="mt-6 flex justify-center gap-3">
            <button onClick={() => { setStep(1); setClientName(""); setClientEmail(""); setClientPhone(""); }} className="rounded-lg bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/15">Send Another</button>
            <button onClick={() => setActiveTab("dashboard")} className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-400">View Dashboard</button>
          </div>
        </div>
      )}
    </div>
  );
}

function SigningFlowView({ showToast }: { showToast: (m: string) => void }) {
  const [signStep, setSignStep] = useState(0);
  const [signature, setSignature] = useState("");

  const steps = ["Welcome", "Review Document", "Sign", "Done"];

  return (
    <div className="mx-auto max-w-sm">
      <p className="mb-4 text-center text-sm text-slate-400">
        Mobile signing preview — what your client sees
        <DevNote note="Production: unique URL with no login. Large touch targets, plain language, works on any phone browser. Signature captured via canvas → overlaid on PDF via PDF-lib." />
      </p>

      {/* Phone frame */}
      <div className="mx-auto rounded-[2rem] border-4 border-slate-700 bg-surface-800 p-2 shadow-2xl">
        <div className="rounded-[1.5rem] bg-white p-6 text-slate-900" style={{ minHeight: 520 }}>
          {signStep === 0 && (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-500">
                <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
              </div>
              <h2 className="text-xl font-bold">Hi James!</h2>
              <p className="mt-2 text-sm text-slate-600">Sarah Chen needs your signature on one document. It only takes a minute.</p>
              <button
                onClick={() => setSignStep(1)}
                className="mt-8 w-full rounded-2xl bg-brand-500 py-4 text-lg font-bold text-white"
              >
                Let&apos;s Get Started
              </button>
              <p className="mt-4 text-xs text-slate-400">No account needed · Secure · From Chen & Associates</p>
            </div>
          )}

          {signStep === 1 && (
            <div>
              <h2 className="text-lg font-bold">Review Your Document</h2>
              <p className="mt-1 text-sm text-slate-600">Form 8879 Authorization</p>
              <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4 text-xs leading-relaxed text-slate-700">
                <p className="font-semibold">IRS e-file Signature Authorization</p>
                <p className="mt-2">Taxpayer: James O&apos;Brien</p>
                <p>Tax Year: 2025</p>
                <p className="mt-2">I authorize Chen & Associates Tax Services to file my 2025 federal tax return electronically...</p>
                <p className="mt-4 text-slate-400">[Document preview — scroll to read full text]</p>
              </div>
              <button onClick={() => setSignStep(2)} className="mt-6 w-full rounded-2xl bg-brand-500 py-4 text-lg font-bold text-white">
                I&apos;ve Read It — Sign Now
              </button>
            </div>
          )}

          {signStep === 2 && (
            <div>
              <h2 className="text-lg font-bold">Sign Here</h2>
              <p className="mt-1 text-sm text-slate-600">Draw your signature below</p>
              <div
                onClick={() => setSignature("James O'Brien")}
                className="mt-4 flex h-32 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50"
              >
                {signature ? (
                  <span className="font-['cursive'] text-3xl text-slate-800">{signature}</span>
                ) : (
                  <span className="text-sm text-slate-400">Tap to sign</span>
                )}
              </div>
              <button
                onClick={() => { if (signature) { setSignStep(3); showToast("Signature captured with IP, timestamp, and device info"); } else showToast("Please tap to sign first"); }}
                className="mt-6 w-full rounded-2xl bg-brand-500 py-4 text-lg font-bold text-white"
              >
                Submit Signature
              </button>
              <button onClick={() => setSignStep(1)} className="mt-2 w-full py-2 text-sm text-slate-500">Go back</button>
            </div>
          )}

          {signStep === 3 && (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              </div>
              <h2 className="mt-4 text-xl font-bold">You&apos;re All Done!</h2>
              <p className="mt-2 text-sm text-slate-600">Your signature has been submitted. Sarah will receive a copy.</p>
              <p className="mt-4 text-xs text-slate-400">Signed Jan 11, 2026 at 2:15 PM</p>
              <button onClick={() => { setSignStep(0); setSignature(""); }} className="mt-6 text-sm text-brand-600 underline">Restart demo</button>
            </div>
          )}
        </div>
      </div>

      {/* Step indicator */}
      <div className="mt-4 flex justify-center gap-2">
        {steps.map((s, i) => (
          <button
            key={s}
            onClick={() => { if (i <= signStep) setSignStep(i); }}
            className={`rounded-full px-3 py-1 text-xs ${i === signStep ? "bg-brand-500 text-white" : "bg-surface-700 text-slate-400"}`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

function BulkSendView({ showToast, setShowModal }: { showToast: (m: string) => void; setShowModal: (s: string | null) => void }) {
  const [selectedTemplate, setSelectedTemplate] = useState("engagement");
  const campaign = BULK_CAMPAIGNS[0];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/5 bg-surface-800 p-6">
        <h3 className="text-lg font-semibold text-white">Bulk Send — Tax Season
          <DevNote note="Production: upload one PDF template with merge fields → map to client CSV → batch creates envelopes → parallel SMS/email to all recipients. Typical use: 40-80 engagement letters at season start." />
        </h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm text-slate-400">Template</label>
            <select
              value={selectedTemplate}
              onChange={(e) => { setSelectedTemplate(e.target.value); showToast(`Template: ${e.target.value}`); }}
              className="mt-1 w-full rounded-lg border border-white/10 bg-surface-900 px-3 py-2 text-sm text-white"
            >
              <option value="engagement">2025 Engagement Letter</option>
              <option value="8879">Form 8879 Batch</option>
              <option value="consent">S-Corp Election Consent</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-slate-400">Client List</label>
            <button
              onClick={() => showToast("Imported 47 clients from QuickBooks Online CSV")}
              className="mt-1 w-full rounded-lg border border-dashed border-white/10 bg-surface-900 px-3 py-2 text-sm text-slate-400 hover:border-brand-500/30"
            >
              Import from CSV or QuickBooks
            </button>
          </div>
        </div>
        <button
          onClick={() => showToast("Bulk campaign queued — 47 envelopes sending now")}
          className="mt-4 rounded-lg bg-brand-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-400"
        >
          Send to All 47 Clients
        </button>
      </div>

      {/* Active campaigns */}
      <div className="rounded-xl border border-white/5 bg-surface-800">
        <div className="border-b border-white/5 p-4">
          <h3 className="text-sm font-semibold text-white">Campaign History</h3>
        </div>
        {BULK_CAMPAIGNS.map((c) => (
          <div key={c.id} className="border-b border-white/5 p-4 last:border-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-white">{c.name}</p>
                <p className="text-xs text-slate-500">Created {formatDate(c.createdAt)} · {c.totalRecipients} recipients</p>
              </div>
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${c.status === "active" ? "text-brand-400 bg-brand-400/10" : "text-slate-400 bg-slate-400/10"}`}>{c.status}</span>
            </div>
            <div className="mt-3 flex gap-4 text-xs">
              <span className="text-brand-400">{c.signed} signed</span>
              <span className="text-amber-400">{c.pending} pending</span>
              <span className="text-orange-400">{c.reminded} reminded</span>
              <span className="text-red-400">{c.expired} expired</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface-700">
              <div className="flex h-full">
                <div className="bg-brand-500" style={{ width: `${(c.signed / c.totalRecipients) * 100}%` }} />
                <div className="bg-amber-500" style={{ width: `${(c.pending / c.totalRecipients) * 100}%` }} />
                <div className="bg-orange-500" style={{ width: `${(c.reminded / c.totalRecipients) * 100}%` }} />
              </div>
            </div>
            <button
              onClick={() => setShowModal("bulk-detail")}
              className="mt-3 text-xs text-brand-400 hover:underline"
            >
              View all recipients →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function RemindersView({ showToast }: { showToast: (m: string) => void }) {
  const [remindersEnabled, setRemindersEnabled] = useState(true);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/5 bg-surface-800 p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Automatic Reminder Sequence
            <DevNote note="Production: Vercel cron job runs daily at 8am UTC. Queries unsigned envelopes, checks elapsed time, fires Twilio SMS + Resend email at 24hr, 72hr, 7-day marks. Envelope expires after day 7." />
          </h3>
          <button
            onClick={() => { setRemindersEnabled(!remindersEnabled); showToast(remindersEnabled ? "Reminders paused" : "Reminders enabled"); }}
            className={`relative h-6 w-11 rounded-full transition-colors ${remindersEnabled ? "bg-brand-500" : "bg-surface-600"}`}
          >
            <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${remindersEnabled ? "left-5" : "left-0.5"}`} />
          </button>
        </div>

        <div className="mt-6 space-y-4">
          {REMINDER_SEQUENCE.map((r, i) => (
            <div key={r.day} className="flex items-center gap-4 rounded-lg border border-white/5 bg-surface-900 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-500/20 text-sm font-bold text-brand-400">
                {i + 1}
              </div>
              <div className="flex-1">
                <p className="font-medium text-white">{r.label} after send</p>
                <p className="text-xs text-slate-500">{r.channel} · Template: {r.template}</p>
              </div>
              <button
                onClick={() => showToast(`Preview: "${r.template}" reminder template`)}
                className="rounded-lg bg-white/5 px-3 py-1.5 text-xs text-slate-300 hover:bg-white/10"
              >
                Preview
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Pending reminders */}
      <div className="rounded-xl border border-white/5 bg-surface-800">
        <div className="border-b border-white/5 p-4">
          <h3 className="text-sm font-semibold text-white">Upcoming Reminders</h3>
        </div>
        {ENVELOPES.filter((e) => e.nextReminder).map((e) => (
          <div key={e.id} className="flex items-center justify-between border-b border-white/5 p-4 last:border-0">
            <div>
              <p className="text-sm text-white">{e.clientName}</p>
              <p className="text-xs text-slate-500">{e.documentName} · Reminder #{e.remindersSent + 1}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-amber-400">{e.nextReminder ? formatDateTime(e.nextReminder) : "—"}</p>
              <button
                onClick={() => showToast(`Manual reminder sent to ${e.clientName}`)}
                className="mt-1 text-xs text-brand-400 hover:underline"
              >
                Send now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AuditTrailView({ showToast }: { showToast: (m: string) => void }) {
  const [filterEnvelope, setFilterEnvelope] = useState("all");

  const filtered = filterEnvelope === "all"
    ? AUDIT_TRAIL
    : AUDIT_TRAIL.filter((a) => a.envelopeId === filterEnvelope);

  return (
    <div className="rounded-xl border border-white/5 bg-surface-800">
      <div className="flex flex-col gap-3 border-b border-white/5 p-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-sm font-semibold text-white">Audit Trail
          <DevNote note="Production: every event (send, open, sign, reminder) logged with IP (from request headers), User-Agent parsed to device, geolocation via IP lookup. Immutable append-only log in Supabase." />
        </h3>
        <select
          value={filterEnvelope}
          onChange={(e) => { setFilterEnvelope(e.target.value); showToast(`Filtered audit trail`); }}
          className="rounded-lg border border-white/10 bg-surface-900 px-3 py-1.5 text-sm text-white"
        >
          <option value="all">All envelopes</option>
          {ENVELOPES.map((e) => (
            <option key={e.id} value={e.id}>{e.clientName}</option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5 text-left text-slate-500">
              <th className="px-4 py-3 font-medium">Action</th>
              <th className="px-4 py-3 font-medium">Timestamp</th>
              <th className="px-4 py-3 font-medium">IP Address</th>
              <th className="px-4 py-3 font-medium">Device</th>
              <th className="px-4 py-3 font-medium">Location</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a) => (
              <tr key={a.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                <td className="px-4 py-3 text-white">{a.action}</td>
                <td className="px-4 py-3 text-slate-400">{formatDateTime(a.timestamp)}</td>
                <td className="px-4 py-3 font-mono text-xs text-slate-400">{a.ip}</td>
                <td className="px-4 py-3 text-slate-400">{a.device}</td>
                <td className="px-4 py-3 text-slate-400">{a.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="border-t border-white/5 p-4">
        <button
          onClick={() => showToast("Audit trail exported as PDF certificate")}
          className="rounded-lg bg-white/5 px-4 py-2 text-sm text-slate-300 hover:bg-white/10"
        >
          Export Audit Certificate (PDF)
        </button>
      </div>
    </div>
  );
}

function BillingView({ overageEnvelopes, overageCost, showToast }: { overageEnvelopes: number; overageCost: number; showToast: (m: string) => void }) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-white/5 bg-surface-800 p-5">
          <p className="text-sm text-slate-400">Base Plan</p>
          <p className="mt-1 text-2xl font-bold text-white">${billingCycle === "monthly" ? "19" : "15"}/mo</p>
          <p className="text-xs text-slate-500">{billingCycle === "monthly" ? "Monthly billing" : "Annual ($180/yr)"}</p>
        </div>
        <div className="rounded-xl border border-white/5 bg-surface-800 p-5">
          <p className="text-sm text-slate-400">Envelopes Used</p>
          <p className="mt-1 text-2xl font-bold text-white">{PREPARER.envelopesThisMonth} / {PREPARER.envelopeLimit}</p>
          <p className="text-xs text-slate-500">{overageEnvelopes} over limit</p>
        </div>
        <div className="rounded-xl border border-white/5 bg-surface-800 p-5">
          <p className="text-sm text-slate-400">Estimated This Month</p>
          <p className="mt-1 text-2xl font-bold text-white">${(19 + overageCost).toFixed(2)}</p>
          <p className="text-xs text-slate-500">$19 base + ${overageCost.toFixed(2)} overage</p>
        </div>
      </div>

      <div className="rounded-xl border border-white/5 bg-surface-800 p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Billing Settings
            <DevNote note="Production: Stripe metered billing with usage records reported per envelope. Monthly subscription floor at $19. Overage at $0.50/envelope auto-charged at month-end. Annual plan via Stripe price ID." />
          </h3>
          <div className="flex rounded-lg border border-white/10 p-0.5">
            <button onClick={() => { setBillingCycle("monthly"); showToast("Monthly plan selected"); }} className={`rounded-md px-3 py-1 text-xs font-medium ${billingCycle === "monthly" ? "bg-brand-500 text-white" : "text-slate-400"}`}>Monthly</button>
            <button onClick={() => { setBillingCycle("annual"); showToast("Annual plan selected — save 21%"); }} className={`rounded-md px-3 py-1 text-xs font-medium ${billingCycle === "annual" ? "bg-brand-500 text-white" : "text-slate-400"}`}>Annual</button>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {[
            { date: "Jan 2026 (current)", amount: `$${(19 + overageCost).toFixed(2)}`, status: "Pending" },
            { date: "Dec 2025", amount: "$23.00", status: "Paid" },
            { date: "Nov 2025", amount: "$20.00", status: "Paid" },
            { date: "Oct 2025", amount: "$19.00", status: "Paid" },
          ].map((inv) => (
            <div key={inv.date} className="flex items-center justify-between rounded-lg bg-surface-900 p-3">
              <div>
                <p className="text-sm text-white">{inv.date}</p>
                <p className="text-xs text-slate-500">{inv.status}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-white">{inv.amount}</span>
                <button onClick={() => showToast(`Invoice for ${inv.date} downloaded`)} className="text-xs text-brand-400 hover:underline">Download</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
