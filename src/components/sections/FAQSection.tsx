"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import Container from "@/components/ui/Container";
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";
import type { FAQDict } from "@/types";

export default function FAQSection({ dict }: { dict: FAQDict }) {
  const [openIndex, setOpenIndex] = useState(0);
  const [ripple, setRipple] = useState<{ index: number; x: number; y: number } | null>(null);

  const handleClick = useCallback(
    (index: number, e: React.MouseEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setRipple({ index, x, y });
      setTimeout(() => setRipple(null), 600);
      setOpenIndex(openIndex === index ? -1 : index);
    },
    [openIndex]
  );

  return (
    <section id="faq" className="py-24 md:py-32 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Heading — centered */}
        <div className="mb-16 md:mb-20 text-center">
          <h2 className="font-headline text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mb-4">
            {dict.heading}
          </h2>
          {dict.subtitle && (
            <p className="text-on-surface-variant text-lg max-w-2xl mx-auto">{dict.subtitle}</p>
          )}
        </div>

        <FadeInWhenVisible>
          <div className="max-w-3xl mx-auto flex flex-col gap-3">
            {dict.items.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className={`transition-colors duration-200 ${
                    isOpen ? "bg-surface-container" : "bg-surface-container-low"
                  }`}
                >
                  <button
                    className="w-full flex justify-between items-center py-5 px-6 text-left cursor-pointer relative overflow-hidden group"
                    onClick={(e) => handleClick(index, e)}
                  >
                    {/* Click ripple */}
                    {ripple?.index === index && (
                      <span
                        className="absolute bg-primary/10 rounded-full pointer-events-none"
                        style={{
                          left: ripple.x - 10,
                          top: ripple.y - 10,
                          width: 20,
                          height: 20,
                          animation: "click-ripple 0.6s ease-out forwards",
                        }}
                      />
                    )}

                    {/* Left accent on hover */}
                    <span className="absolute left-0 top-0 h-full w-0 group-hover:w-[2px] bg-secondary transition-all duration-200" />

                    <span className="font-medium text-on-surface pr-4 relative">
                      {item.question}
                    </span>
                    {isOpen ? (
                      <Minus className="w-5 h-5 text-primary flex-shrink-0" />
                    ) : (
                      <Plus className="w-5 h-5 text-zinc-500 flex-shrink-0" />
                    )}
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 px-6 text-on-surface-variant leading-relaxed">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
