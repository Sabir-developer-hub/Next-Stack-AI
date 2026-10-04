import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import logoImg from "../assets/logo.png"; // Adjust path if needed

const NAV_ITEMS = [
  { label: "Services", href: "services" },
  { label: "Process", href: "process" },
  { label: "Work", href: "work" },
  { label: "About", href: "about" },
  { label: "FAQ", href: "faq" },
];

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const lastScrollY = useRef(0);

  // Top Scroll Progress Line Hook
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Scroll Direction & Threshold Logic
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;

      setIsAtTop(currentScrollY < 20);

      if (Math.abs(delta) > 10) {
        if (delta > 0 && currentScrollY > 120) {
          setIsVisible(false); // Scroll Down -> Hide
        } else if (delta < 0) {
          setIsVisible(true); // Scroll Up -> Show
        }
        lastScrollY.current = currentScrollY;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer to highlight active link on scroll
  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: "-20% 0px -60% 0px",
    });

    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Handler for smooth navigation click
  const handleNavClick = (id) => {
    setActiveSection(id);
    setMobileMenuOpen(false);

    const targetEl = document.getElementById(id);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      console.warn(`Section with id="${id}" not found on page.`);
    }
  };

  return (
    <>
      {/* ───────── Top Progress Line ───────── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-[#31E387] z-[60] origin-left shadow-[0_0_12px_#31E387]"
        style={{ scaleX }}
      />

      {/* ───────── Navbar Container ───────── */}
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : "-100%" }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isAtTop
            ? "bg-transparent border-b border-transparent py-7 lg:py-8"
            : "bg-[#08090A]/90 backdrop-blur-md border-b border-white/[0.08] py-4 lg:py-5 shadow-2xl"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          
          {/* ───────── Logo Image ───────── */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-3 bg-transparent border-none p-0 cursor-pointer text-left"
          >
            <img
              src={logoImg}
              alt="Next Stack AI Logo"
              className="h-9 sm:h-11 w-auto object-contain transition-transform duration-200 hover:scale-[1.02]"
            />
            <h1 className="text-xl font-bold tracking-tight text-white">
              <span className="bg-gradient-to-b from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
                Next Stack{" "}
              </span>
              <span className="text-[#31E387]">AI</span>
            </h1>
          </button>

          {/* ───────── Desktop Center Nav Items ───────── */}
          <nav className="hidden md:flex items-center gap-10">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href;

              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className={`relative text-sm tracking-wide transition-colors duration-200 py-1 font-medium bg-transparent border-none cursor-pointer ${
                    isActive
                      ? "text-white"
                      : "text-zinc-400 hover:text-zinc-100"
                  }`}
                >
                  {item.label}

                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-[#31E387] rounded-full shadow-[0_0_10px_#31E387]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* ───────── CTA Button ───────── */}
          <div className="hidden md:flex items-center">
            <button
              onClick={() => handleNavClick("contact")}
              className="group flex items-center gap-3 bg-[#31E387] px-6 py-3 text-sm font-medium text-black transition-all duration-200 hover:bg-[#42f197] hover:shadow-[0_0_24px_rgba(49,227,135,0.35)] cursor-pointer border-none"
            >
              Book a Call
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </button>
          </div>

          {/* ───────── Mobile Menu Toggle ───────── */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-300 hover:text-white bg-transparent border-none cursor-pointer"
            aria-label="Toggle navigation"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`h-0.5 bg-current transition-all duration-300 ${
                  mobileMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`h-0.5 bg-[#31E387] transition-all duration-300 ${
                  mobileMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-0.5 bg-current transition-all duration-300 ${
                  mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </div>
          </button>
        </div>

        {/* ───────── Mobile Drawer Menu ───────── */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#08090A] border-b border-white/10 px-6 py-8"
            >
              <div className="flex flex-col gap-5">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeSection === item.href;

                  return (
                    <button
                      key={item.label}
                      onClick={() => handleNavClick(item.href)}
                      className={`text-left text-base font-medium transition-colors bg-transparent border-none cursor-pointer p-0 ${
                        isActive
                          ? "text-[#31E387] font-semibold"
                          : "text-zinc-300 hover:text-[#31E387]"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}

                <div className="pt-4 border-t border-white/10">
                  <button
                    onClick={() => handleNavClick("contact")}
                    className="block w-full bg-[#31E387] text-black text-center py-3.5 text-sm font-medium border-none cursor-pointer"
                  >
                    Start a project →
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}