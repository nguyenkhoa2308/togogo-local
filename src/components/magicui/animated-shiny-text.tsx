"use client";

import React, { CSSProperties, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface GradientTextProps {
  colors: string[];
  animationSpeed?: number;
  className?: string;
  showBorder?: boolean;
  children: React.ReactNode;
}

const GradientText: React.FC<GradientTextProps> = ({
  colors,
  animationSpeed = 5,
  className,
  showBorder = false,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [gradientAngle, setGradientAngle] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 100, height: 100 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    const animationFrame = () => {
      setGradientAngle((prevAngle) => (prevAngle + 1) % 360);
      animationId = requestAnimationFrame(animationFrame);
    };

    let animationId = requestAnimationFrame(animationFrame);

    return () => {
      window.removeEventListener("resize", updateDimensions);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Define the gradient style
  const colorString = colors.join(", ");
  const style: CSSProperties = {
    background: `linear-gradient(${gradientAngle}deg, ${colorString})`,
    backgroundSize: `${dimensions.width * 2}px ${dimensions.height * 2}px`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    transition: `all ${1 / (animationSpeed || 1)}s ease`,
    border: showBorder
      ? `1px solid transparent`
      : "none",
    borderImage: showBorder
      ? `linear-gradient(${gradientAngle}deg, ${colorString}) 1`
      : "none",
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "inline-block font-medium animate-shimmer",
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
};

export default GradientText; 