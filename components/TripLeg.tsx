"use client"

import { Badge } from "@/components/ui/badge";
import { Star, Clock, ChevronDown, ChevronUp } from "lucide-react";
import AirlineLogo from "./AirlineLogo";
import DeliveryLogo from "./DeliveryLogo";

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

interface TripLegProps {
  leg: DeliveryLeg;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

export default function TripLeg({ leg, index, isExpanded, onToggle }: TripLegProps) {
  return (
    <div className="border border-gray-100 rounded p-3 bg-white hover:bg-gray-50 transition-colors">
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={onToggle}
      >
        {/* Left: Airline Logo + From Location */}
        <div className="flex items-center gap-3">
          {/* Airline Logo */}
          {leg.airline ? (
            <AirlineLogo 
              airlineCode={leg.airline} 
              className="w-12 h-12"
              width={48}
              height={48}
              fallbackText={leg.airline.charAt(0)}
            />
          ) : (
            leg.transport.toLowerCase() === 'car' ? (
              <DeliveryLogo 
                className="w-12 h-12"
                width={48}
                height={48}
                fallbackText="D"
              />
            ) : (
              <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                <span className="text-sm font-bold text-gray-600">
                  {leg.transport.charAt(0)}
                </span>
              </div>
            )
          )}
          
          {/* From Location */}
          <div className="text-center">
            <p className="text-sm font-semibold text-gray-900">{leg.from}</p>
            <p className="text-xs text-gray-600">{leg.startDate}</p>
            <p className="text-xs text-gray-600">{leg.startTime}</p>
          </div>
        </div>

        {/* Center: Duration with Arrow */}
        <div className="flex items-center gap-2">
          <div className="flex-1 h-px bg-gray-300" />
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">{leg.duration}</span>
          </div>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        {/* Right: To Location + Traveler Metrics */}
        <div className="flex items-center gap-4">
          {/* To Location */}
          <div className="text-center">
            <p className="text-sm font-semibold text-gray-900">{leg.to}</p>
            <p className="text-xs text-gray-600">{leg.endDate}</p>
            <p className="text-xs text-gray-600">{leg.endTime}</p>
          </div>

          {/* Traveler Metrics */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-gray-500 fill-current" />
              <span className="text-sm font-semibold text-gray-900">{leg.travelerRating}</span>
            </div>
            <Badge className="text-white text-xs px-2 py-1" style={{ backgroundColor: '#227950' }}>
              {leg.successRate}%
            </Badge>
            <Badge className="text-white text-xs px-2 py-1" style={{ backgroundColor: '#227950' }}>
              {leg.tripCount}
            </Badge>
            <div className="ml-2">
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Trip Details */}
      {isExpanded && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="space-y-3">
            {/* Trip Information */}
            <div className="space-y-2">
              <div className="text-sm font-semibold text-gray-900">Trip Information</div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-xs" style={{ color: '#ebb12d', borderColor: '#ebb12d' }}>
                  Arrives: {leg.packageArrivalDate} {leg.packageArrivalTime}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {leg.startDate} {leg.startTime}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {leg.endDate} {leg.endTime}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {leg.duration}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {leg.transport}
                </Badge>
                {leg.airline && (
                  <Badge variant="outline" className="text-xs">
                    {leg.airline}
                  </Badge>
                )}
              </div>
            </div>

            {/* Package Information */}
            <div className="space-y-2">
              <div className="text-sm font-semibold text-gray-900">Package Information</div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-xs">
                  {leg.from} → {leg.to}
                </Badge>
                <Badge className="text-white text-xs" style={{ backgroundColor: '#227950' }}>
                  Confirmed
                </Badge>
              </div>
            </div>

            {/* Traveler Performance */}
            <div className="space-y-2">
              <div className="text-sm font-semibold text-gray-900">Traveler Performance</div>
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-gray-500 fill-current" />
                  <Badge variant="outline" className="text-xs">
                    {leg.travelerRating} rating
                  </Badge>
                </div>
                <Badge className="text-white text-xs" style={{ backgroundColor: '#227950' }}>
                  {leg.successRate}% success
                </Badge>
                <Badge className="text-white text-xs" style={{ backgroundColor: '#227950' }}>
                  {leg.tripCount} trips
                </Badge>
                <Badge variant="outline" className="text-xs">
                  98% on-time
                </Badge>
                <Badge variant="outline" className="text-xs">
                  100% safety
                </Badge>
              </div>
            </div>

            {/* Traveler Profile */}
            <div className="space-y-2">
              <div className="text-sm font-semibold text-gray-900">Traveler Profile</div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-xs">
                  Member since Jan 2023
                </Badge>
                <Badge className="text-white text-xs" style={{ backgroundColor: '#227950' }}>
                  ✓ Verified
                </Badge>
                <Badge className="text-white text-xs" style={{ backgroundColor: '#227950' }}>
                  Insured
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Excellent communication
                </Badge>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
