"use client";

import { useState } from "react";

interface DevNoteProps {
  note: string;
}

export default function DevNote({ note }: DevNoteProps) {
  const [open, setOpen] = useState(false);

  return (
    <span className="relative inline-flex align-middle">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-blue-500/20 text-[10px] font-bold text-blue-400 transition-colors hover:bg-blue-500/30"
        aria-label="Developer note"
      >
        i
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-6 z-50 w-72 rounded-lg border border-blue-500/30 bg-surface-800 p-3 text-left shadow-xl">
            <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-blue-400">
              DEV NOTE
            </div>
            <p className="text-xs leading-relaxed text-slate-300">{note}</p>
          </div>
        </>
      )}
    </span>
  );
}
