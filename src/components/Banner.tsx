"use client";

import React from "react";
import Image from "next/image";

interface BannerProps {
  imageUrl: string;
  altText: string;
  title?: string;
  subtitle?: string;
}

export default function Banner({
  imageUrl,
  altText,
  title,
  subtitle,
}: BannerProps) {
  return (
    <div className="relative w-full h-64 md:h-80 overflow-hidden">
      <Image
        src={imageUrl}
        alt={altText}
        fill
        className="object-cover"
        priority
      />
      {/* Optional Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        {/* Optional: Add text content here if needed for the banner */}
        {title && (
          <h2 className="text-white text-3xl md:text-4xl font-bold text-center">
            {title}
          </h2>
        )}
        {subtitle && (
          <p className="text-white text-lg md:text-xl mt-2 text-center">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
