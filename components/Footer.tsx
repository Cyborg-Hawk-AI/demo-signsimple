import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-surface-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500">
                <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <span className="font-semibold text-white">SignSimple</span>
            </div>
            <p className="mt-3 text-sm text-slate-400">
              Frictionless e-signature for tax preparers whose clients can&apos;t figure out DocuSign.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Product</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/demo" className="text-sm text-slate-400 transition-colors hover:text-brand-400">
                  Live Demo
                </Link>
              </li>
              <li>
                <Link href="/developers" className="text-sm text-slate-400 transition-colors hover:text-brand-400">
                  Developer Docs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Research</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/research" className="text-sm text-slate-400 transition-colors hover:text-brand-400">
                  How we found this idea
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/5 pt-6 text-center text-xs text-slate-500">
          Demo built by Idea Miner · Mock data only · No real signatures collected
        </div>
      </div>
    </footer>
  );
}
