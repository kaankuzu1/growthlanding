"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { CALENDLY_URL } from "@/lib/constants";

export default function CTASection({
  dict,
  locale,
}: {
  dict: any;
  locale: string;
}) {
  const headingLine1 = dict?.headingLine1 || "Ready for the";
  const headingAccent = dict?.headingAccent || "Viral Loop?";
  const ctaPrimary = dict?.ctaPrimary || dict?.button || "Apply Now";
  const ctaSecondary = dict?.ctaSecondary || "Book a Demo";

  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });
  const [glitchDone, setGlitchDone] = useState(false);

  useEffect(() => {
    if (isInView && !glitchDone) {
      const timer = setTimeout(() => {
        setGlitchDone(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isInView, glitchDone]);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-24 md:py-32 px-8 relative overflow-hidden"
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-primary/5" />

      {/* Content */}
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-headline text-5xl md:text-6xl lg:text-8xl font-black uppercase tracking-tighter text-white mb-8"
        >
          {headingLine1}
          <br />
          <span
            className="text-secondary"
            style={{
              animation:
                !glitchDone && isInView
                  ? "glitch-text 0.5s ease-out 0.3s"
                  : "none",
            }}
          >
            {headingAccent}
          </span>
        </motion.h2>

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row justify-center gap-6 mt-10 md:mt-12">
          <motion.a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            className="bg-secondary text-on-secondary text-lg md:text-xl px-10 md:px-12 py-5 md:py-6 font-headline font-bold uppercase tracking-widest hover:shadow-[0_0_30px_rgba(195,244,0,0.4)] transition-all"
          >
            {ctaPrimary}
          </motion.a>

          <motion.a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.45, ease: "easeOut" }}
            className="bg-surface-container-highest text-white text-lg md:text-xl px-10 md:px-12 py-5 md:py-6 font-headline font-bold uppercase tracking-widest border border-outline-variant/20 hover:border-white/40 transition-all"
          >
            {ctaSecondary}
          </motion.a>
        </div>
      </div>
    </section>
  );
}
