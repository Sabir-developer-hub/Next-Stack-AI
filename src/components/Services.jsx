import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = ["All", "AI", "Engineering", "Data", "Advisory"];

const SERVICES_DATA = [
  {
    id: "01",
    category: "AI",
    title: "AI Agents & Automation",
    description:
      "Autonomous agents that execute multi-step work across your tools — with guardrails, approvals and full audit trails.",
    metricValue: "71%",
    metricLabel: "TICKETS AUTO-RESOLVED",
    colSpan: "lg:col-span-7",
    typicalEngagement: "Pod of 3–6 senior engineers · 8–16 weeks",
    deliverables: [
      "Support, ops & back-office automated agents",
      "Function & tool-calling over custom business APIs",
      "Human-in-the-loop validation & approval controls",
      "Comprehensive evals, LLM tracing & token cost monitoring",
    ],
    stack: ["LangGraph", "OpenAI", "Anthropic", "Temporal", "Python"],
  },
  {
    id: "02",
    category: "AI",
    title: "LLM Apps & RAG",
    description:
      "Knowledge assistants and copilots grounded in your data, with retrieval accuracy you can quantify and measure.",
    metricValue: "0.94",
    metricLabel: "ANSWER FAITHFULNESS",
    colSpan: "lg:col-span-5",
    typicalEngagement: "Pod of 2–4 senior engineers · 6–12 weeks",
    deliverables: [
      "Hybrid vector & keyword database search architecture",
      "Reranking & contextual prompt compression",
      "Real-time hallucination detection and policy guardrails",
      "Automated evaluation benchmarking dashboards",
    ],
    stack: ["Pinecone", "LlamaIndex", "LangChain", "Qdrant", "FastAPI"],
  },
  {
    id: "03",
    category: "Engineering",
    title: "Full-Stack Product Engineering",
    description:
      "Web and mobile applications built by senior engineering teams — from first commit to production scale.",
    metricValue: "6 wks",
    metricLabel: "TO FIRST PRODUCTION RELEASE",
    colSpan: "lg:col-span-5",
    typicalEngagement: "Pod of 3–5 senior engineers · 12+ weeks",
    deliverables: [
      "High-performance Next.js & React web applications",
      "Edge-ready serverless API architecture and DB schemas",
      "Real-time WebSocket & offline-first data sync engines",
      "Accessible design system & component library implementation",
    ],
    stack: ["React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS"],
  },
  {
    id: "04",
    category: "Data",
    title: "Data Platforms & MLOps",
    description:
      "The robust pipelines, data warehouses, and model infrastructure that make AI dependable in production environments.",
    metricValue: "-38%",
    metricLabel: "INFERENCE SPEND",
    colSpan: "lg:col-span-7",
    typicalEngagement: "Pod of 2–3 data engineers · 8–14 weeks",
    deliverables: [
      "Real-time ETL data ingestion & streaming pipelines",
      "Fine-tuning workflows & synthetic dataset preparation",
      "Model latency monitoring & prompt drift detection",
      "PII data privacy masking & governance middleware",
    ],
    stack: ["Python", "Apache Spark", "PostgreSQL", "Snowflake", "dbt"],
  },
  {
    id: "05",
    category: "Engineering",
    title: "Cloud & DevOps",
    description:
      "Secure, observable infrastructure as code — engineered specifically for high uptime, auditability, and speed.",
    metricValue: "99.98%",
    metricLabel: "PLATFORM UPTIME",
    colSpan: "lg:col-span-6",
    typicalEngagement: "Pod of 2 DevOps specialists · 4–8 weeks",
    deliverables: [
      "Declarative Infrastructure as Code (Terraform / Pulumi)",
      "Zero-downtime CI/CD deployment pipelines",
      "SOC2-compliant audit logging & full system observability",
      "Auto-scaling Kubernetes / AWS serverless clusters",
    ],
    stack: ["AWS", "Docker", "Kubernetes", "Terraform", "Datadog"],
  },
  {
    id: "06",
    category: "Advisory",
    title: "AI Strategy & Readiness",
    description:
      "A clear, costed roadmap defining which AI use cases to build, buy, or skip — and exactly how to measure success.",
    metricValue: "2 wks",
    metricLabel: "TO A COSTED ROADMAP",
    colSpan: "lg:col-span-6",
    typicalEngagement: "Principal Advisor & Lead Architect · 2–4 weeks",
    deliverables: [
      "Architecture & infrastructure security readiness audits",
      "Prompt injection & data vulnerability exposure testing",
      "ROI estimation & third-party AI vendor benchmarking",
      "Engineering team enablement & architecture pairing sessions",
    ],
    stack: ["Architecture", "Security", "Compliance", "Strategy"],
  },
];

function ServiceCard({ service, onSelect, index }) {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Track cursor position inside card bounds for radial spotlight effect
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: (index % 2) * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`${service.colSpan} col-span-1`}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onSelect(service)}
        className="group relative cursor-pointer flex flex-col justify-between h-full bg-[#0C0D0E] border border-white/[0.08] p-8 sm:p-10 transition-colors duration-300 hover:border-white/20 overflow-hidden min-h-[340px]"
      >
        {/* Dynamic Interactive Mouse Spotlight Glow */}
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(550px circle at ${mousePos.x}px ${mousePos.y}px, rgba(49, 227, 135, 0.08), transparent 80%)`,
          }}
        />

        {/* Top Header Information */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <span className="font-mono text-xs text-zinc-500 tracking-widest uppercase">
              {service.id} / {service.category}
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(service);
              }}
              className="w-8 h-8 flex items-center justify-center bg-white/[0.03] border border-white/[0.08] text-zinc-400 group-hover:text-white group-hover:bg-white/[0.08] group-hover:border-white/30 transition-all rounded-sm"
              aria-label={`View details for ${service.title}`}
            >
              <span className="text-sm font-mono leading-none">+</span>
            </button>
          </div>

          <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-white mb-3 group-hover:text-zinc-100 transition-colors">
            {service.title}
          </h3>

          <p className="text-sm text-zinc-400 leading-relaxed font-sans max-w-lg">
            {service.description}
          </p>
        </div>

        {/* Bottom Metrics and Action CTA */}
        <div className="pt-10 mt-8 border-t border-white/[0.06] flex items-end justify-between gap-4">
          <div>
            <div className="text-2xl sm:text-3xl font-mono font-semibold text-white tracking-tight">
              {service.metricValue}
            </div>
            <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-1">
              {service.metricLabel}
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 text-xs font-sans text-zinc-400 group-hover:text-[#31E387] transition-colors whitespace-nowrap">
            <span>View details</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedService, setSelectedService] = useState(null);

  // Filter services based on category tab selection
  const filteredServices =
    activeCategory === "All"
      ? SERVICES_DATA
      : SERVICES_DATA.filter((s) => s.category === activeCategory);

  // Drawer Next/Prev navigation
  const handleNext = () => {
    if (!selectedService) return;
    const currentIndex = SERVICES_DATA.findIndex(
      (s) => s.id === selectedService.id
    );
    const nextIndex = (currentIndex + 1) % SERVICES_DATA.length;
    setSelectedService(SERVICES_DATA[nextIndex]);
  };

  const handlePrev = () => {
    if (!selectedService) return;
    const currentIndex = SERVICES_DATA.findIndex(
      (s) => s.id === selectedService.id
    );
    const prevIndex =
      (currentIndex - 1 + SERVICES_DATA.length) % SERVICES_DATA.length;
    setSelectedService(SERVICES_DATA[prevIndex]);
  };

  // Keyboard navigation for drawer (Escape to close, Arrow keys to navigate)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedService) return;
      if (e.key === "Escape") setSelectedService(null);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedService]);

  return (
    <section id="services" className="relative bg-[#08090A] py-24 sm:py-32 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          {/* Top Title Block */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-12">
            {/* Left Side: Eyebrow Tag + Main Heading */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-xs font-semibold text-[#31E387]">
                  01
                </span>
                <span className="text-zinc-600 font-mono text-xs">—</span>
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-400">
                  SERVICES
                </span>
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-[-0.04em] leading-[1.1] text-white">
                One partner for <br />
                the <span className="text-zinc-400">entire AI stack.</span>
              </h2>
            </div>

            {/* Right Side: Description Paragraph */}
            <div className="lg:col-span-5 lg:pb-2">
              <p className="text-base text-zinc-400 leading-relaxed font-sans max-w-md lg:ml-auto">
                From strategy to the infrastructure that runs it. Each
                engagement is staffed by a senior pod that owns outcomes
                end-to-end.
              </p>
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-8 border-b border-white/[0.08] pb-4 overflow-x-auto scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative pb-2 text-sm font-sans tracking-wide transition-colors whitespace-nowrap ${
                    isActive
                      ? "text-white font-medium"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {cat}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabLine"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#31E387] shadow-[0_0_10px_#31E387]"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>

        {}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {filteredServices.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              onSelect={(item) => setSelectedService(item)}
            />
          ))}
        </div>
      </div>

      {}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Background Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />

            {/* Slide-Over Side Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
              className="relative w-full max-w-xl h-full bg-[#090A0B] border-l border-white/10 flex flex-col justify-between overflow-y-auto z-10 shadow-2xl"
            >
              <div>
                {/* Drawer Sticky Top Header */}
                <div className="sticky top-0 z-20 bg-[#090A0B]/90 backdrop-blur-md flex items-center justify-between p-6 border-b border-white/[0.08]">
                  <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
                    {selectedService.id} / {selectedService.category}
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="p-2 text-zinc-400 hover:text-white border border-white/10 hover:border-white/20 text-xs font-mono transition-colors"
                      aria-label="Previous service"
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="p-2 text-zinc-400 hover:text-white border border-white/10 hover:border-white/20 text-xs font-mono transition-colors"
                      aria-label="Next service"
                    >
                      →
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedService(null)}
                      className="p-2 text-zinc-400 hover:text-white border border-white/10 hover:border-white/20 text-xs font-mono ml-2 transition-colors"
                      aria-label="Close drawer"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {/* Drawer Detailed Content Body */}
                <div className="p-8 space-y-8">
                  <div>
                    <h3 className="text-3xl font-medium tracking-tight text-white mb-4">
                      {selectedService.title}
                    </h3>
                    <p className="text-sm text-zinc-400 leading-relaxed font-sans">
                      {selectedService.description}
                    </p>
                  </div>

                  {/* Key Metric & Engagement Box */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 bg-white/[0.02] border border-white/[0.06]">
                    <div>
                      <div className="text-3xl font-mono font-semibold text-[#31E387]">
                        {selectedService.metricValue}
                      </div>
                      <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mt-1">
                        {selectedService.metricLabel}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1">
                        TYPICAL ENGAGEMENT
                      </div>
                      <div className="text-xs font-sans text-zinc-200">
                        {selectedService.typicalEngagement}
                      </div>
                    </div>
                  </div>

                  {/* Deliverables Checklist */}
                  <div>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-4">
                      WHAT WE DELIVER
                    </span>
                    <ul className="space-y-3">
                      {selectedService.deliverables.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-sm text-zinc-300 font-sans border-b border-white/[0.04] pb-3"
                        >
                          <span className="font-mono text-xs text-[#31E387] mt-0.5">
                            0{idx + 1}
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technology Stack Badges */}
                  {selectedService.stack && (
                    <div>
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-3">
                        TYPICAL TECH STACK
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {selectedService.stack.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 text-xs font-mono bg-white/[0.03] border border-white/[0.08] text-zinc-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Drawer Bottom Sticky Action CTA */}
              <div className="sticky bottom-0 p-6 border-t border-white/[0.08] bg-[#090A0B]">
                <a
                  href="#book"
                  onClick={() => setSelectedService(null)}
                  className="w-full flex items-center justify-between bg-[#31E387] px-6 py-4 text-sm font-semibold text-black hover:bg-[#42f197] transition-all shadow-[0_0_20px_rgba(49,227,135,0.2)]"
                >
                  <span>Scope an AI project</span>
                  <span>→</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}