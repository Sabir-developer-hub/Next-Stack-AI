import { useState, useRef } from "react";
import { motion } from "framer-motion";

// Import your Next Stack AI logo asset from src/assets (adjust filename/extension if needed)
import logoImage from "../assets/logo.png";

const ABOUT_FEATURES = [
  {
    id: "ai-native",
    title: "AI-native architecture",
    description:
      "We build intelligent systems from the ground up—embedding model evaluation, LLM orchestration, and safety guardrails directly into your core infrastructure.",
    icon: (
      <svg
        className="w-5 h-5 text-[#31E387]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
        />
      </svg>
    ),
  },
  {
    id: "end-to-end",
    title: "End-to-end delivery",
    description:
      "From data pipelines and model fine-tuning to high-throughput API design and deployment, one senior engineering pod owns your entire pipeline.",
    icon: (
      <svg
        className="w-5 h-5 text-[#31E387]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
        />
      </svg>
    ),
  },
  {
    id: "built-to-scale",
    title: "Production-ready scale",
    description:
      "Resilient, cloud-native deployments engineered for low latency, sub-second inference, and seamless enterprise integration without re-architecting.",
    icon: (
      <svg
        className="w-5 h-5 text-[#31E387]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M2.25 15a4.5 4.5 0 004.5 4.5h10.5a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z"
        />
      </svg>
    ),
  },
];

function FeatureCard({ feature, index }) {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: 0.3 + index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative bg-[#0C0D0E]/90 border border-white/[0.08] hover:border-[#31E387]/40 p-6 sm:p-7 rounded-xl transition-all duration-300 hover:-translate-y-1.5 overflow-hidden backdrop-blur-sm"
    >
      {/* Interactive Radial Glow Follows Mouse */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-xl"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(49,227,135,0.12), transparent 80%)`,
        }}
      />

      {/* Top Border Glow Accent */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#31E387]/0 group-hover:via-[#31E387]/50 to-transparent transition-all duration-500" />

      <div className="relative z-10 flex items-start gap-4">
        {/* Icon Container */}
        <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08] group-hover:border-[#31E387]/30 group-hover:bg-[#31E387]/10 transition-all duration-300 shrink-0">
          {feature.icon}
        </div>

        {/* Text */}
        <div className="space-y-2">
          <h3 className="text-base font-medium text-white group-hover:text-[#31E387] transition-colors duration-200">
            {feature.title}
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed font-sans">
            {feature.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="relative bg-[#08090A] text-white py-28 overflow-hidden min-h-screen flex flex-col justify-center border-t border-white/[0.08]">
      
      {/* ──────── Background Watermark Next Stack AI Logo ──────── */}
      <div className="pointer-events-none absolute -right-32 -bottom-32 w-[650px] h-[650px] md:w-[750px] md:h-[750px] opacity-15 select-none z-0">
        <img
          src={logoImage}
          alt=""
          className="w-full h-full object-contain grayscale contrast-200 brightness-[0.35]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 w-full">
        {/* Eyebrow Header Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="font-mono text-xs font-semibold text-[#31E387]">03</span>
          <span className="text-zinc-600 font-mono text-xs">—</span>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-400">
            ABOUT NEXT STACK AI
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-medium tracking-tight leading-[1.05] text-white mb-10 max-w-4xl"
        >
          Intelligence <br />
          built to <span className="text-zinc-500 font-normal">work.</span>
        </motion.h2>

        {/* Next Stack AI Content Copy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6 max-w-2xl text-zinc-400 text-base sm:text-lg leading-relaxed font-sans mb-16"
        >
          <p>
            Next Stack AI connects modern software engineering, AI agents, and custom enterprise workflows to help organizations eliminate operational friction and scale autonomous AI systems.
          </p>
          <p className="text-zinc-500 text-sm sm:text-base">
            We don't build disposable prototypes. Every solution delivered by Next Stack AI is engineered for production from line one—fully instrumented, thoroughly evaluated, and built for long-term scalability.
          </p>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-white/[0.08]">
          {ABOUT_FEATURES.map((feature, idx) => (
            <FeatureCard key={feature.id} feature={feature} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}