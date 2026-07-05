import React, { useState, useRef, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { VscTerminal } from "react-icons/vsc";
import "./styles/TerminalWidget.css";

const GREETING = [
  "Welcome to Aditya's Portfolio CLI v1.0.0",
  "Type 'help' to see a list of available commands.",
  "",
];

const TerminalWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<string[]>(GREETING);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClose = () => setIsOpen(false);
    window.addEventListener("open-chatbot", handleClose);
    return () => window.removeEventListener("open-chatbot", handleClose);
  }, []);

  const toggleOpen = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (nextState) {
      window.dispatchEvent(new CustomEvent("open-terminal"));
    }
  };

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    const cleanCmd = trimmedCmd.toLowerCase();
    const newHistory = [...history, `guest@aditya-portfolio:~$ ${trimmedCmd}`];

    if (!trimmedCmd) {
      setHistory(newHistory);
      return;
    }

    switch (cleanCmd) {
      case "help":
        newHistory.push(
          "Available commands:",
          "  education      - View pursuing degree and schooling info",
          "  techstack      - View programming languages and libraries",
          "  work           - View featured projects list and details",
          "  clubs          - View club UI-UX experience",
          "  codeactivity   - View GitHub code stats overview",
          "  connect        - View contact details (email, links)",
          "  clear          - Clear terminal display screen",
          "  help           - Display this helper guide"
        );
        break;

      case "clear":
        setHistory([]);
        setInputValue("");
        return;

      case "education":
        newHistory.push(
          "🎓 EDUCATION DETAILS:",
          "  - B.Tech in Computer Science & Engineering",
          "    Amity University Chhattisgarh — Pursuing (CGPA: 9.04/10)",
          "  - High Schooling & Primary Schooling",
          "    Pt. R.D. Tiwari Govt. English Medium School",
          "    Scores: 12th Grade (85%) | 10th Grade (92%)"
        );
        break;

      case "techstack":
      case "tech stack":
        newHistory.push(
          "💻 TECHNICAL STACK CONFIGURATION:",
          "  - Programming Languages:",
          "    Python (75%), HTML/CSS (75%), C++ (60%), Java basics (30%)",
          "  - Frameworks & Systems:",
          "    React, Node.js, TypeScript, Django, WebSockets, Three.js, GSAP",
          "  - Databases & Web3:",
          "    Blockchain (Ethereum/Smart Contracts), MongoDB"
        );
        break;

      case "work":
        newHistory.push(
          "🚀 FEATURED WORK LIST:",
          "  1. AYUSETU",
          "     - Category: Blockchain Herbal Supply Chain System",
          "     - Stack: Blockchain, Ethereum, Smart Contracts, Supply Chain",
          "  2. CHATGRAM",
          "     - Category: Social Media Web Application",
          "     - Stack: React, Node.js, WebSockets, MongoDB, Real-time Chat",
          "  3. SNAPCART",
          "     - Category: E-Commerce Website",
          "     - Stack: HTML, CSS, JavaScript, Django, Cart manager",
          "  4. PLACEMENT PORTAL",
          "     - Category: AI Powered Campus Placement Portal",
          "     - Stack: Python, Django, ML Recommendation, Resume Parser, React"
        );
        break;

      case "clubs":
        newHistory.push(
          "👥 CLUB MEMBERSHIP & ACTIVITIES:",
          "  - UI-UX Expert (2024 - 2025)",
          "    Piratage: The Ethical Hacking Club",
          "    Task: Designed user interfaces, wireframes, posters, and assets."
        );
        break;

      case "codeactivity":
      case "code activity":
        newHistory.push(
          "📊 GITHUB CODE STATS OVERVIEW:",
          "  - Repositories : 16+",
          "  - Stars        : 5",
          "  - Commits      : 500",
          "  - Followers    : 10"
        );
        break;

      case "connect":
        newHistory.push(
          "📧 LET'S CONNECT:",
          "  - Email     : adityachourasia716@gmail.com",
          "  - Phone     : +91 8962155878",
          "  - LinkedIn  : https://www.linkedin.com/in/aditya-chourasia-5a4893327",
          "  - GitHub    : https://github.com/adichourasia",
          "  - Instagram : _aditya_chourasia_"
        );
        break;

      default:
        newHistory.push(
          `Command not found: '${trimmedCmd}'.`,
          "Type 'help' for a list of available commands."
        );
    }

    setHistory(newHistory);
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(inputValue);
    }
  };

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        className={`terminal-trigger ${isOpen ? "active" : ""}`}
        onClick={toggleOpen}
        aria-label="Toggle terminal"
        data-cursor="disable"
      >
        {isOpen ? <MdClose /> : <VscTerminal />}
      </button>

      {/* Terminal Window Overlay */}
      {isOpen && (
        <div className="terminal-widget-window" onClick={handleTerminalClick}>
          {/* Header */}
          <div className="terminal-widget-header">
            <div className="terminal-widget-buttons">
              <span className="dot-red"></span>
              <span className="dot-yellow"></span>
              <span className="dot-green"></span>
            </div>
            <div className="terminal-widget-title">guest@aditya-portfolio: ~</div>
            <button
              className="terminal-widget-close"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
              data-cursor="disable"
            >
              <MdClose />
            </button>
          </div>

          {/* Screen Console */}
          <div className="terminal-widget-body" ref={bodyRef}>
            {history.map((line, index) => (
              <div key={index} className="terminal-widget-output-line">
                {line}
              </div>
            ))}

            {/* Input prompt */}
            <div className="terminal-widget-input-row">
              <span className="terminal-widget-prompt">guest@aditya-portfolio:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="terminal-widget-input"
                autoComplete="off"
                autoCapitalize="off"
                spellCheck="false"
              />
              <span className="terminal-widget-cursor-line">
                {inputValue}
                <span className="terminal-widget-blinking-cursor">▋</span>
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TerminalWidget;
