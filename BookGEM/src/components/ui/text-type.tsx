import React, { useState, useEffect } from "react";

interface TextTypeProps {
  text: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
  cursorClassName?: string;
}

export const TextType: React.FC<TextTypeProps> = ({
  text,
  typingSpeed = 40,
  deletingSpeed = 25,
  pauseDuration = 2200,
  className = "",
  cursorClassName = "",
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!text || text.length === 0) return;
    const fullText = text[currentTextIndex];

    if (!isDeleting && currentText === fullText) {
      const pauseTimer = setTimeout(() => {
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(pauseTimer);
    }

    if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % text.length);
      return;
    }

    const timer = setTimeout(
      () => {
        if (!isDeleting) {
          setCurrentText(fullText.substring(0, currentText.length + 1));
        } else {
          setCurrentText(fullText.substring(0, currentText.length - 1));
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentTextIndex, text, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className={`inline-block ${className}`}>
      {currentText}
      <span className={`inline-block animate-pulse ml-[2px] font-normal text-amber-600 ${cursorClassName}`}>|</span>
    </span>
  );
};
