import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const REVIEWS = [
  {
    id: "arcadia-bank",
    quote:
      "“Next Stack AI didn’t sell us a pilot. They shipped an agent that now handles most of our tier-one volume — with evals our compliance team actually signed off on.”",
    author: "Dana Whitfield",
    role: "VP Operations, Arcadia Bank",
  },
  {
    id: "nexus-health",
    quote:
      "“Their team integrated directly into our infrastructure within days. The level of engineering discipline and speed of shipping production AI is unmatched.”",
    author: "Marcus Vance",
    role: "Chief Technology Officer, NexusHealth",
  },
  {
    id: "strata-cloud",
    quote:
      "“Next Stack AI reduced our workflow latency by 85% while keeping model costs predictable. They are our go-to partner for all autonomous systems.”",
    author: "Elena Rostova",
    role: "Head of Infrastructure, Strata Cloud",
  },
];

export default function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  const currentReview = REVIEWS[currentIndex];

  return (
    <section className="relative bg-[#08090A] text-white py-32 overflow-hidden border-t border-white/[0.08]">
      <div className="max-w-5xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Eyebrow Label */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#31E387]">
            CLIENT PERSPECTIVE
          </span>
        </motion.div>

        {/* Dynamic Animated Quote & Author */}
        <div className="min-h-[220px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentReview.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Main Display Quote */}
              <blockquote className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-medium tracking-tight leading-[1.25] text-white max-w-3xl mb-12 font-sans">
                {currentReview.quote}
              </blockquote>

              {/* Client Info Card & Interactive Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-4">
                <div
                  onClick={nextReview}
                  className="group inline-flex items-center gap-4 cursor-pointer select-none"
                >
                  {/* Subtle Dark Avatar Block */}
                  <div className="w-12 h-12 bg-zinc-900/90 border border-white/10 group-hover:border-[#31E387]/40 rounded-sm relative overflow-hidden transition-colors duration-300 flex items-center justify-center shrink-0">
                    <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:6px_6px] opacity-10" />
                    <span className="font-mono text-xs text-zinc-500 group-hover:text-[#31E387] transition-colors">
                      {currentReview.author.charAt(0)}
                    </span>
                  </div>

                  {/* Name and Designation */}
                  <div>
                    <h4 className="text-sm font-medium text-white group-hover:text-[#31E387] transition-colors duration-200">
                      {currentReview.author}
                    </h4>
                    <p className="text-xs text-zinc-500 font-sans mt-0.5">
                      {currentReview.role}
                    </p>
                  </div>
                </div>

                {/* Carousel Navigation Buttons */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={prevReview}
                    aria-label="Previous Perspective"
                    className="w-10 h-10 rounded-sm border border-white/10 bg-white/[0.02] hover:bg-white/[0.08] hover:border-[#31E387]/40 flex items-center justify-center text-zinc-400 hover:text-white transition-all duration-200"
                  >
                    ←
                  </button>
                  <button
                    onClick={nextReview}
                    aria-label="Next Perspective"
                    className="w-10 h-10 rounded-sm border border-white/10 bg-white/[0.02] hover:bg-white/[0.08] hover:border-[#31E387]/40 flex items-center justify-center text-zinc-400 hover:text-white transition-all duration-200"
                  >
                    →
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}