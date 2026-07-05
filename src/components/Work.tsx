import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/Work.css";
import WorkImage from "./WorkImage";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Ayusetu",
    category: "Blockchain Herbal Supply Chain System",
    tools: "Blockchain, Ethereum, Smart Contracts, Supply Chain Tracking",
    image: "/ayusetu ss.png",
    link: "#",
  },
  {
    title: "Chatgram",
    category: "Social Media Web Application",
    tools: "React, Node.js, WebSockets, Real-time Chat, MongoDB",
    image: "/chatgram ss.png",
    link: "#",
  },
  {
    title: "Snapcart",
    category: "E-Commerce Website",
    tools: "HTML, CSS, JavaScript, Django, Product Catalog, Cart system",
    image: "/snapcart ss.png",
    link: "#",
  },
  {
    title: "Placement Portal",
    category: "AI Powered Campus Placement Portal",
    tools: "Python, Django, ML Recommendation, Resume Parser, React",
    image: "/placement ss.png",
    link: "#",
  },
];

const Work = () => {
  useEffect(() => {
    const cards = gsap.utils.toArray(".work-card-pin") as HTMLElement[];
    const ctx = gsap.context(() => {
      cards.forEach((card, index) => {
        const content = card.querySelector(".work-card-content");
        const nextCard = cards[index + 1];

        // Stacking card parallax: scale down and fade preceding cards as next card scrolls over them
        // Only run on desktop screens where stacking is active (position: sticky)
        if (nextCard && content) {
          gsap.to(content, {
            scrollTrigger: {
              trigger: nextCard,
              start: "top 95%",
              end: "top calc(50vh - 250px)",
              scrub: true,
              invalidateOnRefresh: true,
            },
            scale: 0.92,
            opacity: 0.6,
            ease: "none",
          });
        }

        // Image translation parallax inside the cards
        const img = card.querySelector(".work-image img");
        if (img) {
          gsap.fromTo(
            img,
            { yPercent: -8 },
            {
              yPercent: 8,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
                invalidateOnRefresh: true,
              },
            }
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          Featured <span>Work</span>
        </h2>

        <div className="work-cards-list">
          {projects.map((project, index) => (
            <div
              className="work-card-pin"
              key={index}
              style={{
                top: "calc(50vh - 250px)",
                zIndex: index + 1,
              }}
            >
              <div className="work-card-content">
                <div className="work-card-info">
                  <div className="work-card-number">
                    <h3>0{index + 1}</h3>
                  </div>
                  <div className="work-card-details">
                    <h4>{project.title}</h4>
                    <p className="work-card-category">{project.category}</p>
                    <div className="work-card-tools">
                      <span className="work-tools-label">Tools & Features</span>
                      <p>{project.tools}</p>
                    </div>
                  </div>
                </div>
                <div className="work-card-image-wrapper">
                  <WorkImage
                    image={project.image}
                    alt={project.title}
                    link={project.link}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
