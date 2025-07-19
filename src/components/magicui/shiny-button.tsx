"use client";

import { cn } from "@/lib/utils";
import React, { useState, useRef, useEffect } from "react";

export interface ShinyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  containerClassName?: string;
}

export const ShinyButton = ({
  children,
  containerClassName,
  className,
  ...props
}: ShinyButtonProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const updatePosition = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    updatePosition(e);
  };

  // This is to handle focus on mobile touch devices
  useEffect(() => {
    if (!isFocused) return;

    const handleFocusRing = () => {
      if (!buttonRef.current) return;

      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        x: rect.width / 2,
        y: rect.height / 2,
      });
      setOpacity(1);
    };

    handleFocusRing();

    return () => {
      setOpacity(0);
    };
  }, [isFocused]);

  return (
    <div className={cn("relative", containerClassName)}>
      <button
        ref={buttonRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={cn(
          "relative flex items-center justify-center overflow-hidden whitespace-nowrap rounded-md text-white transition-all",
          className
        )}
        {...props}
      >
        <span className="relative z-10">{children}</span>
        <div
          className="absolute inset-0 z-0 transition-opacity"
          style={{
            opacity: opacity,
            background: `radial-gradient(100px circle at ${position.x}px ${position.y}px, rgba(255,255,255,.2), transparent 40%)`,
          }}
        />
      </button>
    </div>
  );
}; 