import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

// Stack categorization data matching the reference architecture
const STACK_CATEGORIES = [
  {
    category: "MODELS",
    items: ["OpenAI", "Anthropic", "Llama", "Mistral", "Gemini", "Cohere"],
  },
  {
    category: "AI TOOLING",
    items: ["LangGraph", "LlamaIndex", "vLLM", "Ray", "Weights & Biases", "MLflow"],
  },
  {
    category: "APPLICATION",
    items: ["TypeScript", "React", "Next.js", "Python", "Go", "GraphQL"],
  },
  {
    category: "DATA & CLOUD",
    items: ["AWS", "GCP", "Azure", "Snowflake", "Kubernetes", "Terraform"],
  },
];

function TechBadge({ label, index }) {
  const badgeRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!badgeRef.current) return;
    const rect = badgeRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={badgeRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.4,
        delay: 0.1 + index * 0.04,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -2, scale: 1.04 }}
      whileTap={{ scale: 0.98 }}
      className="relative group bg-[#0C0D0E] border border-white/[0.1] hover:border-[#31E387]/60 px-4 py-2 rounded-md transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-sm shadow-sm hover:shadow-[0_0_15px_rgba(49,227,135,0.15)]"
    >
      {/* Interactive Radial Spotlight Follower on Hover */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-md"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(120px circle at ${mousePos.x}px ${mousePos.y}px, rgba(49,227,135,0.2), transparent 80%)`,
        }}
      />

      {/* Top Border Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#31E387]/0 group-hover:via-[#31E387]/60 to-transparent transition-all duration-300" />

      <span className="relative z-10 font-mono text-xs text-zinc-300 group-hover:text-white transition-colors duration-200 tracking-wide">
        {label}
      </span>
    </motion.div>
  );
}

export default function StackSection() {
  return (
    <section className="relative bg-[#08090A] text-white py-28 border-t border-b border-white/[0.08] overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute top-1/2 right-10 -translate-y-1/2 w-[500px] h-[500px] bg-[#31E387]/[0.02] rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* ───────── Left Header Column ───────── */}
          <div className="lg:col-span-5 space-y-6">
            {/* Section Tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3"
            >
              <span className="font-mono text-xs font-semibold text-[#31E387]">04</span>
              <span className="text-zinc-600 font-mono text-xs">—</span>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-400">
                STACK
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] text-white"
            >
              Model-agnostic. <br />
              <span className="text-zinc-500">Cloud-agnostic.</span>
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-sm sm:text-base text-zinc-400 leading-relaxed font-sans max-w-md"
            >
              We pick tools for your constraints — cost, latency, compliance — and keep you free of lock-in.
            </motion.p>
          </div>

          {/* ───────── Right Tech Stack Rows Column ───────── */}
          <div className="lg:col-span-7 space-y-0 border-t border-white/[0.08]">
            {STACK_CATEGORIES.map((row, rowIdx) => (
              <motion.div
                key={row.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.6,
                  delay: rowIdx * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 py-7 border-b border-white/[0.08] items-center"
              >
                {/* Category Label */}
                <div className="md:col-span-4">
                  <span className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-400 font-medium">
                    {row.category}
                  </span>
                </div>

                {/* Tech Pills Container */}
                <div className="md:col-span-8 flex flex-wrap gap-2.5">
                  {row.items.map((item, itemIdx) => (
                    <TechBadge key={item} label={item} index={itemIdx} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}