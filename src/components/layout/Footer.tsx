import { Twitter, Instagram } from "lucide-react";
import type { FooterDict } from "@/types";

export default function Footer({ dict, locale }: { dict: FooterDict; locale: string }) {
  return (
    <footer className="w-full py-12 px-8 bg-surface">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <div className="text-lg font-bold text-white mb-6 uppercase font-headline tracking-tighter">
            Audience Labs
          </div>
          <p className="text-sm text-zinc-500 max-w-[200px]">
            {dict.copyright}
          </p>
        </div>

        {/* Network */}
        <div className="flex flex-col gap-4">
          <h5 className="text-white font-headline text-xs uppercase tracking-widest font-bold">
            Network
          </h5>
          <a href="#" className="text-sm text-zinc-500 hover:text-secondary transition-colors">
            Twitter
          </a>
          <a href="#" className="text-sm text-zinc-500 hover:text-secondary transition-colors">
            Twitch
          </a>
          <a href="#" className="text-sm text-zinc-500 hover:text-secondary transition-colors">
            Instagram
          </a>
          <a href="#" className="text-sm text-zinc-500 hover:text-secondary transition-colors">
            Discord
          </a>
        </div>

        {/* Legal */}
        <div className="flex flex-col gap-4">
          <h5 className="text-white font-headline text-xs uppercase tracking-widest font-bold">
            Legal
          </h5>
          <a href={`/${locale}/privacy`} className="text-sm text-zinc-500 hover:text-secondary transition-colors">
            Privacy
          </a>
          <a href={`/${locale}/terms`} className="text-sm text-zinc-500 hover:text-secondary transition-colors">
            Terms
          </a>
        </div>

        {/* Status */}
        <div className="flex flex-col gap-4">
          <h5 className="text-white font-headline text-xs uppercase tracking-widest font-bold">
            Status
          </h5>
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full bg-secondary"
              style={{ animation: "status-pulse-lime 2s ease-in-out infinite" }}
            />
            <span className="text-sm text-secondary font-bold">
              All Systems Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
