import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import Lenis from "lenis";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollTrigger);
export let lenis: Lenis;

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false, // Let mobile run native GPU accelerated scroll
      touchMultiplier: 1.0,
    });

    // Pause scroll initially until loading finishes
    lenis.stop();

    // Sync Lenis with GSAP ScrollTrigger updates
    lenis.on("scroll", ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);

    gsap.ticker.lagSmoothing(1000, 16); // Handle frame drops gracefully instead of disabling completely

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setMobileMenuOpen(false);
    const section = e.currentTarget.getAttribute("data-href");
    e.preventDefault();
    if (section && lenis) {
      lenis.scrollTo(section, { offset: 0, duration: 1.2 });
    }
  };

  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          AC
        </a>

        {/* Hamburger Menu Icon */}
        <button
          className={`hamburger-menu ${mobileMenuOpen ? "active" : ""}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          data-cursor="disable"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={mobileMenuOpen ? "show" : ""}>
          <li>
            <a data-href="#about" href="#about" onClick={handleLinkClick}>
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#education" href="#education" onClick={handleLinkClick}>
              <HoverLinks text="EDUCATION" />
            </a>
          </li>
          <li>
            <a data-href="#techstack" href="#techstack" onClick={handleLinkClick}>
              <HoverLinks text="TECH STACK" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work" onClick={handleLinkClick}>
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#clubs" href="#clubs" onClick={handleLinkClick}>
              <HoverLinks text="CLUBS" />
            </a>
          </li>
          <li>
            <a data-href="#code-activity" href="#code-activity" onClick={handleLinkClick}>
              <HoverLinks text="CODE ACTIVITY" />
            </a>
          </li>
          <li>
            <a data-href="#achievements" href="#achievements" onClick={handleLinkClick}>
              <HoverLinks text="ACHIEVEMENTS" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact" onClick={handleLinkClick}>
              <HoverLinks text="CONNECT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
