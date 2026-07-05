import React, { useState, useRef, useEffect } from "react";
import { MdSend, MdClose } from "react-icons/md";
import "./styles/AIChatbot.css";

interface Message {
  sender: "user" | "bot";
  text: string;
}

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Hi! I am Aditya's AI Assistant. 🤖 Ask me anything about Aditya's education, projects, skills, clubs, code activity, or contact info!",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleClose = () => setIsOpen(false);
    window.addEventListener("open-terminal", handleClose);
    return () => window.removeEventListener("open-terminal", handleClose);
  }, []);

  const toggleOpen = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (nextState) {
      window.dispatchEvent(new CustomEvent("open-chatbot"));
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const generateResponse = (input: string): string => {
    const cleanInput = input.toLowerCase().trim();

    // Keyword matching rules
    if (cleanInput.includes("cgpa") || cleanInput.includes("grade") || cleanInput.includes("marks")) {
      return "Aditya has an outstanding CGPA of **9.04/10** in his CSE B.Tech course.";
    }

    if (
      cleanInput.includes("education") ||
      cleanInput.includes("college") ||
      cleanInput.includes("university") ||
      cleanInput.includes("school") ||
      cleanInput.includes("amity")
    ) {
      return "Aditya is pursuing his **B.Tech in Computer Science & Engineering** at **Amity University Chhattisgarh**.\n\nHe completed his schooling at *Pt. R.D. Tiwari Govt. English Medium School*, scoring **85% in 12th** and **92% in 10th**.";
    }

    if (cleanInput.includes("ayusetu") || cleanInput.includes("herbal") || cleanInput.includes("blockchain")) {
      return "**Ayusetu** is a Blockchain-based Herbal Supply Chain System. It tracks supply chain parameters utilizing Ethereum, Smart Contracts, and React. (Tools: Blockchain, Ethereum, Smart Contracts, Supply Chain Tracking)";
    }

    if (cleanInput.includes("chatgram") || cleanInput.includes("chat") || cleanInput.includes("websocket")) {
      return "**Chatgram** is a real-time Social Media Web Application featuring instant messages and notifications. (Tools: React, Node.js, WebSockets, MongoDB, TailwindCSS)";
    }

    if (cleanInput.includes("snapcart") || cleanInput.includes("ecommerce") || cleanInput.includes("shopping")) {
      return "**Snapcart** is an E-Commerce Website with a products list, cart manager, and responsive design. (Tools: HTML, CSS, JavaScript, Django)";
    }

    if (cleanInput.includes("placement") || cleanInput.includes("portal") || cleanInput.includes("resume parser")) {
      return "The **Placement Portal** is an AI-powered Campus Placement Portal. It features machine learning recommendations and a custom PDF resume parser. (Tools: Python, Django, ML Recommendation, Resume Parser, React)";
    }

    if (cleanInput.includes("project") || cleanInput.includes("work") || cleanInput.includes("featured")) {
      return "Aditya has worked on several featured projects:\n\n1. **Ayusetu** — Blockchain supply chain system tracking herbal supplies.\n2. **Chatgram** — Real-time social chat platform using WebSockets.\n3. **Snapcart** — Full-fledged e-commerce platform built on Django.\n4. **Placement Portal** — AI campus recruitment hub with recommendation algorithms.";
    }

    if (
      cleanInput.includes("skill") ||
      cleanInput.includes("language") ||
      cleanInput.includes("python") ||
      cleanInput.includes("cpp") ||
      cleanInput.includes("c++") ||
      cleanInput.includes("java") ||
      cleanInput.includes("react") ||
      cleanInput.includes("typescript")
    ) {
      return "Aditya's technical expertise covers:\n\n- **Languages:** Python (75%), HTML/CSS (75%), C++ (60%), Java basics (30%), JavaScript, TypeScript\n- **Web Stack & Libraries:** React, Node.js, Django, WebSockets, Three.js, React Three Fiber, GSAP\n- **Databases & Tech:** Blockchain (Ethereum/Smart Contracts), MongoDB";
    }

    if (cleanInput.includes("club") || cleanInput.includes("piratage") || cleanInput.includes("hacking") || cleanInput.includes("ui")) {
      return "Aditya served as a **UI-UX Expert** for **Piratage: The Ethical Hacking Club** (2024 - 2025). He designed interfaces, wireframes, posters, and digital assets.";
    }

    if (
      cleanInput.includes("git") ||
      cleanInput.includes("stats") ||
      cleanInput.includes("commit") ||
      cleanInput.includes("repo") ||
      cleanInput.includes("star") ||
      cleanInput.includes("followers")
    ) {
      return "Aditya's GitHub code stats:\n\n- **Repositories:** 16+\n- **Total Stars:** 5\n- **Commits:** 500\n- **Followers:** 10";
    }

    if (
      cleanInput.includes("contact") ||
      cleanInput.includes("email") ||
      cleanInput.includes("phone") ||
      cleanInput.includes("connect") ||
      cleanInput.includes("linkedin") ||
      cleanInput.includes("github") ||
      cleanInput.includes("instagram")
    ) {
      return "You can get in touch with Aditya via:\n\n- 📧 **Email:** adityachourasia716@gmail.com\n- 📞 **Phone:** +91 8962155878\n- 💼 **LinkedIn:** [aditya-chourasia-5a4893327](https://www.linkedin.com/in/aditya-chourasia-5a4893327)\n- 💻 **GitHub:** [adichourasia](https://github.com/adichourasia)\n- 📸 **Instagram:** [_aditya_chourasia_](https://www.instagram.com/_aditya_chourasia_/)";
    }

    if (cleanInput.includes("hello") || cleanInput.includes("hi") || cleanInput.includes("hey")) {
      return "Hello! How can I assist you today? Feel free to ask about Aditya's projects, skills, education, clubs, or contact information!";
    }

    return "I am not sure about that. I can answer questions about Aditya's education, projects, skills, clubs, git stats, and contact details! Try asking: 'Tell me about his projects' or 'What is his CGPA?'";
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text }]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI thinking delay
    setTimeout(() => {
      const response = generateResponse(text);
      setMessages((prev) => [...prev, { sender: "bot", text: response }]);
      setIsTyping(false);
    }, 700);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend(inputValue);
    }
  };

  const suggestionPrompts = [
    "Tell me about his projects",
    "What is Aditya's CGPA?",
    "What are his tech skills?",
    "How can I connect with him?",
  ];

  return (
    <>
      {/* Floating Widget Toggle Trigger */}
      <button
        className={`chatbot-trigger ${isOpen ? "active" : ""}`}
        onClick={toggleOpen}
        aria-label="Toggle chatbot"
        data-cursor="disable"
      >
        {isOpen ? (
          <MdClose className="icon-close" />
        ) : (
          <img src="/ai robot.png" alt="AI Assistant" className="chatbot-logo-img" />
        )}
      </button>

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <img src="/ai robot.png" alt="AI Avatar" className="chatbot-avatar-img" />
              <div className="chatbot-title-container">
                <h4>Aditya's AI Assistant</h4>
                <span className="online-status">
                  <span className="dot"></span> Online
                </span>
              </div>
            </div>
            <button
              className="chatbot-close-btn"
              onClick={() => setIsOpen(false)}
              data-cursor="disable"
            >
              <MdClose />
            </button>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div className={`chatbot-message-row ${msg.sender}`} key={index}>
                <div className="chatbot-message-bubble">
                  {msg.text.split("\n").map((line, lIdx) => {
                    // Basic format
                    return (
                      <p key={lIdx} style={{ margin: "5px 0" }}>
                        {line.split(" ").map((word, wIdx) => {
                          if (word.startsWith("**") && word.endsWith("**")) {
                            return <strong key={wIdx}>{word.replace(/\*\*/g, "")} </strong>;
                          }
                          if (word.startsWith("*") && word.endsWith("*")) {
                            return <em key={wIdx}>{word.replace(/\*/g, "")} </em>;
                          }
                          if (word.includes("https://") || word.includes("mailto:") || word.includes("tel:")) {
                            // Extract URL
                            let cleanUrl = word;
                            let label = word;
                            if (word.includes("[") && word.includes("]")) {
                              const match = /\[(.*?)\]\((.*?)\)/.exec(word);
                              if (match) {
                                label = match[1];
                                cleanUrl = match[2];
                              }
                            }
                            return (
                              <a
                                key={wIdx}
                                href={cleanUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="chat-inline-link"
                              >
                                {label}{" "}
                              </a>
                            );
                          }
                          return word + " ";
                        })}
                      </p>
                    );
                  })}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="chatbot-message-row bot typing">
                <div className="chatbot-message-bubble">
                  <div className="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Prompt Suggestions */}
          {messages.length === 1 && (
            <div className="chatbot-suggestions">
              {suggestionPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handleSend(prompt)}
                  className="suggestion-btn"
                  data-cursor="disable"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Form Footer */}
          <div className="chatbot-footer">
            <input
              type="text"
              placeholder="Ask a question..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isTyping}
            />
            <button
              onClick={() => handleSend(inputValue)}
              disabled={!inputValue.trim() || isTyping}
              className="send-btn"
              data-cursor="disable"
            >
              <MdSend />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatbot;
