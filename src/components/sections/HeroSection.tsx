"use client";

import { motion } from "framer-motion";
import { Play, Twitch, Activity } from "lucide-react";
import { CALENDLY_URL } from "@/lib/constants";
import type { HeroDict } from "@/types";

/* ------------------------------------------------------------------ */
/*  HeroSection                                                        */
/* ------------------------------------------------------------------ */

export default function HeroSection({
  dict,
  locale,
}: {
  dict: HeroDict;
  locale: string;
}) {
  const headingLine1: string = dict.headingLine1 ?? "Your Stream,";
  const headingAccent: string = dict.headingAccent ?? "Everywhere.";
  const description: string = dict.description ?? "";
  const ctaPrimary: string = dict.ctaPrimary ?? "Book a Free Call";
  const ctaSecondary: string = dict.ctaSecondary ?? "Explore Network";
  const statValue: string = dict.statValue ?? "2.4M+";
  const statLabel: string = dict.statLabel ?? "Clips Distributed";

  /* Split heading words for stagger animation */
  const line1Words = headingLine1.split(" ");
  const accentWords = headingAccent.split(" ");

  return (
    <section className="relative min-h-[90vh] flex items-stretch overflow-hidden">
      {/* Background blob */}
      <div
        className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] grainy-gradient-primary opacity-20 blur-[120px] rounded-full pointer-events-none"
        style={{ animation: "blob-drift 12s ease-in-out infinite" }}
      />

      {/* Two-column flex — text pinned left, visual right */}
      <div className="w-full flex flex-col md:flex-row md:items-center gap-8 md:gap-12 px-6 md:px-0 md:pl-8 lg:pl-16 my-auto">
        {/* ── Left column — takes remaining space ── */}
        <div className="flex-1 z-10 text-left">
          {/* Heading */}
          <h1 className="font-headline text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[9rem] leading-[0.85] font-black uppercase tracking-tighter text-white text-left">
            {/* Line 1 */}
            <span className="inline-flex flex-wrap">
              {line1Words.map((word, index) => (
                <motion.span
                  key={`l1-${index}`}
                  className="inline-block mr-[0.25em]"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                >
                  {word}
                </motion.span>
              ))}
            </span>
            <br />
            {/* Line 2 — accent */}
            <span className="inline-flex flex-wrap text-primary italic">
              {accentWords.map((word, index) => (
                <motion.span
                  key={`l2-${index}`}
                  className="inline-block mr-[0.25em]"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: line1Words.length * 0.15 + index * 0.15,
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </h1>

          {/* Description */}
          <motion.p
            className="text-on-surface-variant text-xl md:text-2xl max-w-2xl font-light leading-relaxed mb-12 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {description}
          </motion.p>

          {/* CTA buttons */}
          <div className="flex flex-row flex-wrap gap-6">
            <motion.a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="grainy-gradient-primary text-on-primary text-lg md:text-xl px-8 md:px-10 py-4 md:py-5 font-headline font-bold uppercase tracking-widest shadow-[0_20px_40px_-15px_rgba(224,141,255,0.4)] hover:translate-y-[-4px] transition-all duration-300 inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {ctaPrimary}
            </motion.a>
            <motion.a
              href="#how-it-works"
              className="border border-secondary/20 hover:bg-secondary/10 text-secondary text-lg md:text-xl px-8 md:px-10 py-4 md:py-5 font-headline font-bold uppercase tracking-widest transition-all duration-300 inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.75 }}
            >
              {ctaSecondary}
            </motion.a>
          </div>
        </div>

        {/* ── Right column ── */}
        <div className="hidden md:block relative w-[320px] lg:w-[380px] xl:w-[420px] shrink-0">
          {/* Ambient glow */}
          <div className="absolute -inset-4 bg-primary/10 blur-2xl rounded-xl pointer-events-none" />

          {/* Main tilted card */}
          <motion.div
            className="relative bg-surface-container-highest/40 border border-outline-variant/15 p-4 rounded-xl rotate-3 hover:rotate-0 transition-transform duration-500"
            initial={{ opacity: 0, x: 80, rotate: 6 }}
            animate={{ opacity: 1, x: 0, rotate: 3 }}
            transition={{ type: "spring", stiffness: 60, damping: 14, delay: 0.4 }}
          >
            {/* Abstract visual */}
            <div className="aspect-[3/4] bg-gradient-to-br from-primary/20 via-surface-container to-secondary/10 rounded-lg relative overflow-hidden">
              {/* Floating blob 1 */}
              <div
                className="absolute top-[10%] left-[15%] w-24 h-24 rounded-full bg-gradient-to-br from-primary/30 to-primary/5 blur-sm"
                style={{ animation: "float 4s ease-in-out infinite" }}
              />
              {/* Floating blob 2 */}
              <div
                className="absolute top-[50%] right-[10%] w-16 h-16 rounded-full bg-gradient-to-br from-secondary/25 to-secondary/5 blur-sm"
                style={{ animation: "float 3.5s ease-in-out infinite 0.8s" }}
              />
              {/* Floating blob 3 */}
              <div
                className="absolute bottom-[15%] left-[30%] w-20 h-20 rounded-full bg-gradient-to-br from-tertiary/20 to-tertiary/5 blur-sm"
                style={{ animation: "float 4.5s ease-in-out infinite 1.5s" }}
              />

              {/* Center play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-primary/20">
                  <Play className="w-7 h-7 text-primary fill-primary/50" />
                </div>
              </div>

              {/* Twitch icon — top-left */}
              <div className="absolute top-3 left-3 w-8 h-8 bg-surface-container-highest/60 rounded-md flex items-center justify-center border border-outline-variant/20">
                <Twitch className="w-4 h-4 text-primary-dim" />
              </div>

              {/* Activity icon — bottom-right */}
              <div className="absolute bottom-3 right-3 w-8 h-8 bg-surface-container-highest/60 rounded-md flex items-center justify-center border border-outline-variant/20">
                <Activity className="w-4 h-4 text-secondary" />
              </div>
            </div>
          </motion.div>

          {/* Glassmorphic stat box */}
          <motion.div
            className="absolute bottom-6 -left-10 glass-panel p-6 border border-secondary/30 rounded-lg shadow-2xl z-20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <div className="text-secondary font-headline font-black text-4xl leading-none">
              {statValue}
            </div>
            <div className="text-on-surface-variant text-xs uppercase tracking-widest font-bold mt-1">
              {statLabel}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
