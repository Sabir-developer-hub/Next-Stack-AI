import { motion } from "framer-motion";
import logoImg from "../assets/logo.png"; // Adjust path if needed


const FOOTER_COLUMNS = [
  {
    title: "SERVICES",
    links: [
      { label: "AI Agents", href: "#" },
      { label: "LLM Apps & RAG", href: "#" },
      { label: "Product Engineering", href: "#" },
      { label: "Data & MLOps", href: "#" },
      { label: "Cloud & DevOps", href: "#" },
      { label: "AI Strategy", href: "#" },
    ],
  },
  {
    title: "COMPANY",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Case studies", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Press", href: "#" },
    ],
  },
  {
    title: "RESOURCES",
    links: [
      { label: "Security", href: "#" },
      { label: "Trust center", href: "#" },
      { label: "AI readiness guide", href: "#" },
      { label: "Status", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#08090A] text-white pt-20 pb-10 overflow-hidden border-t border-white/[0.08] font-sans">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Upper Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 pb-16">
          
          {/* Brand Logo & Description */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              
              <span className="font-semibold text-base tracking-tight text-white">
                Next Stack <span className="text-zinc-400 font-normal">AI</span>
              </span>
            </div>

            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-xs pt-1">
              Production-grade AI systems and software, engineered by senior teams.
            </p>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-7 grid grid-cols-3 gap-6 sm:gap-8">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title} className="space-y-4">
                <h4 className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-zinc-500 font-semibold">
                  {col.title}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-xs sm:text-sm text-zinc-300 hover:text-[#31E387] transition-colors duration-200"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        {/* Large "NEXT STACK" Watermark - Perfectly Responsive & Scaled to Container */}
        <div className="pt-4 pb-8 select-none w-full flex justify-center items-center overflow-hidden">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full text-center max-w-full font-bold tracking-tighter text-[#121417] uppercase leading-none text-[clamp(2.5rem,10.5vw,9rem)] whitespace-nowrap block"
          >
            NEXT STACK
          </motion.h1>
        </div>

        {/* Bottom Bar: Copyright & Social Links */}
        <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-zinc-500">
          <div>
            © 2026 Next Stack AI, Inc.
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-zinc-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">Terms</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">GitHub</a>
          </div>
        </div>

      </div>
    </footer>
  );
}