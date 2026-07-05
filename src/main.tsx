import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Suppress unhandled promise rejections and errors from third-party browser extensions
const isExtensionError = (message: string | undefined | null) => {
  if (!message) return false;
  return (
    message.includes("A listener indicated an asynchronous response") ||
    message.includes("message channel closed before a response") ||
    message.includes("chrome-extension://") ||
    message.includes("extensions::")
  );
};

window.addEventListener("unhandledrejection", (event) => {
  const reason = event.reason;
  const msg =
    reason?.message ||
    reason?.stack ||
    (typeof reason === "string" ? reason : "") ||
    String(reason);
  if (isExtensionError(msg)) {
    event.preventDefault();
    event.stopPropagation();
  }
});

window.addEventListener("error", (event) => {
  const msg =
    event.message ||
    event.error?.message ||
    event.error?.stack ||
    String(event.error);
  if (isExtensionError(msg)) {
    event.preventDefault();
    event.stopPropagation();
  }
});

// Shared AudioContext for resource reuse and mobile compatibility
let sharedAudioCtx: AudioContext | null = null;

// Synthesize a mechanical click sound using Web Audio API
const playClickSound = () => {
  try {
    if (!sharedAudioCtx) {
      sharedAudioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    // Resume context if suspended (common mobile/safari gesture policy)
    if (sharedAudioCtx.state === "suspended") {
      sharedAudioCtx.resume();
    }

    const osc = sharedAudioCtx.createOscillator();
    const gain = sharedAudioCtx.createGain();

    osc.type = "sine";
    // A quick frequency sweep makes a crisp, mechanical select click
    osc.frequency.setValueAtTime(800, sharedAudioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, sharedAudioCtx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.06, sharedAudioCtx.currentTime); // Subtle volume
    gain.gain.exponentialRampToValueAtTime(0.001, sharedAudioCtx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(sharedAudioCtx.destination);

    osc.start();
    osc.stop(sharedAudioCtx.currentTime + 0.08);
  } catch (e) {
    console.warn("AudioContext failed to initialize:", e);
  }
};

// Play sound on click of any interactive elements
window.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  if (
    target.closest("button") ||
    target.closest("a") ||
    target.closest("input") ||
    target.closest("textarea") ||
    target.closest('[role="button"]') ||
    target.closest('[data-cursor="disable"]') ||
    target.closest(".carousel-dot") ||
    target.closest(".connect-card") ||
    target.closest(".skill-card") ||
    target.closest(".skill-logo-card") ||
    target.closest(".terminal-trigger") ||
    target.closest(".chatbot-trigger") ||
    target.closest(".suggestion-btn") ||
    target.closest(".certificate-card") ||
    target.closest(".loading-wrap") ||
    target.closest(".loading-button") ||
    target.closest(".loading-box") ||
    target.closest(".work-card-content")
  ) {
    playClickSound();
  }
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
