import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// --- Loader Language Animation ---
const languages = ["Olá", "Hello", "Bonjour", "Ciao", "Hola", "Hallo", "Привет"];
const textElement = document.getElementById("language-text");

if (textElement) {
  let currentIndex = 0;
  textElement.innerText = languages[currentIndex];

  // Change text every 220ms
  const interval = setInterval(() => {
    currentIndex++;
    if (currentIndex >= languages.length) {
      currentIndex = 0;
    }
    textElement.innerText = languages[currentIndex];
  }, 220);

  // --- Main GSAP Timeline ---
  const startAnimation = () => {
    const tl = gsap.timeline();

    // Stop text changing after a delay (e.g. simulated loading)
    setTimeout(() => {
      clearInterval(interval);
      
      // Animate loader text out
      tl.to("#loader-content", {
        opacity: 0,
        y: -50,
        duration: 0.5,
        ease: "power3.in"
      })
      
      // Make main visible so it is revealed behind the transition SVG
      .set("#main", { visibility: "visible" })
      
      // SVG curved transition animation
      // Middle point: short curved arc
      .to("#transition-path", {
        attr: { d: "M 0 0 L 100 0 L 100 80 Q 50 100 0 80 Z" },
        duration: 0.25,
        ease: "power2.in"
      })
      // End point: straight line at top (hidden)
      .to("#transition-path", {
        attr: { d: "M 0 0 L 100 0 L 100 0 Q 50 0 0 0 Z" },
        duration: 0.25,
        ease: "power2.out"
      })
      .set("#loader", { display: "none" }) // completely hide loader wrapper
      
      // Hero element entry animations
      .from("header", { y: -30, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.2")
      .from(".hero-bg img", { scale: 1.1, opacity: 0, filter: "blur(5px)", duration: 1.5, ease: "power3.out" }, "-=0.6")
      .from(".floating-badge", { x: -30, opacity: 0, duration: 1, ease: "power3.out" }, "-=1.2")
      .from(".role-text", { x: 30, opacity: 0, duration: 1, ease: "power3.out" }, "-=1.2")
      .from(".marquee", { y: 50, opacity: 0, duration: 1, ease: "power3.out" }, "-=1");
      
    }, 2000); // 2 seconds delay
  };

  const updateFooterSpacer = () => {
    const footer = document.getElementById("contact");
    const main = document.getElementById("main");
    if (footer && main) {
      main.style.marginBottom = `${footer.offsetHeight}px`;
    }
  };
  
  window.addEventListener("resize", updateFooterSpacer);
  setTimeout(updateFooterSpacer, 500); // Set initial margin

  if (document.readyState !== 'loading') {
    startAnimation();
  } else {
    window.addEventListener('load', startAnimation);
  }
}

// --- Marquee Continuous Animation ---
gsap.to(".marquee-inner", {
  xPercent: -50,
  ease: "none",
  duration: 15,
  repeat: -1
});
