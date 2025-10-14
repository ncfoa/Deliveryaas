"use client"

import { useState, useEffect } from "react";
import Image from "next/image";

interface DeliveryLogoProps {
  className?: string;
  fallbackText?: string;
  width?: number;
  height?: number;
}

export default function DeliveryLogo({ 
  className = "w-8 h-8", 
  fallbackText = "D",
  width = 32,
  height = 32 
}: DeliveryLogoProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Different delivery/logistics service logos to choose from
  const deliveryServices = [
    'fedex.com',
    'ups.com', 
    'dhl.com',
    'usps.com',
    'amazon.com',
    'ontrac.com',
    'lasership.com',
    'gso.com'
  ];

  // Randomly select a delivery service
  const [selectedService, setSelectedService] = useState('');

  useEffect(() => {
    const randomService = deliveryServices[Math.floor(Math.random() * deliveryServices.length)];
    setSelectedService(randomService);
    setImageError(false);
    setImageLoaded(false);
  }, []);

  const logoUrl = `https://img.logo.dev/${selectedService}?token=pk_BVIA_DVkRsqy-YEgTE6h5Q`;

  const handleImageError = () => {
    console.log(`❌ Failed to load delivery logo for ${selectedService}: ${logoUrl}`);
    setImageError(true);
  };

  const handleImageLoad = () => {
    console.log(`✅ Successfully loaded delivery logo for ${selectedService}: ${logoUrl}`);
    setImageLoaded(true);
  };

  // If image failed to load, show fallback
  if (imageError) {
    return (
      <div className={`${className} bg-gray-200 rounded flex items-center justify-center`}>
        <span className="text-xs font-bold text-gray-600">
          {fallbackText}
        </span>
      </div>
    );
  }

  return (
    <div className={`${className} relative`}>
      <Image
        src={logoUrl}
        alt={`${selectedService} delivery service`}
        width={width}
        height={height}
        className="rounded"
        onError={handleImageError}
        onLoad={handleImageLoad}
        unoptimized
      />
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gray-200 rounded flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}
