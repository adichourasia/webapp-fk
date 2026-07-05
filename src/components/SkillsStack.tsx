import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/SkillsStack.css";

gsap.registerPlugin(ScrollTrigger);

const skillsData = [
  {
    category: "Programming",
    percentage: 85,
    color: "#ffc703",
    items: [
      { name: "C", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
      { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
      { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" }
    ]
  },
  {
    category: "Web Development",
    percentage: 80,
    color: "#38bdf8",
    items: [
      { name: "HTML5", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS3", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      { name: "Django", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" }
    ]
  },
  {
    category: "Database Management",
    percentage: 75,
    color: "#818cf8",
    items: [
      { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" }
    ]
  },
  {
    category: "Tools & Platforms",
    percentage: 90,
    color: "#fb7185",
    items: [
      { name: "VS Code", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
      { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "GitHub", logo: "https://cdn.simpleicons.org/github/FFFFFF" },
      { name: "GitHub Copilot", logo: "https://cdn.simpleicons.org/githubcopilot/FFFFFF" },
      { name: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
      { name: "Canva", logo: "/canva.png" }
    ]
  },
  {
    category: "Microsoft Office Suite",
    percentage: 95,
    color: "#34d399",
    items: [
      { name: "MS Excel", logo: "/excel.png" },
      { name: "MS Word", logo: "/word.png" },
      { name: "MS PowerPoint", logo: "/powerpoint.png" }
    ]
  }
];

const CircularProgress = ({ percentage, color, active }: { percentage: number; color: string; active: boolean }) => {
  const radius = 60;
  const stroke = 6;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - ((active ? percentage : 0) / 100) * circumference;

  return (
    <div className="skills-circle-container">
      <svg height={radius * 2} width={radius * 2} className="skills-svg">
        <circle
          stroke="rgba(255, 255, 255, 0.05)"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + " " + circumference}
          style={{ strokeDashoffset, transition: "stroke-dashoffset 1.5s cubic-bezier(0.25, 1, 0.5, 1)" }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      <div className="skills-percentage-text" style={{ color }}>
        {percentage}%
      </div>
    </div>
  );
};

const SkillsStack = () => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Intersection observer for circular progress animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  // GSAP sticky stacking – mobile only (≤768px)
  useEffect(() => {
    if (window.innerWidth > 768) return;

    const cards = gsap.utils.toArray(".skill-card-pin") as HTMLElement[];
    const ctx = gsap.context(() => {
      cards.forEach((card, index) => {
        const content = card.querySelector(".skill-card");
        const nextCard = cards[index + 1];

        if (nextCard && content) {
          gsap.to(content, {
            scrollTrigger: {
              trigger: nextCard,
              start: "top 95%",
              end: "top calc(50vh - 180px)",
              scrub: true,
              invalidateOnRefresh: true,
            },
            scale: 0.92,
            opacity: 1,
            ease: "none",
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="skills-section" id="techstack" ref={sectionRef}>
      <div className="skills-container section-container">
        <h2>
          My <span>Tech Stack</span>
        </h2>

        {/* Desktop: plain 2-col grid */}
        <div className="skills-grid-desktop">
          {skillsData.map((skill, index) => (
            <div key={index} className="skill-card" data-cursor="disable">
              <CircularProgress percentage={skill.percentage} color={skill.color} active={inView} />
              <div className="skill-info">
                <h3>{skill.category}</h3>
                <div className="skill-logos-row">
                  {skill.items.map((item, i) => (
                    <div
                      className="skill-logo-card"
                      key={i}
                      style={{ "--logo-color": skill.color } as React.CSSProperties}
                    >
                      <img src={item.logo} alt={item.name} loading="lazy" />
                      <span className="logo-name">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: sticky stacking cards */}
        <div className="skills-stack-mobile">
          {skillsData.map((skill, index) => (
            <div
              key={index}
              className="skill-card-pin"
              style={{ top: "calc(50vh - 180px)", zIndex: index + 1 }}
            >
              <div className="skill-card" data-cursor="disable">
                <CircularProgress percentage={skill.percentage} color={skill.color} active={inView} />
                <div className="skill-info">
                  <h3>{skill.category}</h3>
                  <div className="skill-logos-row">
                    {skill.items.map((item, i) => (
                      <div
                        className="skill-logo-card"
                        key={i}
                        style={{ "--logo-color": skill.color } as React.CSSProperties}
                      >
                        <img src={item.logo} alt={item.name} loading="lazy" />
                        <span className="logo-name">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsStack;
