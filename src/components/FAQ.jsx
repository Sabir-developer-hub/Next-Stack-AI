import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    id: "faq-1",
    question: "How fast can Next Stack AI ship a production-ready system?",
    answer:
      "Our standard discovery sprint lasts 2 weeks, with functional prototypes delivered by week 3. Full production deployments typically range from 6 to 14 weeks depending on system complexity and security/compliance requirements.",
  },
  {
    id: "faq-2",
    question: "How do you handle data privacy, compliance, and IP ownership?",
    answer:
      "You retain 100% ownership of all custom code, fine-tuned models, and workflow architecture. We deploy directly into your cloud infrastructure (AWS, GCP, Azure, or on-prem) ensuring zero third-party data retention or leakage.",
  },
  {
    id: "faq-3",
    question: "Are your AI agents model-agnostic?",
    answer:
      "Yes. We design model-agnostic architectures that let you seamlessly switch or benchmark between OpenAI, Anthropic, Llama 3, Mistral, Gemini, or custom fine-tuned open-source models based on latency, cost, and accuracy requirements.",
  },
  {
    id: "faq-4",
    question: "How do you guarantee accuracy and prevent hallucinations?",
    answer:
      "Every system we engineer includes custom automated eval harnesses, guardrails, and automated fallback logic. Quality, edge-case coverage, and compliance are evaluated programmatically before and after deployment.",
  },
  {
    id: "faq-5",
    question: "What happens after launch?",
    answer:
      "We offer ongoing SLA monitoring, continuous fine-tuning, latency optimization, and cost auditing — or we hand off full documentation, runbooks, and training directly to your internal engineering team.",
  },
];

function FAQAccordionItem({ faq, index, isOpen, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`group border transition-all duration-300 rounded-lg overflow-hidden ${
        isOpen
          ? "bg-[#0C0D0E] border-[#31E387]/40 shadow-[0_0_25px_rgba(49,227,135,0.03)]"
          : "bg-[#0A0B0D]/80 border-white/[0.08] hover:border-white/[0.18] hover:bg-[#0C0D0E]"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-6 select-none focus:outline-none"
      >
        <span
          className={`text-base sm:text-lg font-medium transition-colors duration-200 ${
            isOpen
              ? "text-[#31E387]"
              : "text-white group-hover:text-zinc-200"
          }`}
        >
          {faq.question}
        </span>

        {/* Plus / Minus Indicator Badge */}
        <div
          className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 border transition-all duration-300 ${
            isOpen
              ? "bg-[#31E387]/10 border-[#31E387]/40 text-[#31E387] rotate-180"
              : "bg-white/[0.03] border-white/[0.08] text-zinc-400 group-hover:border-white/20 group-hover:text-white"
          }`}
        >
          <svg
            className="w-4 h-4 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20 12H4"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            )}
          </svg>
        </div>
      </button>

      {/* Expandable Content Panel */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="px-6 pb-7 sm:px-7 text-sm sm:text-base text-zinc-400 leading-relaxed font-sans border-t border-white/[0.04] pt-4">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0); // First FAQ open by default

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative bg-[#08090A] text-white py-32 overflow-hidden border-t border-white/[0.08]">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Section Eyebrow Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="font-mono text-xs font-semibold text-[#31E387]">
              06
            </span>
            <span className="text-zinc-600 font-mono text-xs">—</span>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-400">
              FREQUENTLY ASKED QUESTIONS
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-medium tracking-tight text-white mb-4">
            Everything you need <br className="hidden sm:inline" />
            <span className="text-zinc-500 font-normal">to know before starting.</span>
          </h2>

          <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto font-sans">
            Got questions about integrations, security, or delivery timelines? 
            Here are the answers to our most common inquiries.
          </p>
        </motion.div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <FAQAccordionItem
              key={faq.id}
              faq={faq}
              index={idx}
              isOpen={openIndex === idx}
              onToggle={() => handleToggle(idx)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}