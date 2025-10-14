"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Share } from "lucide-react";

interface TripHeaderProps {
  legCount: number;
}

export default function TripHeader({ legCount }: TripHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-1.5">
        <Badge variant="outline" className="text-xs px-2 py-1">
          {legCount} leg{legCount > 1 ? 's' : ''}
        </Badge>
      </div>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" className="h-7 w-7 p-0 cursor-pointer hover:bg-gray-100 transition-colors">
          <Heart className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-7 w-7 p-0 cursor-pointer hover:bg-gray-100 transition-colors">
          <Share className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
