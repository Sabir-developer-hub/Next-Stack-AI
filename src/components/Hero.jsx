import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const DYNAMIC_WORDS = ["software", "AI systems", "scalable apps", "automation"];

export default function Hero() {
  const [index, setIndex] = useState(0);

  // Interval to cycle through words
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % DYNAMIC_WORDS.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  // Parent animation variant for staggered welcome effect
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  // Child animation variant for initial appearance
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#08090A]">
      {/* ───────── Background ───────── */}
      <div className="pointer-events-none absolute inset-0">
        {/* Main box/grid */}
        <div
          className="
            absolute inset-0
            bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)]
            bg-[size:48px_48px]
          "
        />

        {/* Fine grid */}
        <div
          className="
            absolute inset-0 opacity-40
            bg-[linear-gradient(rgba(49,227,135,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(49,227,135,0.018)_1px,transparent_1px)]
            bg-[size:12px_12px]
          "
        />

        {/* Center ambient light */}
        <div
          className="
            absolute left-1/2 top-1/2
            h-[500px] w-[500px]
            -translate-x-1/2 -translate-y-1/2
            rounded-full
            bg-[#31E387]/[0.025]
            blur-[140px]
          "
        />

        {/* Vignette */}
        <div
          className="
            absolute inset-0
            bg-[radial-gradient(circle_at_center,transparent_0%,#08090A_85%)]
          "
        />

        {/* Animated scan line */}
        <motion.div
          className="
            absolute left-0 h-px w-full
            bg-gradient-to-r
            from-transparent
            via-[#31E387]/20
            to-transparent
          "
          animate={{
            top: ["10%", "90%", "10%"],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Corner lines */}
        <div className="absolute left-8 top-8 h-14 w-14 border-l border-t border-white/[0.08]" />
        <div className="absolute right-8 top-8 h-14 w-14 border-r border-t border-white/[0.08]" />
        <div className="absolute bottom-8 left-8 h-14 w-14 border-b border-l border-white/[0.08]" />
        <div className="absolute bottom-8 right-8 h-14 w-14 border-b border-r border-white/[0.08]" />

        {/* Green system indicators */}
        <div className="absolute left-[10%] top-[25%] h-1.5 w-1.5 rounded-full bg-[#31E387] shadow-[0_0_12px_#31E387]" />
        <div className="absolute right-[12%] top-[65%] h-1.5 w-1.5 rounded-full bg-[#31E387] shadow-[0_0_12px_#31E387]" />
      </div>

      {/* ───────── Hero Content (Centered) ───────── */}
      <motion.div
        className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 text-center lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Eyebrow */}
        <motion.div
          variants={itemVariants}
          className="mb-6 inline-flex items-center gap-3 border border-white/[0.1] bg-white/[0.02] px-4 py-2 backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#31E387] shadow-[0_0_10px_#31E387]" />
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-400">
            AI systems · software engineering
          </span>
        </motion.div>

        {/* Heading with Vertical Metallic Gradient */}
        {/* Hero Heading */}
<motion.h1
  variants={itemVariants}
  className="text-5xl font-medium tracking-[-0.05em] sm:text-7xl lg:text-8xl"
>
  <span className="bg-gradient-to-b from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
    We build{" "}
  </span>

  <span className="relative inline-flex min-w-[5.5ch] justify-start text-[#31E387]">
    <AnimatePresence mode="wait">
      <motion.span
        key={DYNAMIC_WORDS[index]}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{
          duration: 0.35,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="inline-block"
      >
        {DYNAMIC_WORDS[index]}
      </motion.span>
    </AnimatePresence>
  </span>
          <span className="bg-gradient-to-b from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
            {" "}that ships.
          </span>
</motion.h1>


        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="mt-8 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg"
        >
          Next Stack AI engineers production-grade AI systems,
          intelligent automation, and full-stack software for teams
          that need results — not demos.
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            className="
              group flex items-center gap-6
              bg-[#31E387]
              px-6 py-3.5
              text-sm font-medium text-black
              transition-all duration-200
              hover:bg-[#42f197] hover:shadow-[0_0_20px_rgba(49,227,135,0.3)]
            "
          >
            Start a project
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </button>

          <button
            className="
              border border-white/[0.12]
              bg-white/[0.02]
              px-6 py-3.5
              text-sm text-zinc-300
              backdrop-blur-sm
              transition-all duration-200
              hover:border-[#31E387]/40
              hover:text-white
            "
          >
            Explore services
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}