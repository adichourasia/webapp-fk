import { useState } from "react";
import Marquee from "react-fast-marquee";
import "./styles/Achievements.css";

const certificates = [
  { id: 1, path: "/1.jpeg", name: "Certificate 1" },
  { id: 2, path: "/2.jpeg", name: "Certificate 2" },
  { id: 3, path: "/3.png", name: "Certificate 3" },
  { id: 4, path: "/4.png", name: "Certificate 4" },
  { id: 5, path: "/5.png", name: "Certificate 5" },
  { id: 6, path: "/6.jpeg", name: "Certificate 6" },
  { id: 7, path: "/7.jpeg", name: "Certificate 7" },
  { id: 8, path: "/8.jpeg", name: "Certificate 8" },
  { id: 9, path: "/9.jpeg", name: "Certificate 9" },
  { id: 10, path: "/10.jpeg", name: "Certificate 10" },
  { id: 11, path: "/11.jpeg", name: "Certificate 11" },
  { id: 12, path: "/12.jpeg", name: "Certificate 12" },
  { id: 13, path: "/13.jpeg", name: "Certificate 13" },
  { id: 14, path: "/14.jpeg", name: "Certificate 14" },
];

const Achievements = () => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div 
      className="achievements-section" 
      id="achievements" 
      onClick={() => setIsPaused(false)}
    >
      <div className="achievements-container section-container">
        <div className="achievements-header">
          <h2>
            My <span>Achievements</span>
          </h2>
        </div>
        
        <div className="achievements-marquee-container">
          <Marquee 
            speed={75} 
            direction="left" 
            play={!isPaused}
            pauseOnHover={true} 
            gradient={true} 
            gradientColor="black"
            gradientWidth={100}
          >
            {certificates.map((cert) => (
              <div 
                className="certificate-card" 
                key={cert.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPaused(true);
                }}
              >
                <div className={`certificate-img-wrapper ${cert.id === 2 ? "rotate-left" : ""}`}>
                  <img src={cert.path} alt={cert.name} loading="lazy" />
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
