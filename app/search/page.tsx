"use client"

import SearchFilters from "@/components/SearchFilters";
import SearchResults from "@/components/SearchResults";
import LoadingBar from "@/components/LoadingBar";
import DeliveryCardSkeleton from "@/components/DeliveryCardSkeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SLACK_AUBERGINE_HEX } from "@/lib/palette";
import { searchDeliveries, loadMoreDeliveries, type FlightData } from "@/lib/api";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";

export default function SearchPage() {
  const [sortBy, setSortBy] = useState("best");
  const [searchFrom, setSearchFrom] = useState("Montreal");
  const [searchTo, setSearchTo] = useState("Paris");
  const [searchDate, setSearchDate] = useState("2024-01-15");
  const [searchPackage, setSearchPackage] = useState("Electronics");
  
  // API state
  const [results, setResults] = useState<FlightData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [totalResults, setTotalResults] = useState(0);

  // Search function
  const handleSearch = async () => {
    setIsLoading(true);
    setHasSearched(true);
    
    try {
      const searchResults = await searchDeliveries({
        from: searchFrom,
        to: searchTo,
        date: searchDate,
        package: searchPackage
      });
      
      const sortedResults = sortResults(searchResults, sortBy);
      setResults(sortedResults);
      setTotalResults(searchResults.length + Math.floor(Math.random() * 10)); // Simulate more results available
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load more function
  const handleShowMore = async () => {
    setIsLoadingMore(true);
    
    try {
      const moreResults = await loadMoreDeliveries(results.length);
      setResults(prev => [...prev, ...moreResults]);
    } catch (error) {
      console.error('Load more failed:', error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  // Sort function
  const sortResults = (results: FlightData[], sortBy: string) => {
    const sortedResults = [...results];
    
    switch (sortBy) {
      case 'cheapest':
        return sortedResults.sort((a, b) => {
          const priceA = parseInt(a.price.replace('$', ''));
          const priceB = parseInt(b.price.replace('$', ''));
          return priceA - priceB;
        });
      
      case 'best':
        return sortedResults.sort((a, b) => {
          // Best = combination of price and traveler rating
          const priceA = parseInt(a.price.replace('$', ''));
          const priceB = parseInt(b.price.replace('$', ''));
          const ratingA = a.legs.reduce((sum, leg) => sum + leg.travelerRating, 0) / a.legs.length;
          const ratingB = b.legs.reduce((sum, leg) => sum + leg.travelerRating, 0) / b.legs.length;
          
          // Lower price is better, higher rating is better
          const scoreA = ratingA - (priceA / 100);
          const scoreB = ratingB - (priceB / 100);
          return scoreB - scoreA;
        });
      
      case 'quickest':
        return sortedResults.sort((a, b) => {
          // Parse duration (e.g., "1 day", "2 days", "3 days")
          const getDurationInDays = (duration: string) => {
            const match = duration.match(/(\d+)\s*day/);
            return match ? parseInt(match[1]) : 999;
          };
          
          const durationA = getDurationInDays(a.totalDuration);
          const durationB = getDurationInDays(b.totalDuration);
          return durationA - durationB;
        });
      
      default:
        return sortedResults;
    }
  };

  // Handle sort change
  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy);
    setResults(prev => sortResults(prev, newSortBy));
  };

  // Auto-search on component mount
  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <main className="w-full bg-gray-50 font-['CentraNo2']">
      <div className="max-w-6xl mx-auto px-4 lg:px-8 lg:pr-16 py-4 space-y-4">
        {/* Search Bar - Modern */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="flex items-end">
            {/* From */}
            <div className="flex-1 p-4 border-r border-gray-200">
              <label className="text-sm font-medium text-gray-700 mb-2 block">From</label>
              <Input
                value={searchFrom}
                onChange={(e) => setSearchFrom(e.target.value)}
                className="h-10 text-sm border-0 bg-transparent p-0 focus:ring-0 focus:outline-none"
                placeholder="Montreal, Canada"
              />
            </div>

            {/* To */}
            <div className="flex-1 p-4 border-r border-gray-200">
              <label className="text-sm font-medium text-gray-700 mb-2 block">To</label>
              <Input
                value={searchTo}
                onChange={(e) => setSearchTo(e.target.value)}
                className="h-10 text-sm border-0 bg-transparent p-0 focus:ring-0 focus:outline-none"
                placeholder="Paris, France"
              />
            </div>

            {/* Date */}
            <div className="flex-1 p-4 border-r border-gray-200">
              <label className="text-sm font-medium text-gray-700 mb-2 block">Date</label>
              <Input
                value={searchDate}
                onChange={(e) => setSearchDate(e.target.value)}
                className="h-10 text-sm border-0 bg-transparent p-0 focus:ring-0 focus:outline-none"
                placeholder="Jan 15, 2024"
              />
            </div>

            {/* Package Type */}
            <div className="flex-1 p-4">
              <label className="text-sm font-medium text-gray-700 mb-2 block">Package</label>
              <Input
                value={searchPackage}
                onChange={(e) => setSearchPackage(e.target.value)}
                className="h-10 text-sm border-0 bg-transparent p-0 focus:ring-0 focus:outline-none"
                placeholder="Electronics"
              />
            </div>

            {/* Search Button */}
            <div className="p-4">
              <Button
                onClick={handleSearch}
                disabled={isLoading}
                size="lg"
                className="h-10 px-6 text-sm font-medium cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-50"
                style={{ backgroundColor: SLACK_AUBERGINE_HEX, color: "#ffffff" }}
              >
                {isLoading ? (
                  <Spinner className="w-4 h-4 mr-2" />
                ) : (
                  <Search className="w-4 h-4 mr-2" />
                )}
                {isLoading ? 'Searching...' : 'Search'}
              </Button>
            </div>
          </div>
        </div>

        {/* Filters and Results */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4">
          <SearchFilters />
          <div className="space-y-3">
            {/* Tabs with Loading Bar */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="flex items-center justify-between p-4">
                <span className="text-sm text-gray-600">
                  {hasSearched ? `${results.length} of ${totalResults} deliveries` : 'Searching deliveries...'}
                </span>
                <SearchResults
                  sortBy={sortBy}
                  setSortBy={handleSortChange}
                  results={results}
                  onShowMore={() => {}}
                  isLoading={false}
                  hasMore={false}
                  showTabsOnly={true}
                  isLoadingMain={isLoading}
                />
              </div>
              {/* Loading Bar */}
              {isLoading && (
                <div className="w-full h-1 bg-gray-200">
                  <div 
                    className="h-1 transition-all duration-300 ease-out"
                    style={{ 
                      backgroundColor: SLACK_AUBERGINE_HEX,
                      width: '100%',
                      animation: 'pulse 1.5s ease-in-out infinite'
                    }}
                  />
                </div>
              )}
            </div>

            {/* Results */}
            {isLoading ? (
              // Loading - show skeletons
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <DeliveryCardSkeleton key={i} />
                ))}
              </div>
            ) : (
              // Show actual results
              <SearchResults
                sortBy={sortBy}
                setSortBy={handleSortChange}
                results={results}
                onShowMore={handleShowMore}
                isLoading={isLoadingMore}
                hasMore={results.length < totalResults}
                showTabsOnly={false}
                isLoadingMain={false}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}