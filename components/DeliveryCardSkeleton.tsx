"use client"

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DeliveryCardSkeleton() {
  return (
    <Card className="border border-gray-200 bg-white shadow-sm">
      <CardContent className="p-0">
        <div className="flex">
          {/* Left Column - Trip Details */}
          <div className="flex-1 p-3">
            {/* Header Skeleton */}
            <div className="flex items-center justify-between mb-2">
              <Skeleton variant="adobe" className="h-5 w-20 rounded-full" />
              <div className="flex items-center gap-1">
                <Skeleton variant="adobe" className="h-7 w-7 rounded" />
                <Skeleton variant="adobe" className="h-7 w-7 rounded" />
              </div>
            </div>

            {/* Trip Legs Skeleton */}
            <div className="space-y-2">
              {[1, 2].map((i) => (
                <div key={i} className="border border-gray-100 rounded p-3 bg-white hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    {/* Left: Logo + From */}
                    <div className="flex items-center gap-3">
                      <Skeleton variant="adobe" className="w-12 h-12 rounded-lg" />
                      <div className="text-center">
                        <Skeleton variant="adobe" className="h-4 w-20 mb-1" />
                        <Skeleton variant="adobe" className="h-3 w-14 mb-1" />
                        <Skeleton variant="adobe" className="h-3 w-12" />
                      </div>
                    </div>

                    {/* Center: Duration */}
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-px bg-gray-300" />
                      <div className="flex items-center gap-1">
                        <Skeleton variant="adobe" className="w-4 h-4 rounded" />
                        <Skeleton variant="adobe" className="h-4 w-16" />
                      </div>
                      <div className="flex-1 h-px bg-gray-300" />
                    </div>

                    {/* Right: To + Metrics */}
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <Skeleton variant="adobe" className="h-4 w-20 mb-1" />
                        <Skeleton variant="adobe" className="h-3 w-14 mb-1" />
                        <Skeleton variant="adobe" className="h-3 w-12" />
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Skeleton variant="adobe" className="w-4 h-4 rounded" />
                          <Skeleton variant="adobe" className="h-4 w-8" />
                        </div>
                        <Skeleton variant="adobe" className="h-6 w-10 rounded-full" />
                        <Skeleton variant="adobe" className="h-6 w-8 rounded-full" />
                        <Skeleton variant="adobe" className="w-4 h-4 rounded" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vertical Separator */}
          <div className="w-px bg-gray-200" />

          {/* Right Column - Price Skeleton */}
          <div className="w-36 p-3 flex flex-col justify-between">
            <div className="text-right">
              <Skeleton variant="adobe" className="h-5 w-28 mb-2 rounded-full" />
              <Skeleton variant="adobe" className="h-5 w-20 mb-2 rounded-full" />
            </div>
            <div className="text-right">
              <Skeleton variant="adobe" className="h-8 w-16 mb-1" />
              <Skeleton variant="adobe" className="h-4 w-24 mb-2" />
              <Skeleton variant="adobe" className="h-6 w-full mb-2 rounded" />
              <Skeleton variant="adobe" className="h-9 w-full rounded" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
