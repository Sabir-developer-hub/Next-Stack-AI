import { useState, useEffect } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";

// ───────── TRUSTED BY LOGO SECTION ─────────
const COMPANIES = [
  "Northwind",
  "Helio Labs",
  "Quantra",
  "Meridian Health",
  "Fieldwork",
  "Arcadia Bank",
  "Lumen Freight",
  "Vertex Retail",
  "Oakline",
  "Parallax",
];

export default function TrustedBy() {
  return (
    <section className="relative bg-[#08090A] border-y border-white/[0.06] py-12 overflow-hidden">
      {/* Background fine grid overlay to match Hero */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Monospace Eyebrow Label matching exact text from screenshot */}
        <p className="text-center font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 mb-8">
          TRUSTED BY ENGINEERING AND OPS TEAMS AT
        </p>

        {/* Endless Infinite Marquee Logo Container */}
        <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          {/* Animated Track 1 */}
          <motion.div
            className="flex flex-nowrap shrink-0 gap-12 lg:gap-16 items-center pr-12 lg:pr-16"
            animate={{ x: ["0%", "-100%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 25,
            }}
          >
            {COMPANIES.map((company, idx) => (
              <span
                key={idx}
                className="font-sans text-lg lg:text-xl font-bold tracking-tight text-zinc-500/80 hover:text-zinc-200 transition-colors cursor-pointer whitespace-nowrap"
              >
                {company}
              </span>
            ))}
          </motion.div>

          {/* Animated Track 2 (Seamless loop duplicate) */}
          <motion.div
            className="flex flex-nowrap shrink-0 gap-12 lg:gap-16 items-center pr-12 lg:pr-16"
            animate={{ x: ["0%", "-100%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 25,
            }}
          >
            {COMPANIES.map((company, idx) => (
              <span
                key={`dup-${idx}`}
                className="font-sans text-lg lg:text-xl font-bold tracking-tight text-zinc-500/80 hover:text-zinc-200 transition-colors cursor-pointer whitespace-nowrap"
              >
                {company}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}