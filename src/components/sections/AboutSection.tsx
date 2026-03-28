"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";
import type { AboutMeDict, FounderEntry } from "@/types";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

function FounderCard({
  founder,
  githubButton,
  delay,
}: {
  founder: FounderEntry;
  githubButton: string;
  delay: number;
}) {
  return (
    <FadeInWhenVisible direction="up" delay={delay}>
      {/* Surface nesting — No-Line Rule */}
      <div className="h-full bg-surface-container-low p-1 rounded-xl">
        <div className="h-full bg-surface-container-lowest p-6 md:p-8 relative overflow-hidden border border-outline-variant/5">
          {/* Subtle dot pattern */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.02]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #fff 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />

          {/* Content — horizontal on desktop */}
          <div className="relative flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative shrink-0"
            >
              <img
                src={`https://github.com/${founder.githubUsername}.png`}
                alt={`${founder.firstName} ${founder.surname}`}
                width={96}
                height={96}
                className="w-24 h-24 rounded-full border-2 border-outline-variant/20 ring-2 ring-primary/20 object-cover"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-surface-container-lowest rounded-full border-2 border-outline-variant/20 flex items-center justify-center">
                <GitHubIcon className="w-3 h-3 text-zinc-400" />
              </div>
            </motion.div>

            {/* Text */}
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-headline font-bold uppercase tracking-tighter text-white">
                {founder.firstName}{" "}
                <span className="text-primary">{founder.surname}</span>
              </h2>

              <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
                <span
                  className="w-2 h-2 rounded-full bg-secondary"
                  style={{ animation: "status-pulse-lime 2s ease-in-out infinite" }}
                />
                <GitHubIcon className="w-3.5 h-3.5 text-zinc-500" />
                <span className="text-sm text-zinc-500">
                  @{founder.githubUsername}
                </span>
              </div>

              <p className="text-on-surface-variant text-sm leading-relaxed mt-4">
                {founder.bio}
              </p>

              <a
                href={`https://github.com/${founder.githubUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 px-4 py-2 bg-secondary text-on-secondary text-sm font-headline font-bold uppercase tracking-tighter hover:scale-105 transition-transform"
              >
                <GitHubIcon className="w-4 h-4" />
                {githubButton}
              </a>
            </div>
          </div>
        </div>
      </div>
    </FadeInWhenVisible>
  );
}

export default function AboutSection({ dict }: { dict: AboutMeDict }) {
  return (
    <section id="founders" className="py-24 md:py-32 px-8 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-primary/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section heading — centered */}
        <div className="mb-16 md:mb-20 text-center">
          <h2 className="font-headline text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mb-4">
            {dict.badge}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto" />
        </div>

        {/* Founders grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {dict.founders.map((founder, index) => (
            <FounderCard
              key={founder.githubUsername}
              founder={founder}
              githubButton={dict.githubButton}
              delay={index * 0.15}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
