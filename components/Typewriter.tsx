import React, { useState, useEffect } from "react";
import { TypewriterProps } from "../types";

export const Typewriter: React.FC<TypewriterProps> = ({
  text,
  speed = 50,
  startDelay = 1000,
  onComplete,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStarted(true);
    }, startDelay);
    return () => clearTimeout(timer);
  }, [startDelay]);

  useEffect(() => {
    if (!started) return;

    // Reset displayed text when (re)starting so we don't inherit previous content
    setDisplayedText("");

    let index = 0;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const typeNext = () => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text.charAt(index));
        index += 1;
        // Add small random variation for a human feel
        const jitter = Math.round(Math.random() * 50 - 25);
        const delay = Math.max(10, speed + jitter);
        timeoutId = setTimeout(typeNext, delay);
      } else {
        if (onComplete) onComplete();
      }
    };

    // Start typing after a short delay (avoid immediate sync update that can get lost)
    const initialJitter = Math.round(Math.random() * 50 - 25);
    const initialDelay = Math.max(10, speed + initialJitter);
    timeoutId = setTimeout(typeNext, initialDelay);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [text, speed, started, onComplete]);

  return (
    <span className="handwritten text-lg md:text-xl text-teal-800 leading-relaxed whitespace-pre-wrap">
      {displayedText}
      <span className="animate-pulse text-pink-500">|</span>
    </span>
  );
};
