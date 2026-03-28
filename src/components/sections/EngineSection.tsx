"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Twitch, RefreshCw, Heart, MessageCircle, Share2, Play } from "lucide-react";
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";

/* ─────────────────────────────────────────────────────────────────── */
/*  Inline SVG: TikTok icon                                           */
/* ─────────────────────────────────────────────────────────────────── */

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.75a8.18 8.18 0 004.76 1.52V6.84a4.84 4.84 0 01-1-.15z" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────── */
/*  Equalizer Bars                                                     */
/* ─────────────────────────────────────────────────────────────────── */

function EqualizerBars() {
  const heights = [40, 70, 55];
  const delays = [0, 0.3, 0.6];

  return (
    <div className="absolute bottom-3 left-3 flex items-end gap-[3px] h-6">
      {heights.map((h, i) => (
        <div
          key={i}
          className="w-[3px] rounded-full bg-primary"
          style={{
            height: `${h}%`,
            animation: `float 2s ease-in-out infinite`,
            animationDelay: `${delays[i]}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────── */
/*  Flow Animation SVG                                                 */
/* ─────────────────────────────────────────────────────────────────── */

function FlowAnimation() {
  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full">
      {/* Animated flow dots on curved path */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 200 200"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="engine-flow-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e08dff" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#c3f400" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        {/* Curved flow path */}
        <path
          d="M 20 100 C 60 60, 140 60, 180 100"
          stroke="url(#engine-flow-grad)"
          strokeWidth="1.5"
          strokeDasharray="6 4"
          fill="none"
          style={{ animation: "dash-flow 3s linear infinite" }}
        />
        <path
          d="M 20 100 C 60 140, 140 140, 180 100"
          stroke="url(#engine-flow-grad)"
          strokeWidth="1.5"
          strokeDasharray="6 4"
          fill="none"
          style={{ animation: "dash-flow 3s linear infinite", animationDelay: "1.5s" }}
        />

        {/* Flow dots - top path */}
        <circle r="4" fill="#e08dff" opacity="0.8">
          <animateMotion
            dur="3s"
            repeatCount="indefinite"
            path="M 20 100 C 60 60, 140 60, 180 100"
          />
        </circle>
        <circle r="2.5" fill="#c3f400" opacity="0.6">
          <animateMotion
            dur="3s"
            repeatCount="indefinite"
            path="M 20 100 C 60 60, 140 60, 180 100"
            begin="1s"
          />
        </circle>

        {/* Flow dots - bottom path */}
        <circle r="4" fill="#c3f400" opacity="0.8">
          <animateMotion
            dur="3s"
            repeatCount="indefinite"
            path="M 20 100 C 60 140, 140 140, 180 100"
          />
        </circle>
        <circle r="2.5" fill="#e08dff" opacity="0.6">
          <animateMotion
            dur="3s"
            repeatCount="indefinite"
            path="M 20 100 C 60 140, 140 140, 180 100"
            begin="1s"
          />
        </circle>
      </svg>

      {/* Center icon */}
      <div className="relative z-10 flex flex-col items-center gap-3">
        <div className="relative">
          {/* Ambient glow */}
          <div className="absolute inset-0 blur-[20px] bg-secondary/20 rounded-full scale-150" />
          <RefreshCw
            className="relative w-12 h-12 md:w-16 md:h-16 text-secondary"
            style={{ animation: "sync-pulse 3s ease-in-out infinite" }}
          />
        </div>

        {/* Connecting dots below icon */}
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
          <div className="w-8 h-px bg-gradient-to-r from-primary/40 to-secondary/40" />
          <div className="w-1.5 h-1.5 rounded-full bg-secondary/60" />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────── */
/*  Main Component                                                     */
/* ─────────────────────────────────────────────────────────────────── */

export default function EngineSection({ dict }: { dict: any }) {
  const heading = dict?.heading || "The Engine";
  const description =
    dict?.description ||
    "Our proprietary AI-assisted workflow handles the complex geometry of content translation, so you can focus on the broadcast.";
  const inputLabel = dict?.inputLabel || "Input: Horizontal";
  const outputLabel = dict?.outputLabel || "Output: Vertical 9:16";
  const watermarkText = dict?.watermarkText || "SYSTEM";

  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const watermarkY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 px-8 bg-surface-container-low relative"
    >
      <div className="max-w-7xl mx-auto">
        {/* ── Top area: heading + watermark ────────────────────── */}
        <div className="flex flex-row justify-between items-start">
          {/* Left: heading + description */}
          <FadeInWhenVisible>
            <div>
              <h2 className="font-headline text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mb-6">
                {heading}
              </h2>
              <p className="text-on-surface-variant text-lg max-w-xl">
                {description}
              </p>
            </div>
          </FadeInWhenVisible>

          {/* Right: watermark */}
          <motion.div
            className="font-headline text-[6rem] md:text-[10rem] font-black text-white/5 leading-none select-none hidden md:block"
            style={{ y: watermarkY }}
          >
            {watermarkText}
          </motion.div>
        </div>

        {/* ── Bottom: 3-column grid ───────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center mt-16 md:mt-24">
          {/* ── Left column: Input (Horizontal) ─────────────── */}
          <FadeInWhenVisible direction="left">
            <div>
              <div className="bg-surface-container text-xs p-2 mb-4 font-headline uppercase tracking-widest text-zinc-500 border-l-2 border-primary">
                {inputLabel}
              </div>

              <div className="aspect-video bg-surface-container-highest rounded-lg border border-outline-variant/10 relative overflow-hidden">
                {/* Horizontal stream gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-surface-container-highest to-primary/5" />
                {/* Bottom fade */}
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent" />

                {/* Twitch icon + LIVE badge */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <Twitch className="w-4 h-4 text-primary" />
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-red-500 text-white px-1.5 py-0.5 rounded">
                    LIVE
                  </span>
                </div>

                {/* Equalizer bars at bottom */}
                <EqualizerBars />
              </div>
            </div>
          </FadeInWhenVisible>

          {/* ── Center column: Flow animation ────────────────── */}
          <FadeInWhenVisible>
            <div className="flex justify-center h-48 md:h-64">
              <FlowAnimation />
            </div>
          </FadeInWhenVisible>

          {/* ── Right column: Output (Vertical 9:16) ─────────── */}
          <FadeInWhenVisible direction="right">
            <div>
              <div className="bg-surface-container text-xs p-2 mb-4 font-headline uppercase tracking-widest text-secondary border-l-2 border-secondary">
                {outputLabel}
              </div>

              <div
                className="aspect-[9/16] bg-surface-container-highest rounded-lg border border-secondary/20 relative overflow-hidden max-h-[380px]"
                style={{
                  boxShadow: "0 0 50px -10px rgba(195,244,0,0.2)",
                }}
              >
                {/* Vertical clip gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-secondary/10 via-surface-container-highest to-primary/10" />

                {/* Inner glowing border */}
                <div className="absolute inset-0 border-4 border-secondary/10 rounded-lg pointer-events-none" />

                {/* Centered play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                    <Play className="w-5 h-5 text-white fill-white" />
                  </div>
                </div>

                {/* TikTok-style UI overlay (right side) */}
                <div className="absolute right-3 bottom-16 flex flex-col items-center gap-4">
                  <div className="flex flex-col items-center gap-1">
                    <Heart className="w-6 h-6 text-white" />
                    <span className="text-[10px] text-white/70 font-medium">24.5K</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <MessageCircle className="w-6 h-6 text-white" />
                    <span className="text-[10px] text-white/70 font-medium">1,204</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Share2 className="w-6 h-6 text-white" />
                    <span className="text-[10px] text-white/70 font-medium">892</span>
                  </div>
                </div>

                {/* Bottom username area */}
                <div className="absolute bottom-3 left-3 right-12">
                  <div className="flex items-center gap-1.5 mb-1">
                    <TikTokIcon className="w-3.5 h-3.5 text-white/70" />
                    <span className="text-[10px] text-white/80 font-medium">@creator</span>
                  </div>
                  <div className="w-3/4 h-1 rounded-full bg-white/10" />
                </div>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  );
}
