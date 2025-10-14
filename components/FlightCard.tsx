"use client"

import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import TripHeader from "./TripHeader";
import TripLeg from "./TripLeg";
import PriceSection from "./PriceSection";

interface DeliveryLeg {
  transport: string;
  airline?: string;
  from: string;
  to: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  packageArrivalDate: string;
  packageArrivalTime: string;
  duration: string;
  travelerRating: number;
  successRate: number;
  tripCount: number;
}

interface FlightData {
  price: string;
  badge: string | null;
  legs: DeliveryLeg[];
  totalDuration: string;
  travelerImage: string;
  travelerName: string;
}

interface FlightCardProps {
  result: FlightData;
}

export default function FlightCard({ result }: FlightCardProps) {
  const [expandedTrip, setExpandedTrip] = useState<number | null>(null);

  const toggleTripDetails = (tripIndex: number) => {
    setExpandedTrip(expandedTrip === tripIndex ? null : tripIndex);
  };

  return (
    <Card className="border border-gray-200 hover:border-gray-300 transition-colors bg-white shadow-sm py-2 pr-2">
      <CardContent className="p-0">
        <div className="flex">
          {/* Left Column - Trip Details */}
          <div className="flex-1 px-3">
            {/* Header with Badges */}
            <TripHeader legCount={result.legs.length} />

            {/* Trip Legs - Compact One Line Design */}
            <div className="space-y-2">
              {result.legs.map((leg, idx) => (
                <TripLeg
                  key={idx}
                  leg={leg}
                  index={idx}
                  isExpanded={expandedTrip === idx}
                  onToggle={() => toggleTripDetails(idx)}
                />
              ))}
            </div>
          </div>

          {/* Vertical Separator */}
          <div className="w-px bg-gray-200" />

          {/* Right Column - Price and Select */}
          <PriceSection result={result} />
        </div>
      </CardContent>
    </Card>
  );
}