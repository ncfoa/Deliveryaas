"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { SLACK_AUBERGINE_HEX } from "@/lib/palette";
import { useRouter } from "next/navigation";

interface DeliveryLeg {
  packageArrivalDate: string;
  packageArrivalTime: string;
}

interface FlightData {
  price: string;
  totalDuration: string;
  legs: DeliveryLeg[];
}

interface PriceSectionProps {
  result: FlightData;
}

export default function PriceSection({ result }: PriceSectionProps) {
  const router = useRouter();

  const handleSelect = () => {
    router.push('/booking');
  };

  return (
    <div className="w-36 p-3 flex flex-col justify-between">
      <div className="text-right">
        {/* Final Package Arrival Badge */}
        <Badge variant="outline" className="text-xs mb-2" style={{ color: '#ebb12d', borderColor: '#ebb12d' }}>
          Arrives: {result.legs[result.legs.length - 1].packageArrivalDate} {result.legs[result.legs.length - 1].packageArrivalTime}
        </Badge>
        {/* Total Duration Badge */}
        <Badge variant="outline" className="text-xs mb-2" style={{ color: '#227950', borderColor: '#227950' }}>
          {result.totalDuration}
        </Badge>
      </div>
      <div className="text-right">
        <p className="text-2xl font-bold mb-1" style={{ color: SLACK_AUBERGINE_HEX }}>
          {result.price}
        </p>
        <Button
          onClick={handleSelect}
          size="sm"
          className="w-full h-9 text-base font-semibold cursor-pointer hover:opacity-90 transition-opacity"
          style={{ backgroundColor: SLACK_AUBERGINE_HEX, color: "#ffffff" }}
        >
          Select
        </Button>
      </div>
    </div>
  );
}
