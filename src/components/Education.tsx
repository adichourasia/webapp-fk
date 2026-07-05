import { useEffect, useRef } from "react";
import "./styles/Education.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Education = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };

  useEffect(() => {
    if (ScrollTrigger.isTouch) {
      containerRef.current.forEach((container) => {
        if (container) {
          container.classList.remove("edu-noTouch");
          container.addEventListener("click", () => handleClick(container));
        }
      });
    }
    return () => {
      containerRef.current.forEach((container) => {
        if (container) {
          container.removeEventListener("click", () => handleClick(container));
        }
      });
    };
  }, []);

  return (
    <div className="education-section" id="education">
      <div className="edu-box">
        <h2 className="title">
          MY
          <div>
            <span className="edu-h2-span">EDUCATION</span>
          </div>
        </h2>
      </div>
      <div className="edu-box">
        <div className="edu-box-in">
          {/* Vertical dashed line connectors */}
          <div className="edu-border2">
            <svg width="100%">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
              <line
                x1="100%"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
            </svg>
          </div>

          {/* Amity University */}
          <div
            className="edu-content edu-noTouch"
            ref={(el) => setRef(el, 0)}
          >
            <div className="edu-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="edu-corner"></div>
            <div className="edu-content-in">
              <h3>UNIVERSITY</h3>
              <h4>Amity University Chhattisgarh <span className="edu-status-badge">— Pursuing</span></h4>
              <p className="edu-desc">
                Currently pursuing Bachelor of Technology in Computer Science & Engineering (B.Tech CSE). Developing solid foundations in software engineering, algorithms, and web technologies.
              </p>
              <h5>Status & CGPA</h5>
              <div className="edu-tags-flex">
                <div className="edu-tag">Pursuing</div>
                <div className="edu-tag">CGPA: 9.04/10</div>
                <div className="edu-tag">CSE Major</div>
              </div>
              <div className="edu-arrow"></div>
            </div>
          </div>

          {/* 12th Grade */}
          <div
            className="edu-content edu-noTouch"
            ref={(el) => setRef(el, 1)}
          >
            <div className="edu-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="edu-corner"></div>
            <div className="edu-content-in">
              <h3>HIGHER SECONDARY (12th)</h3>
              <h4>Pt. R.D. Tiwari Govt. English Medium School <span className="edu-status-badge">— 85%</span></h4>
              <p className="edu-desc">
                Completed secondary school education with science stream focus. Fostered logic and problem-solving skills.
              </p>
              <h5>Score & Schooling</h5>
              <div className="edu-tags-flex">
                <div className="edu-tag">Score: 85%</div>
                <div className="edu-tag">English Medium</div>
                <div className="edu-tag">Science Stream</div>
              </div>
              <div className="edu-arrow"></div>
            </div>
          </div>

          {/* 10th Grade */}
          <div
            className="edu-content edu-noTouch"
            ref={(el) => setRef(el, 2)}
          >
            <div className="edu-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="edu-corner"></div>
            <div className="edu-content-in">
              <h3>HIGH SCHOOL (10th)</h3>
              <h4>Pt. R.D. Tiwari Govt. English Medium School <span className="edu-status-badge">— 92%</span></h4>
              <p className="edu-desc">
                Completed high school foundation courses. Excelled in mathematics and science subjects.
              </p>
              <h5>Score & Foundation</h5>
              <div className="edu-tags-flex">
                <div className="edu-tag">Score: 92%</div>
                <div className="edu-tag">English Medium</div>
                <div className="edu-tag">Board Exams</div>
              </div>
              <div className="edu-arrow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;

function handleClick(container: HTMLDivElement) {
  container.classList.toggle("edu-content-active");
  container.classList.remove("edu-sibling");
  if (container.parentElement) {
    const siblings = Array.from(container.parentElement.children);
    siblings.forEach((sibling) => {
      if (sibling !== container) {
        sibling.classList.remove("edu-content-active");
        sibling.classList.toggle("edu-sibling");
      }
    });
  }
}
