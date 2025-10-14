"use client"

import { useState, useEffect } from "react";
import Image from "next/image";

interface AirlineLogoProps {
  airlineCode: string;
  className?: string;
  fallbackText?: string;
  width?: number;
  height?: number;
}

export default function AirlineLogo({ 
  airlineCode, 
  className = "w-8 h-8", 
  fallbackText,
  width = 32,
  height = 32 
}: AirlineLogoProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Reset error state when airline code changes
  useEffect(() => {
    setImageError(false);
    setImageLoaded(false);
  }, [airlineCode]);

      // Use img.logo.dev API
      const logoUrl = `https://img.logo.dev/${airlineCode.toLowerCase()}.com?token=pk_BVIA_DVkRsqy-YEgTE6h5Q`;
  const displayText = fallbackText || airlineCode.charAt(0).toUpperCase();

  const handleImageError = () => {
    console.log(`❌ Failed to load logo for ${airlineCode} from ${logoUrl}`);
    setImageError(true);
  };

  const handleImageLoad = () => {
    console.log(`✅ Successfully loaded logo for ${airlineCode} from ${logoUrl}`);
    setImageLoaded(true);
  };

  // If all URLs failed, show fallback
  if (imageError) {
    return (
      <div className={`${className} bg-gray-200 rounded flex items-center justify-center`}>
        <span className="text-xs font-bold text-gray-600">
          {displayText}
        </span>
      </div>
    );
  }

  return (
    <div className={`${className} relative`}>
      <Image
        src={logoUrl}
        alt={`${airlineCode} logo`}
        width={width}
        height={height}
        className="rounded"
        onError={handleImageError}
        onLoad={handleImageLoad}
        unoptimized
        priority={false}
      />
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gray-200 rounded flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}
