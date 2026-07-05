import { PropsWithChildren, useEffect, useState } from "react";
import "./styles/Landing.css";

const roles = [
  "Web Developer",
  "Full Stack Learner",
  "AI Enthusiast",
  "Programming Learner",
  "CSE Student",
];

const Landing = ({ children }: PropsWithChildren) => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const handleDownloadResume = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/Aditya%20Chourasia%20Resume_20260608_230455_0000.pdf");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Aditya Chourasia Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Blob download failed, falling back to open:", err);
      window.open("/Aditya%20Chourasia%20Resume_20260608_230455_0000.pdf", "_blank");
    }
  };

  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              ADITYA
              <br />
              <span>CHOURASIA</span>
            </h1>
            <a
              className="download-resume-btn"
              href="/Aditya%20Chourasia%20Resume_20260608_230455_0000.pdf"
              onClick={handleDownloadResume}
              data-cursor="disable"
            >
              Download Resume
            </a>
          </div>
          <div className="landing-info">
            <h3>I am a</h3>
            <div className="role-flip-container">
              <span key={currentRoleIndex} className="role-flip-box landing-role-text" data-cursor="disable">
                {roles[currentRoleIndex]}
              </span>
            </div>
            <div className="cgpa-badge" data-cursor="disable">
              CGPA: 9.04/10
            </div>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;

