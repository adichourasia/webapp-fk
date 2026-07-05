import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/CodeActivity.css";

gsap.registerPlugin(ScrollTrigger);

const CodeActivity = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate progress bars
      gsap.fromTo(
        ".lang-progress-fill",
        { width: "0%" },
        {
          width: (_, target) => target.getAttribute("data-target") || "0%",
          duration: 1.8,
          ease: "power2.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Blinking caret cursor animation
      gsap.fromTo(
        ".terminal-cursor",
        { opacity: 0 },
        { opacity: 1, repeat: -1, yoyo: true, duration: 0.5, ease: "power1.inOut" }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="code-activity-section" id="code-activity" ref={sectionRef}>
      <div className="code-activity-container section-container">
        <h2>
          Code <span>Activity</span>
        </h2>

        <div className="terminal-grid">
          {/* Panel 1: Stats Overview */}
          <div className="terminal-card stats-terminal">
            <div className="terminal-header">
              <div className="terminal-buttons">
                <span className="btn-close"></span>
                <span className="btn-minimize"></span>
                <span className="btn-maximize"></span>
              </div>
              <div className="terminal-title">bash - git-stats --profile</div>
            </div>
            <div className="terminal-body">
              <div className="terminal-line">
                <span className="terminal-prompt">$</span> git-stats --summary
              </div>
              <div className="terminal-output stats-profile">
                <div className="profile-art">
                  <pre>
{`  ____ ___ _____ 
 / ___|_ _|_   _|
| |  _ | |  | |  
| |_| || |  | |  
 \\____|___| |_|  `}
                  </pre>
                </div>
                <div className="profile-details">
                  <div className="detail-row">
                    <span className="label">Repositories:</span>
                    <span className="value text-highlight">16+</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Stars:</span>
                    <span className="value text-star">5 ★</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Commits:</span>
                    <span className="value text-highlight">500</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Followers:</span>
                    <span className="value">10</span>
                  </div>
                </div>
              </div>
              <div className="terminal-line margin-top">
                <span className="terminal-prompt">$</span> <span className="terminal-cursor">▋</span>
              </div>
            </div>
          </div>

          {/* Panel 2: Languages Configuration Loader */}
          <div className="terminal-card languages-terminal">
            <div className="terminal-header">
              <div className="terminal-buttons">
                <span className="btn-close"></span>
                <span className="btn-minimize"></span>
                <span className="btn-maximize"></span>
              </div>
              <div className="terminal-title">systemd - loading-config.service</div>
            </div>
            <div className="terminal-body">
              <div className="terminal-line">
                <span className="terminal-prompt">$</span> systemctl start loading-config.service
              </div>
              <div className="terminal-output lang-loaders">
                {/* Python */}
                <div className="lang-loader-item">
                  <div className="lang-loader-info">
                    <span className="lang-status">[ OK ]</span>
                    <span className="lang-name">python.config</span>
                    <span className="lang-dots">..................</span>
                    <span className="lang-percentage">[ 75% ]</span>
                  </div>
                  <div className="lang-progress-bar">
                    <div
                      className="lang-progress-fill python-fill"
                      data-target="75%"
                    ></div>
                  </div>
                </div>

                {/* HTML/CSS */}
                <div className="lang-loader-item">
                  <div className="lang-loader-info">
                    <span className="lang-status">[ OK ]</span>
                    <span className="lang-name">html-css.spec</span>
                    <span className="lang-dots">..................</span>
                    <span className="lang-percentage">[ 75% ]</span>
                  </div>
                  <div className="lang-progress-bar">
                    <div
                      className="lang-progress-fill htmlcss-fill"
                      data-target="75%"
                    ></div>
                  </div>
                </div>

                {/* C++ */}
                <div className="lang-loader-item">
                  <div className="lang-loader-info">
                    <span className="lang-status">[ OK ]</span>
                    <span className="lang-name">cpp.env</span>
                    <span className="lang-dots">.....................</span>
                    <span className="lang-percentage">[ 60% ]</span>
                  </div>
                  <div className="lang-progress-bar">
                    <div
                      className="lang-progress-fill cpp-fill"
                      data-target="60%"
                    ></div>
                  </div>
                </div>

                {/* Java */}
                <div className="lang-loader-item">
                  <div className="lang-loader-info">
                    <span className="lang-status">[ OK ]</span>
                    <span className="lang-name">java-basic.lib</span>
                    <span className="lang-dots">..............</span>
                    <span className="lang-percentage">[ 30% ]</span>
                  </div>
                  <div className="lang-progress-bar">
                    <div
                      className="lang-progress-fill java-fill"
                      data-target="30%"
                    ></div>
                  </div>
                </div>
              </div>
              <div className="terminal-line margin-top">
                <span className="terminal-info-text">Task completed. Loading configuration successful.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeActivity;
