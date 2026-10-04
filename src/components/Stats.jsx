import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const STATS_DATA = [
  {
    targetNumber: 120,
    suffix: "+",
    decimals: 0,
    label: "Production systems shipped",
  },
  {
    targetNumber: 4.2,
    suffix: "x",
    decimals: 1,
    label: "Median ROI in year one",
  },
  {
    targetNumber: 96,
    suffix: "%",
    decimals: 0,
    label: "Client retention rate",
  },
  {
    targetNumber: 70,
    suffix: "+",
    decimals: 0,
    label: "Senior engineers & ML specialists",
  },
];

// Animated Number Counter Component
function AnimatedCounter({ targetNumber, suffix, decimals, isVisible }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime = null;
    const duration = 2000; // 2 seconds counting duration

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Power-2 ease-out curve for smooth slowing down at the end
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);
      
      const currentVal = easeOutProgress * targetNumber;
      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [isVisible, targetNumber]);

  return (
    <span>
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-[#08090A] border-y border-white/[0.08] py-20 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12" ref={ref}>
        {/* Grid Container with Responsive 1 to 4 Columns */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/[0.08]"
        >
          {STATS_DATA.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 0.6,
                delay: idx * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col justify-center px-8 py-8 lg:first:pl-0 lg:last:pr-0"
            >
              {/* Animated Target Number */}
              <div className="text-5xl sm:text-6xl font-medium font-sans tracking-tight text-white mb-3">
                <AnimatedCounter
                  targetNumber={stat.targetNumber}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                  isVisible={isInView}
                />
              </div>

              {/* Sub-label */}
              <div className="text-xs font-sans text-zinc-400 font-normal">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}