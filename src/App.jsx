import { useState } from 'react'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import TrustedBy from './components/TrustedBy'
import Services from './components/Services'


import { useEffect } from "react";
import Lenis from "lenis";
import StatsSection from './components/Stats'
import ProcessSection from './components/Process'
import AboutSection from './components/About'
import StackSection from './components/Stack'
import ReviewsSection from './components/Reviews'
import FAQSection from './components/FAQ'
import ContactSection from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, // Scroll speed/duration multiplier
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth exponential curve
      smoothWheel: true,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <>
    <Navbar/>
    <Hero/>
    <TrustedBy/>
    <Services/>
    <StatsSection/>
    <ProcessSection/>
    <StackSection/>
    <AboutSection/>
    <ReviewsSection/>
    <FAQSection/>
    <ContactSection/>
    <Footer/>
    </>
  )
}

// function App() {

//   return (
//     <>
//     <Navbar/>
//     <Hero/>
//     <TrustedBy/>
//     <Services/>
//     </>
//   )
// }

// export default App
