"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";

const STEP_COLORS = [
  { border: "border-primary", text: "text-primary" },
  { border: "border-tertiary", text: "text-tertiary" },
  { border: "border-secondary", text: "text-secondary" },
  { border: "border-white", text: "text-white" },
];

const DEFAULT_STEPS = [
  {
    number: "01",
    title: "Stream",
    description:
      "Broadcast your elite gameplay or entertaining content live on Twitch or YouTube. We monitor the data in real-time.",
  },
  {
    number: "02",
    title: "Clip",
    description:
      "Our AI identifies peak engagement moments and triggers the Clipper Network for immediate extraction.",
  },
  {
    number: "03",
    title: "Distribute",
    description:
      "Native vertical content is automatically deployed across TikTok, Reels, and Shorts using optimized schedules.",
  },
  {
    number: "04",
    title: "Explode",
    description:
      "Watch your follower count skyrocket as our viral loops drive viewers back to your primary stream.",
  },
];

export default function WorkflowSection({ dict }: { dict: any }) {
  const heading = dict?.heading || "The Workflow";
  const steps = dict?.steps || DEFAULT_STEPS;

  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  return (
    <section
      id="how-it-works"
      className="py-24 md:py-32 bg-surface-container-lowest overflow-hidden"
    >
      {/* Heading */}
      <div className="px-8 max-w-7xl mx-auto mb-12 md:mb-16">
        <FadeInWhenVisible>
          <h2 className="font-headline text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">
            {heading}
          </h2>
        </FadeInWhenVisible>
      </div>

      {/* Desktop: horizontal scroll */}
      <div className="relative hidden md:block">
        <div
          ref={containerRef}
          className="hidden md:flex overflow-x-auto gap-8 px-8 pb-12 scroll-smooth"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {steps.map(
            (
              step: { number: string; title: string; description: string },
              index: number
            ) => {
              const color = STEP_COLORS[index] || STEP_COLORS[0];

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: -40 }}
                  animate={
                    isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }
                  }
                  transition={{
                    duration: 0.5,
                    delay: index * 0.15,
                    ease: "easeOut",
                  }}
                  className={`min-w-[320px] lg:min-w-[350px] bg-surface-container-low p-8 md:p-10 border-l-4 ${color.border}`}
                  style={{ scrollSnapAlign: "start" }}
                >
                  <p className="text-5xl md:text-6xl font-headline font-black text-white/10 mb-6">
                    {step.number}
                  </p>
                  <h3
                    className={`font-headline text-2xl md:text-3xl font-bold uppercase mb-4 tracking-tighter ${color.text}`}
                  >
                    {step.title}
                  </h3>
                  <p className="text-on-surface-variant leading-relaxed text-sm md:text-base">
                    {step.description}
                  </p>
                </motion.div>
              );
            }
          )}
        </div>

        {/* Right edge gradient fade */}
        <div className="hidden md:block absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-surface-container-lowest to-transparent pointer-events-none z-10" />
      </div>

      {/* Mobile: stacked vertically */}
      <div className="md:hidden flex flex-col gap-6 px-8">
        {steps.map(
          (
            step: { number: string; title: string; description: string },
            index: number
          ) => {
            const color = STEP_COLORS[index] || STEP_COLORS[0];

            return (
              <FadeInWhenVisible
                key={step.number}
                direction="up"
                delay={index * 0.15}
              >
                <div
                  className={`bg-surface-container-low p-8 md:p-10 border-l-4 ${color.border}`}
                >
                  <p className="text-5xl md:text-6xl font-headline font-black text-white/10 mb-6">
                    {step.number}
                  </p>
                  <h3
                    className={`font-headline text-2xl md:text-3xl font-bold uppercase mb-4 tracking-tighter ${color.text}`}
                  >
                    {step.title}
                  </h3>
                  <p className="text-on-surface-variant leading-relaxed text-sm md:text-base">
                    {step.description}
                  </p>
                </div>
              </FadeInWhenVisible>
            );
          }
        )}
      </div>
    </section>
  );
}
