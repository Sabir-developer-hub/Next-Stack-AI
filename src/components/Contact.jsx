import { useState, useRef } from "react";
import { motion } from "framer-motion";

// Service / Interest options from reference image
const INTERESTS = [
  "AI Agents",
  "LLM / RAG",
  "Product build",
  "Data & MLOps",
  "Cloud",
  "Strategy",
];

const BUDGET_OPTIONS = [
  "< $25k",
  "$25k – $50k",
  "$50k – $150k",
  "$150k+",
];

// App/Social Contact Channels
const DIRECT_CONTACT_APPS = [
  {
    name: "Gmail",
    action: "mailto:hello@nextstack.ai",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
      </svg>
    ),
  },
  {
    name: "Slack",
    action: "https://slack.com",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.521A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.527 2.527 0 0 1 2.52-2.52h6.313A2.528 2.528 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
      </svg>
    ),
  },
  {
    name: "Discord",
    action: "https://discord.gg",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
      </svg>
    ),
  },
  {
    name: "Telegram",
    action: "https://t.me",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
      </svg>
    ),
  },
];

export default function ContactSection() {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Selected Interest Pills State
  const [selectedInterests, setSelectedInterests] = useState(["AI Agents"]);

  // Form Fields State
  const [formData, setFormData] = useState({
    fullName: "",
    workEmail: "",
    company: "",
    budget: "$50k – $150k",
    projectDetails: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((item) => item !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative bg-[#08090A] text-white py-32 overflow-hidden border-t border-white/[0.08]"
    >
      {/* Background Interactive Radial Glow */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(49,227,135,0.05), transparent 80%)`,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-start">
          
          {/* ──────── Left Column: Headlines & Direct App Contacts ──────── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div>
              {/* Eyebrow Label */}
              <div className="flex items-center gap-3 mb-8">
                <span className="font-mono text-xs font-semibold text-[#31E387]">07</span>
                <span className="text-zinc-600 font-mono text-xs">—</span>
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-400">
                  GET IN TOUCH
                </span>
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.08] text-white mb-6">
                Let’s build your <br />
                <span className="text-zinc-500 font-normal">next AI stack.</span>
              </h2>

              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-sans mb-10 max-w-md">
                Have a specific project in mind or want to explore how autonomous agents can fit into your workflow? Drop us a message or reach out on your preferred platform.
              </p>
            </div>

            {/* Direct Channel Buttons (Gmail, Slack, Discord, Telegram) */}
            <div className="space-y-4 pt-8 border-t border-white/[0.08]">
              <span className="font-mono text-xs uppercase tracking-wider text-zinc-500 block mb-3">
                DIRECT CONNECT
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {DIRECT_CONTACT_APPS.map((app) => (
                  <a
                    key={app.name}
                    href={app.action}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 px-3 py-2.5 rounded border border-white/[0.1] bg-[#0E1012] hover:bg-[#14171A] hover:border-[#31E387]/50 text-zinc-300 hover:text-[#31E387] transition-all duration-200 text-xs font-mono group"
                  >
                    <span className="text-zinc-400 group-hover:text-[#31E387] transition-colors">
                      {app.icon}
                    </span>
                    <span>{app.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ──────── Right Column: Minimal Form Container ──────── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 bg-[#111215] border border-white/[0.08] p-8 sm:p-10 rounded-sm relative"
          >
            {submitted ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-12 h-12 bg-[#31E387]/10 border border-[#31E387]/40 text-[#31E387] rounded-full flex items-center justify-center mx-auto mb-4 text-xl">
                  ✓
                </div>
                <h3 className="text-xl font-medium text-white">Request Sent</h3>
                <p className="text-zinc-400 text-sm max-w-xs mx-auto font-sans">
                  We’ve received your inquiry. A team engineer will review your requirements and respond shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 font-mono text-xs text-[#31E387] hover:underline uppercase tracking-wider"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* 1. Interest Pills Header */}
                <div className="space-y-3">
                  <label className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400 block">
                    I'M INTERESTED IN
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {INTERESTS.map((interest) => {
                      const isSelected = selectedInterests.includes(interest);
                      return (
                        <button
                          key={interest}
                          type="button"
                          onClick={() => toggleInterest(interest)}
                          className={`text-xs font-sans px-3.5 py-2 rounded-none border transition-all duration-200 select-none ${
                            isSelected
                              ? "border-[#31E387] text-white bg-white/[0.03]"
                              : "border-white/[0.12] text-zinc-400 hover:border-white/30 hover:text-white"
                          }`}
                        >
                          {interest}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Full Name & Work Email Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-2">
                  <div className="space-y-2">
                    <label className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400 block">
                      FULL NAME
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Jane Cooper"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-transparent border-b border-white/20 focus:border-[#31E387] text-sm text-white placeholder-zinc-600 pb-2.5 outline-none transition-colors font-sans"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400 block">
                      WORK EMAIL
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="jane@company.com"
                      value={formData.workEmail}
                      onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                      className="w-full bg-transparent border-b border-white/20 focus:border-[#31E387] text-sm text-white placeholder-zinc-600 pb-2.5 outline-none transition-colors font-sans"
                    />
                  </div>
                </div>

                {/* 3. Company & Budget Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400 block">
                      COMPANY
                    </label>
                    <input
                      type="text"
                      placeholder="Company Inc."
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-transparent border-b border-white/20 focus:border-[#31E387] text-sm text-white placeholder-zinc-600 pb-2.5 outline-none transition-colors font-sans"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400 block">
                      BUDGET
                    </label>
                    <div className="relative">
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full bg-transparent border-b border-white/20 focus:border-[#31E387] text-sm font-semibold text-white pb-2.5 outline-none appearance-none cursor-pointer transition-colors font-sans"
                      >
                        {BUDGET_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} className="bg-[#111215] text-white">
                            {opt}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute right-0 top-1 text-zinc-400 text-xs">
                        ▼
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. Project Details Textarea */}
                <div className="space-y-2">
                  <label className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400 block">
                    PROJECT DETAILS
                  </label>
                  <textarea
                    rows={3}
                    placeholder="What are you trying to achieve?"
                    value={formData.projectDetails}
                    onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                    className="w-full bg-transparent border-b border-white/20 focus:border-[#31E387] text-sm text-white placeholder-zinc-600 pb-2.5 outline-none resize-none transition-colors font-sans"
                  />
                </div>

                {/* 5. Full Width Action Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#31E387] hover:bg-[#2adb7d] text-[#08090A] font-semibold text-sm py-4 rounded-none transition-all duration-200 flex items-center justify-center gap-3 active:scale-[0.99] disabled:opacity-50"
                  >
                    <span>{isSubmitting ? "Sending..." : "Send request"}</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </button>
                </div>

              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}