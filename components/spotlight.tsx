"use client";

import React, { useRef, useState, useEffect } from "react";

type SpotlightProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Spotlight({ children, className = "" }: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [boxes, setBoxes] = useState<Array<HTMLElement>>([]);

  useEffect(() => {
    if (containerRef.current) {
      setBoxes(
        Array.from(containerRef.current.children).map((el) => el as HTMLElement)
      );
    }
  }, []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = mousePosition.x - rect.left;
      const y = mousePosition.y - rect.top;

      boxes.forEach((box) => {
        const boxX = -(box.getBoundingClientRect().left - rect.left) + x;
        const boxY = -(box.getBoundingClientRect().top - rect.top) + y;
        box.style.setProperty("--mouse-x", `${boxX}px`);
        box.style.setProperty("--mouse-y", `${boxY}px`);
      });
    }
  }, [mousePosition, boxes]);

  return (
    <div className={className} ref={containerRef}>
      {children}
    </div>
  );
}