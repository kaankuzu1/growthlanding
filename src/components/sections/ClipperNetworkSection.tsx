"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import CountUp from "@/components/animations/CountUp";

/* ─────────────────────────────────────────────────────────────────── */
/*  Constants                                                          */
/* ─────────────────────────────────────────────────────────────────── */

const AVATAR_GRADIENTS = [
  "from-primary/40 to-primary-dim/60",
  "from-tertiary/40 to-secondary/20",
  "from-secondary/40 to-primary/20",
  "from-primary/30 to-tertiary/30",
] as const;

const DEFAULT_CLIPPERS = [
  {
    name: "GhostEdit",
    description: "Master of high-speed pacing and narrative retention.",
    level: "LVL 04",
    views: "2.4M",
    progress: 85,
  },
  {
    name: "NeonSly",
    description: "Visual effects specialist for top-tier FPS creators.",
    level: "LVL 02",
    views: "1.2M",
    progress: 60,
  },
  {
    name: "Vortex.",
    description: "Optimized for maximum retention and comment engagement.",
    level: "LVL 05",
    views: "5.8M",
    progress: 95,
  },
  {
    name: "PulseCut",
    description: "Viral trend spotter with expert timing on transitions.",
    level: "LVL 03",
    views: "3.1M",
    progress: 75,
  },
];

/* ─────────────────────────────────────────────────────────────────── */
/*  Animation Variants                                                 */
/* ─────────────────────────────────────────────────────────────────── */

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut" as const,
    },
  }),
};

/* ─────────────────────────────────────────────────────────────────── */
/*  Clipper Card                                                       */
/* ─────────────────────────────────────────────────────────────────── */

interface ClipperData {
  name: string;
  description: string;
  level: string;
  views: string;
  progress: number;
}

function ClipperCard({
  clipper,
  index,
  isInView,
}: {
  clipper: ClipperData;
  index: number;
  isInView: boolean;
}) {
  // Extract initials from name (first two characters or first letters of words)
  const initials = clipper.name
    .replace(/[^a-zA-Z\s]/g, "")
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || clipper.name.slice(0, 2).toUpperCase();

  const gradient = AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length];
  const staggered = index === 1 || index === 3;

  return (
    <motion.div
      className={`${staggered ? "md:mt-12" : ""}`}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="group bg-surface-container-low p-1 rounded-xl hover:bg-surface-container transition-all duration-300">
        <div className="bg-surface-container-lowest p-6 h-full flex flex-col justify-between border border-outline-variant/5 rounded-[10px]">
          {/* ── Top area ──────────────────────────────────── */}
          <div>
            <div className="flex items-start justify-between">
              {/* Avatar */}
              <div
                className={`w-16 h-16 rounded-lg overflow-hidden bg-gradient-to-br ${gradient} grayscale group-hover:grayscale-0 transition-all duration-500 flex items-center justify-center`}
              >
                <span className="font-headline font-black text-2xl text-white/60">
                  {initials}
                </span>
              </div>

              {/* Level badge */}
              <span className="text-secondary font-headline text-sm font-bold tracking-tighter">
                {clipper.level}
              </span>
            </div>

            {/* Name */}
            <h3 className="text-white font-headline text-xl md:text-2xl font-bold uppercase mb-2 mt-6">
              {clipper.name}
            </h3>

            {/* Description */}
            <p className="text-on-surface-variant text-sm mb-6">
              {clipper.description}
            </p>
          </div>

          {/* ── Bottom area: progress ─────────────────────── */}
          <div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-500 text-xs font-medium uppercase tracking-wider">
                Views
              </span>
              <span className="text-primary font-bold text-sm">
                <CountUp value={clipper.views} />
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-1 bg-surface-container-highest overflow-hidden mt-4 rounded-full">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary to-primary-dim"
                initial={{ width: "0%" }}
                animate={isInView ? { width: `${clipper.progress}%` } : { width: "0%" }}
                transition={{
                  delay: index * 0.15 + 0.4,
                  duration: 0.8,
                  type: "spring",
                  stiffness: 40,
                  damping: 15,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────── */
/*  Main Component                                                     */
/* ─────────────────────────────────────────────────────────────────── */

export default function ClipperNetworkSection({ dict }: { dict: any }) {
  const heading = dict?.heading || "Elite Clipper Network";
  const clippers: ClipperData[] = dict?.clippers || DEFAULT_CLIPPERS;

  const gridRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(gridRef, { once: true, margin: "-50px" });

  return (
    <section id="clipper-network" className="py-24 md:py-32 px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* ── Heading area ────────────────────────────────── */}
        <div>
          <h2 className="font-headline text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">
            {heading}
          </h2>
          <div className="w-24 h-1 bg-secondary mt-4" />
        </div>

        {/* ── Card grid ───────────────────────────────────── */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-16 md:mt-20"
        >
          {clippers.map((clipper, index) => (
            <ClipperCard
              key={clipper.name}
              clipper={clipper}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
