"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Play, Eye } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import type { ServicesDict } from "@/types";

/* ─────────────────────────────────────────────────────────────────── */
/*  Visual Sub-Components                                              */
/* ─────────────────────────────────────────────────────────────────── */

/* ── Card 1: Clip Distribution ─────────────────────────────────────── */

// SVG path definitions — shared between visible paths and animateMotion
// ViewBox is 460x260. Clip card: x=40–140. Pills: x=360–420.
const FLOW_PATHS = {
  tiktok: "M 140 105 C 210 80, 290 50, 360 60",
  reels:  "M 140 130 C 220 115, 290 115, 360 130",
  shorts: "M 140 155 C 210 180, 290 210, 360 200",
} as const;

function ClipFlowVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div
      ref={ref}
      className="relative w-full h-[220px] sm:h-[260px] overflow-hidden rounded-xl bg-[#111113]"
    >
      {/* Radial glow behind clip card */}
      <div className="absolute pointer-events-none" style={{ left: "22%", top: "50%", transform: "translate(-50%, -50%)" }}>
        <div className="w-40 h-40 rounded-full bg-brand-500/10 blur-[60px]" />
      </div>

      {/* Single SVG — all elements in one coordinate system */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 460 260"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="svc-path-tt" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#9146FF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="svc-path-ig" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#9146FF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#E1306C" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="svc-path-yt" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#9146FF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FF0000" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {/* ── Clip card ──────────────────────────────────────── */}
        <g style={{ opacity: inView ? 1 : 0, transition: "opacity 0.5s" }}>
          <rect x="40" y="65" width="100" height="130" rx="8" fill="#1A1A1E" stroke="#2F2F35" strokeWidth="1" />
          <rect x="40" y="65" width="100" height="104" rx="8" fill="#772CE8" fillOpacity="0.35" />
          <rect x="40" y="161" width="100" height="8" fill="#1A1A1E" />
          {/* Play button */}
          <circle cx="90" cy="117" r="16" fill="white" fillOpacity="0.15" />
          <polygon points="85,110 85,124 98,117" fill="white" fillOpacity="0.9" />
          {/* Bottom bar */}
          <rect x="40" y="169" width="100" height="26" fill="#111113" />
          <line x1="40" y1="169" x2="140" y2="169" stroke="#2F2F35" strokeWidth="0.5" />
          <text x="50" y="186" fill="#6B7280" fontSize="10" fontFamily="monospace">00:42</text>
          <circle cx="128" cy="182" r="2" fill="#9146FF" fillOpacity="0.6" />
          <circle cx="134" cy="182" r="2" fill="#9146FF" fillOpacity="0.4" />
        </g>

        {/* ── Dashed paths ───────────────────────────────────── */}
        <g style={{ opacity: inView ? 1 : 0, transition: "opacity 0.5s 0.3s" }}>
          <path d={FLOW_PATHS.tiktok} stroke="url(#svc-path-tt)" strokeWidth="1.5" strokeDasharray="6 4" style={{ animation: "dash-flow 1.5s linear infinite" }} />
          <path d={FLOW_PATHS.reels} stroke="url(#svc-path-ig)" strokeWidth="1.5" strokeDasharray="6 4" style={{ animation: "dash-flow 1.5s linear infinite" }} />
          <path d={FLOW_PATHS.shorts} stroke="url(#svc-path-yt)" strokeWidth="1.5" strokeDasharray="6 4" style={{ animation: "dash-flow 1.5s linear infinite" }} />
        </g>

        {/* ── Animated dots on paths ─────────────────────────── */}
        <g style={{ opacity: inView ? 1 : 0, transition: "opacity 0.5s 0.5s" }}>
          {[0, 0.4, 0.8].map((delay, i) => (
            <circle key={`tt-${i}`} r={[4, 3, 2][i]} fill="#ffffff" opacity={[0.9, 0.6, 0.3][i]}>
              <animateMotion dur="2.5s" repeatCount="indefinite" begin={`${delay}s`} path={FLOW_PATHS.tiktok} />
            </circle>
          ))}
          {[0.2, 0.6, 1.0].map((delay, i) => (
            <circle key={`ig-${i}`} r={[4, 3, 2][i]} fill="#E1306C" opacity={[0.9, 0.6, 0.3][i]}>
              <animateMotion dur="2.5s" repeatCount="indefinite" begin={`${delay}s`} path={FLOW_PATHS.reels} />
            </circle>
          ))}
          {[0.1, 0.5, 0.9].map((delay, i) => (
            <circle key={`yt-${i}`} r={[4, 3, 2][i]} fill="#FF0000" opacity={[0.9, 0.6, 0.3][i]}>
              <animateMotion dur="2.5s" repeatCount="indefinite" begin={`${delay}s`} path={FLOW_PATHS.shorts} />
            </circle>
          ))}
        </g>

        {/* ── Platform pills ─────────────────────────────────── */}
        <g style={{ opacity: inView ? 1 : 0, transition: "opacity 0.6s 0.5s" }}>
          <g>
            <rect x="362" y="48" width="56" height="24" rx="12" fill="#1A1A1E" stroke="#2F2F35" strokeWidth="1" />
            <text x="390" y="64" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="500" fontFamily="system-ui">TikTok</text>
            <animateTransform attributeName="transform" type="translate" values="0,0;0,-4;0,0" dur="2.8s" repeatCount="indefinite" />
          </g>
          <g>
            <rect x="362" y="118" width="50" height="24" rx="12" fill="#1A1A1E" stroke="#2F2F35" strokeWidth="1" />
            <text x="387" y="134" textAnchor="middle" fill="#E1306C" fontSize="10" fontWeight="500" fontFamily="system-ui">Reels</text>
            <animateTransform attributeName="transform" type="translate" values="0,0;0,-4;0,0" dur="3.1s" repeatCount="indefinite" begin="0.3s" />
          </g>
          <g>
            <rect x="362" y="188" width="54" height="24" rx="12" fill="#1A1A1E" stroke="#2F2F35" strokeWidth="1" />
            <text x="389" y="204" textAnchor="middle" fill="#FF4444" fontSize="10" fontWeight="500" fontFamily="system-ui">Shorts</text>
            <animateTransform attributeName="transform" type="translate" values="0,0;0,-4;0,0" dur="3.4s" repeatCount="indefinite" begin="0.6s" />
          </g>
        </g>
      </svg>
    </div>
  );
}

/* ── Card 2: Campaign Management – Calendar ────────────────────────── */
function CalendarVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const cells = [
    [1, 2, 3, 4, 5, 6, 7],
    [8, 9, 10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19, 20, 21],
    [22, 23, 24, 25, 26, 27, 28],
  ];
  const scheduled = new Set([5, 12, 19, 26]);
  const published = new Set([3, 10, 17]);
  const today = 14;

  return (
    <div
      ref={ref}
      className="relative w-full h-[220px] sm:h-[260px] flex flex-col items-center justify-center overflow-hidden rounded-xl bg-[#111113] p-4"
    >
      {/* Calendar grid */}
      <div className="w-full max-w-[200px]">
        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1 mb-1.5">
          {days.map((d) => (
            <div key={d} className="text-[10px] text-gray-500 text-center font-mono">
              {d}
            </div>
          ))}
        </div>
        {/* Date cells */}
        {cells.map((row, rowIdx) => (
          <div key={rowIdx} className="grid grid-cols-7 gap-1 mb-1">
            {row.map((date, colIdx) => {
              const isScheduled = scheduled.has(date);
              const isPublished = published.has(date);
              const isToday = date === today;
              const flatIdx = rowIdx * 7 + colIdx;
              return (
                <motion.div
                  key={date}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.05 * flatIdx, duration: 0.25 }}
                  className={`relative aspect-square rounded-md flex items-center justify-center text-[10px] font-mono ${
                    isToday
                      ? "bg-brand-500/20 ring-1 ring-brand-500/40 text-brand-300"
                      : "bg-[#18181B] text-gray-500"
                  }`}
                >
                  {date}
                  {isScheduled && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand-500" />
                  )}
                  {isPublished && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-400" />
                  )}
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Status pill */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.8, duration: 0.3 }}
        className="mt-2 px-2.5 py-1 rounded-full bg-brand-500/15 text-brand-400 text-[10px] font-medium"
      >
        3 scheduled
      </motion.div>
    </div>
  );
}

/* ── Card 3: Trend Detection – Equalizer ───────────────────────────── */
function EqualizerVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const barCount = 9;
  const durations = [1.2, 0.9, 1.4, 1.0, 0.8, 1.3, 1.1, 0.95, 1.25];
  const delays = [0, 0.15, 0.05, 0.25, 0.1, 0.2, 0.3, 0.08, 0.18];

  const pills = [
    { text: "#trending", delay: 0 },
    { text: "\uD83D\uDD25", delay: 0.4 },
    { text: "viral", delay: 0.8 },
  ];

  return (
    <div
      ref={ref}
      className="relative w-full h-[220px] sm:h-[260px] flex flex-col items-center justify-center overflow-hidden rounded-xl bg-[#111113]"
    >
      {/* Equalizer bars */}
      <div className="flex items-end gap-[6px] h-[100px]">
        {Array.from({ length: barCount }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ delay: delays[i], duration: 0.4 }}
            className="w-[10px] rounded-full origin-bottom"
            style={{
              height: "100%",
              background: "linear-gradient(to top, #772CE8, #a970ff)",
              animation: inView
                ? `equalizer-pulse ${durations[i]}s ease-in-out infinite ${delays[i]}s`
                : "none",
              transformOrigin: "bottom",
              boxShadow: "0 -4px 12px rgba(145, 70, 255, 0.2)",
            }}
          />
        ))}
      </div>

      {/* Floating trend pills */}
      {pills.map((pill) => (
        <motion.div
          key={pill.text}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 + pill.delay, duration: 0.4 }}
          className="absolute"
          style={{
            top: `${20 + pill.delay * 30}%`,
            right: `${10 + pill.delay * 15}%`,
            animation: `particle-float-1 ${3 + pill.delay}s ease-in-out infinite ${pill.delay}s`,
          }}
        >
          <div className="px-2 py-0.5 rounded-full bg-brand-500/15 border border-brand-500/20 text-[10px] text-brand-300 font-medium">
            {pill.text}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ── Card 4: Growth Analytics – Animated Growth Line ─────────────── */
const GROWTH_LINE_PATH = "M 30 160 C 70 140, 90 90, 140 80 C 170 74, 200 100, 230 105 C 260 110, 290 60, 330 40 L 370 20";
const GROWTH_AREA_PATH = `${GROWTH_LINE_PATH} L 370 180 L 30 180 Z`;
const GROWTH_LABELS = ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"];
const GROWTH_DOTS = [
  { cx: 140, cy: 80, delay: 1.8 },
  { cx: 330, cy: 40, delay: 2.0 },
  { cx: 370, cy: 20, delay: 2.2 },
];

function BarChartVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const pathLength = 520;

  return (
    <div
      ref={ref}
      className="relative w-full h-[220px] sm:h-[260px] flex items-center justify-center overflow-hidden rounded-xl bg-[#111113] p-5"
    >
      <svg viewBox="0 0 400 200" className="w-full h-full" fill="none">
        <defs>
          <linearGradient id="growthAreaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#9146FF" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#9146FF" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="growthLineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#6316DB" />
            <stop offset="100%" stopColor="#a970ff" />
          </linearGradient>
        </defs>

        {/* Dashed grid lines */}
        {[50, 100, 150].map((y) => (
          <line
            key={y}
            x1="30" y1={y} x2="380" y2={y}
            stroke="#2F2F35"
            strokeDasharray="4 4"
            strokeWidth="0.5"
          />
        ))}

        {/* X-axis labels */}
        {GROWTH_LABELS.map((label, i) => (
          <text
            key={label}
            x={30 + i * 48.6}
            y="196"
            fill="#6B7280"
            fontSize="9"
            fontFamily="monospace"
            textAnchor="middle"
          >
            {label}
          </text>
        ))}

        {/* Area fill — fades in after line draws */}
        <path
          d={GROWTH_AREA_PATH}
          fill="url(#growthAreaGrad)"
          style={{
            opacity: inView ? 1 : 0,
            transition: "opacity 0.6s ease-in 1.4s",
          }}
        />

        {/* Animated trend line */}
        <path
          d={GROWTH_LINE_PATH}
          stroke="url(#growthLineGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: pathLength,
            strokeDashoffset: inView ? 0 : pathLength,
            transition: "stroke-dashoffset 1.5s ease-out 0.2s",
          }}
        />


        {/* Glowing dots at peaks */}
        {GROWTH_DOTS.map((dot, i) => (
          <circle
            key={i}
            cx={dot.cx}
            cy={dot.cy}
            r="4"
            fill="#9146FF"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "scale(1)" : "scale(0)",
              transformOrigin: `${dot.cx}px ${dot.cy}px`,
              transition: `opacity 0.3s ease-out ${dot.delay}s, transform 0.3s ease-out ${dot.delay}s`,
              animation: inView ? `chart-dot-pulse 2s ease-in-out ${dot.delay + 0.3}s infinite` : "none",
            }}
          />
        ))}
      </svg>

    </div>
  );
}

/* ── Card 5: Content Optimization – Video Editor ───────────────────── */
function VideoEditorVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const sparkles = [
    { top: "8%", left: "6%", delay: 0 },
    { top: "12%", right: "8%", delay: 0.5 },
    { bottom: "25%", left: "4%", delay: 1.0 },
    { bottom: "30%", right: "5%", delay: 1.5 },
  ];

  return (
    <div
      ref={ref}
      className="relative w-full h-[220px] sm:h-[260px] flex flex-col items-center justify-center overflow-hidden rounded-xl bg-[#111113] p-4"
    >
      {/* Video player frame */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-[340px] rounded-lg bg-[#0A0A0C] border border-[#2F2F35] overflow-hidden shadow-lg"
      >
        {/* Preview area (16:9-ish) */}
        <div className="relative aspect-video bg-gradient-to-br from-brand-900/40 via-[#111113] to-brand-800/20 flex items-center justify-center">
          {/* Play button */}
          <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
            <Play className="w-5 h-5 text-white/80 fill-white/80" />
          </div>
          {/* View count badge */}
          <div className="absolute top-2 left-2 flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/50 backdrop-blur-sm">
            <Eye className="w-3 h-3 text-gray-400" />
            <span className="text-[9px] text-gray-300 font-mono">12.4K</span>
          </div>
          {/* AI Optimized badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.3 }}
            className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-brand-500/20 border border-brand-500/30 overflow-hidden"
          >
            <span className="relative z-10 text-[9px] text-brand-300 font-semibold">AI Optimized</span>
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent"
              style={{ animation: "shimmer-sweep 3s ease-in-out infinite" }}
            />
          </motion.div>
          {/* Caption overlay */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent px-3 py-2">
            <p className="text-[10px] text-white/80 font-medium truncate">
              Best play of the stream...
            </p>
          </div>
        </div>

        {/* Timeline bar */}
        <div className="h-6 bg-[#0A0A0C] flex items-center px-2 gap-2">
          <div className="flex-1 h-1 bg-[#2F2F35] rounded-full relative overflow-hidden">
            <motion.div
              initial={{ width: "0%" }}
              animate={inView ? { width: "62%" } : {}}
              transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
              className="absolute inset-y-0 left-0 bg-brand-500 rounded-full"
            />
            {/* Playhead dot */}
            <motion.div
              initial={{ left: "0%" }}
              animate={inView ? { left: "62%" } : {}}
              transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
              className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-sm"
            />
          </div>
          <span className="text-[9px] text-gray-500 font-mono shrink-0">0:42</span>
        </div>
      </motion.div>

      {/* Floating sparkles */}
      {sparkles.map((s, i) => (
        <span
          key={i}
          className="absolute text-brand-400/60 text-xs pointer-events-none"
          style={{
            ...s,
            animation: inView
              ? `ascii-glow 2.5s ease-in-out infinite ${s.delay}s`
              : "none",
          }}
        >
          &#10022;
        </span>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────── */
/*  Visual map: index → illustration component                        */
/* ─────────────────────────────────────────────────────────────────── */

const VISUAL_MAP: Record<number, React.FC> = {
  0: ClipFlowVisual,
  1: CalendarVisual,
  2: EqualizerVisual,
  3: BarChartVisual,
  4: VideoEditorVisual,
};

/* ─────────────────────────────────────────────────────────────────── */
/*  Grid span configs                                                  */
/* ─────────────────────────────────────────────────────────────────── */

const GRID_SPANS: Record<number, string> = {
  0: "lg:col-span-6", // Clip Distribution — hero card
  1: "lg:col-span-3", // Campaign Management
  2: "lg:col-span-3", // Trend Detection
  3: "lg:col-span-5", // Growth Analytics
  4: "lg:col-span-7", // Content Optimization — second hero
};

/* ─────────────────────────────────────────────────────────────────── */
/*  Main Section Component                                             */
/* ─────────────────────────────────────────────────────────────────── */

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
} as const;

export default function ServicesSection({ dict }: { dict: ServicesDict }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="bg-transparent py-16 md:py-24">
      <Container>
        <SectionHeading
          badge={dict.badge}
          heading={dict.heading}
          headingAccent={dict.headingAccent}
          subtitle={dict.subtitle}
        />

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4"
        >
          {dict.items.map((service, index) => {
            const Visual = VISUAL_MAP[index];
            const span = GRID_SPANS[index] || "lg:col-span-6";

            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className={`group relative sm:col-span-1 ${span}`}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                {/* Ambient glow backdrop */}
                <div className="absolute -inset-4 -z-10 rounded-3xl blur-[60px] bg-brand-500/0 group-hover:bg-brand-500/10 transition-all duration-700" />

                {/* Gradient border wrapper */}
                <div className="h-full rounded-2xl bg-gradient-to-br from-brand-500/20 via-brand-600/10 to-brand-500/20 p-[1px] transition-all duration-500 group-hover:from-brand-500/60 group-hover:via-brand-600/30 group-hover:to-brand-500/60 hover:shadow-lg hover:shadow-brand-500/10">
                  {/* Inner card */}
                  <div className="relative h-full rounded-2xl bg-[#1F1F23] overflow-hidden">
                    {/* Shimmer overlay */}
                    <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent"
                        style={{ animation: "shimmer-sweep 3s ease-in-out infinite" }}
                      />
                    </div>

                    {/* Illustration area */}
                    {Visual && <Visual />}

                    {/* Text content */}
                    <div className="p-5 pt-4">
                      <p className="text-xs font-semibold tracking-wider text-brand-400">
                        {service.label}
                      </p>
                      <h3 className="text-lg font-semibold mt-1.5 text-gray-100">
                        {service.title}
                      </h3>
                      <p className="text-gray-400 mt-2 text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
