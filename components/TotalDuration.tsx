"use client"

import { Clock } from "lucide-react";

interface TotalDurationProps {
  totalDuration: string;
}

export default function TotalDuration({ totalDuration }: TotalDurationProps) {
  return (
    <div className="mt-1.5 pt-1.5 border-t border-gray-200">
      <div className="flex items-center gap-1">
        <Clock className="w-5 h-5 text-gray-600" />
        <span className="text-sm text-gray-600">Total:</span>
        <span className="text-sm font-semibold text-gray-900">{totalDuration}</span>
      </div>
    </div>
  );
}
