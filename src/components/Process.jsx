import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const PROCESS_STEPS = [
  {
    id: "01",
    timeframe: "Week 1-2",
    title: "Discover",
    description:
      "Two-week sprint with your stakeholders. We map workflows, audit data, and rank use cases by value, feasibility and risk.",
    deliverables: "Costed roadmap · success metrics",
    activeLabel: "DISCOVER · WEEK 1-2",
  },
  {
    id: "02",
    timeframe: "Week 3-5",
    title: "Prototype",
    description:
      "A working slice against real data — not slides. We set up evals from day one so quality is measured, not argued about.",
    deliverables: "Live prototype · eval harness",
    activeLabel: "PROTOTYPE · WEEK 3-5",
  },
  {
    id: "03",
    timeframe: "Week 6-14",
    title: "Build",
    description:
      "Senior pods ship in weekly increments with security reviews, observability and CI/CD baked in.",
    deliverables: "Production release · runbooks",
    activeLabel: "BUILD · WEEK 6-14",
  },
  {
    id: "04",
    timeframe: "Ongoing",
    title: "Operate",
    description:
      "We monitor, retrain and optimise cost and latency — or hand over to your team with full documentation and training.",
    deliverables: "SLAs · observability · handover",
    activeLabel: "OPERATE · ONGOING",
  },
];

export default function ProcessSection() {
  const containerRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  // Track vertical scroll progress across the process section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth scroll progress spring
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Update active step number on scroll
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const stepIndex = Math.min(
        Math.floor(latest * PROCESS_STEPS.length),
        PROCESS_STEPS.length - 1
      );
      setActiveStep(Math.max(0, stepIndex));
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <section
        id="process"
      ref={containerRef}
      className="relative bg-[#08090A] text-white py-24 border-t border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* ───────── Left Sticky Header Panel (Stays in view with scroll) ───────── */}
          <div className="lg:col-span-5 self-start sticky top-28 py-4 z-20">
            {/* Section Badge & Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-semibold text-[#31E387]">
                  02
                </span>
                <span className="text-zinc-600 font-mono text-xs">—</span>
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-400">
                  PROCESS
                </span>
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-[-0.04em] leading-[1.1] text-white">
                From idea to <br />
                <span className="text-zinc-400">production in</span> <br />
                weeks.
              </h2>

              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-sans max-w-sm">
                A delivery model refined across 120+ launches. Fixed
                milestones, transparent progress, no black boxes.
              </p>
            </motion.div>

            {/* Dynamic Active Step Indicator (Updates on scroll) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-12 pt-8 border-t border-white/[0.08]"
            >
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-6xl sm:text-7xl font-mono font-medium tracking-tight text-white">
                  {PROCESS_STEPS[activeStep].id}
                </span>
                <span className="text-xs font-mono text-zinc-500">/ 04</span>
              </div>

              {/* Glowing Green Progress Line */}
              <div className="w-full max-w-[200px] h-[2px] bg-white/[0.1] relative overflow-hidden mb-3">
                <motion.div
                  className="absolute top-0 left-0 bottom-0 bg-[#31E387] shadow-[0_0_8px_#31E387]"
                  animate={{
                    width: `${((activeStep + 1) / PROCESS_STEPS.length) * 100}%`,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400">
                {PROCESS_STEPS[activeStep].activeLabel}
              </span>
            </motion.div>
          </div>

          {/* ───────── Right Cards List & Glowing Line Timeline ───────── */}
          <div className="lg:col-span-7 relative flex gap-8">
            
            {/* Animated Glowing Vertical Line */}
            <div className="relative flex flex-col items-center">
              {/* Dark Background Line Track */}
              <div className="absolute top-0 bottom-0 w-[2px] bg-white/[0.08]" />

              {/* Glowing Green Filled Scroll Line */}
              <motion.div
                style={{ scaleY, transformOrigin: "top" }}
                className="absolute top-0 bottom-0 w-[2px] bg-[#31E387] shadow-[0_0_12px_#31E387]"
              />

              {/* Step Node Indicators */}
              <div className="flex flex-col justify-between h-full z-10 w-full items-center py-12">
                {PROCESS_STEPS.map((_, idx) => {
                  const isActive = idx <= activeStep;
                  return (
                    <motion.div
                      key={idx}
                      animate={{
                        backgroundColor: isActive ? "#31E387" : "#0D0E10",
                        borderColor: isActive ? "#31E387" : "rgba(255,255,255,0.2)",
                        boxShadow: isActive ? "0 0 10px #31E387" : "none",
                      }}
                      transition={{ duration: 0.3 }}
                      className="w-3 h-3 border my-32 first:mt-4 last:mb-4"
                    />
                  );
                })}
              </div>
            </div>

            {/* Cards Column */}
            <div className="flex-1 space-y-24 py-4">
              {PROCESS_STEPS.map((step, idx) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.6,
                    delay: idx * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`group relative bg-[#0C0D0E] border p-8 sm:p-10 transition-all duration-300 ${
                    idx === activeStep
                      ? "border-white/[0.22] shadow-[0_0_30px_rgba(49,227,135,0.03)]"
                      : "border-white/[0.08] hover:border-white/[0.14]"
                  }`}
                >
                  {/* Step Header */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
                      {step.id}
                    </span>
                    <span className="font-mono text-xs text-zinc-400 bg-white/[0.03] border border-white/[0.08] px-2.5 py-1">
                      {step.timeframe}
                    </span>
                  </div>

                  {/* Step Title */}
                  <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-white mb-4 group-hover:text-[#31E387] transition-colors">
                    {step.title}
                  </h3>

                  {/* Step Description */}
                  <p className="text-sm text-zinc-400 leading-relaxed font-sans mb-8">
                    {step.description}
                  </p>

                  {/* Step Deliverables */}
                  <div className="pt-6 border-t border-white/[0.06] flex items-center gap-2 font-mono text-xs text-zinc-400">
                    <span className="text-[#31E387]">→</span>
                    <span className="text-zinc-300">{step.deliverables}</span>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}