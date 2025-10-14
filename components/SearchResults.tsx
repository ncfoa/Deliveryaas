"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SLACK_AUBERGINE_HEX } from "@/lib/palette";
import FlightCard from "./FlightCard";
import React from "react";
import { Spinner } from "@/components/ui/spinner";

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

interface SearchResultsProps {
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  results: FlightData[];
  onShowMore?: () => void;
  isLoading?: boolean;
  hasMore?: boolean;
  showTabsOnly?: boolean;
  isLoadingMain?: boolean;
}

export default function SearchResults({ sortBy, setSortBy, results, onShowMore, isLoading, hasMore, showTabsOnly = false, isLoadingMain = false }: SearchResultsProps) {
  // Calculate prices for each sort option
  const getPriceForSort = (sortType: string) => {
    if (results.length === 0) {
      // Return default prices when no results yet
      switch (sortType) {
        case 'cheapest': return '$77';
        case 'best': return '$78';
        case 'quickest': return '$90';
        default: return '$0';
      }
    }
    
    const sortedResults = [...results];
    
    switch (sortType) {
      case 'cheapest':
        const cheapest = sortedResults.sort((a, b) => {
          const priceA = parseInt(a.price.replace('$', ''));
          const priceB = parseInt(b.price.replace('$', ''));
          return priceA - priceB;
        })[0];
        return cheapest?.price || '$0';
      
      case 'best':
        const best = sortedResults.sort((a, b) => {
          const priceA = parseInt(a.price.replace('$', ''));
          const priceB = parseInt(b.price.replace('$', ''));
          const ratingA = a.legs.reduce((sum, leg) => sum + leg.travelerRating, 0) / a.legs.length;
          const ratingB = b.legs.reduce((sum, leg) => sum + leg.travelerRating, 0) / b.legs.length;
          const scoreA = ratingA - (priceA / 100);
          const scoreB = ratingB - (priceB / 100);
          return scoreB - scoreA;
        })[0];
        return best?.price || '$0';
      
      case 'quickest':
        const quickest = sortedResults.sort((a, b) => {
          const getDurationInDays = (duration: string) => {
            const match = duration.match(/(\d+)\s*day/);
            return match ? parseInt(match[1]) : 999;
          };
          const durationA = getDurationInDays(a.totalDuration);
          const durationB = getDurationInDays(b.totalDuration);
          return durationA - durationB;
        })[0];
        return quickest?.price || '$0';
      
      default:
        return '$0';
    }
  };

  if (showTabsOnly) {
    return (
      <Tabs value={sortBy} onValueChange={setSortBy}>
        <TabsList className="bg-gray-50 p-1 rounded-lg h-16">
          <TabsTrigger
            value="cheapest"
            className="px-4 py-4 text-sm font-medium rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm h-14"
            style={{
              borderLeftColor: sortBy === 'cheapest' ? SLACK_AUBERGINE_HEX : 'transparent',
              borderLeftWidth: sortBy === 'cheapest' ? '4px' : '0px',
              borderLeftStyle: 'solid'
            }}
          >
            Cheapest <span className="ml-1 text-xs text-gray-500">{getPriceForSort('cheapest')}</span>
          </TabsTrigger>
          <TabsTrigger
            value="best"
            className="px-4 py-4 text-sm font-medium rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm h-14"
            style={{
              borderLeftColor: sortBy === 'best' ? SLACK_AUBERGINE_HEX : 'transparent',
              borderLeftWidth: sortBy === 'best' ? '4px' : '0px',
              borderLeftStyle: 'solid'
            }}
          >
            Best <span className="ml-1 text-xs text-gray-500">{getPriceForSort('best')}</span>
          </TabsTrigger>
          <TabsTrigger
            value="quickest"
            className="px-4 py-4 text-sm font-medium rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm h-14"
            style={{
              borderLeftColor: sortBy === 'quickest' ? SLACK_AUBERGINE_HEX : 'transparent',
              borderLeftWidth: sortBy === 'quickest' ? '4px' : '0px',
              borderLeftStyle: 'solid'
            }}
          >
            Quickest <span className="ml-1 text-xs text-gray-500">{getPriceForSort('quickest')}</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    );
  }

  return (
    <div className="space-y-3">
      {/* Flight Cards */}
      {results.map((result, idx) => (
        <FlightCard key={idx} result={result} />
      ))}

      {/* Show More Button */}
      {hasMore && (
        <div className="text-center py-4">
          <Button 
            onClick={onShowMore}
            disabled={isLoading}
            variant="outline" 
            size="lg" 
            className="rounded-full text-sm px-8 py-3 border-gray-300 hover:bg-gray-100 cursor-pointer disabled:cursor-not-allowed transition-colors"
            style={{ 
              borderColor: SLACK_AUBERGINE_HEX,
              color: SLACK_AUBERGINE_HEX
            }}
          >
            {isLoading ? (
              <>
                <Spinner className="w-3 h-3 mr-2" />
                Loading...
              </>
            ) : (
              "Show more results"
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
