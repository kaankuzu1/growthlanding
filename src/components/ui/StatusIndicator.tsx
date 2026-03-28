"use client";

import { Activity } from "lucide-react";

interface StatusIndicatorProps {
  dict: {
    statusLabel: string;
    trendingLabel: string;
  };
}

export default function StatusIndicator({ dict }: StatusIndicatorProps) {
  return (
    <div
      className="fixed right-6 top-24 z-40 rounded-full bg-zinc-950/80 backdrop-blur-lg border border-secondary/20 shadow-[0_0_20px_rgba(195,244,0,0.3)] hidden md:flex flex-row items-center gap-2 px-4 py-2"
      style={{ animation: "status-pulse-lime 3s ease-in-out infinite" }}
    >
      <Activity className="w-4 h-4 text-secondary" />
      <div className="flex flex-col">
        <span className="font-headline text-[11px] font-bold uppercase tracking-widest text-white leading-tight">
          {dict.statusLabel}
        </span>
        <span className="font-headline text-[9px] uppercase tracking-widest text-secondary/70 leading-tight">
          {dict.trendingLabel}
        </span>
      </div>
    </div>
  );
}
