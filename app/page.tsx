"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/date-picker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, MapPin, Package, Calendar, ArrowRight, Heart, Star, ChevronLeft, ChevronRight, FileText, Smartphone, Utensils, ShoppingBag, Briefcase, Gift } from "lucide-react";
import { SLACK_AUBERGINE_HEX } from "@/lib/palette";
import { useState } from "react";

const ImageCarousel = ({ images, badge, isNew }: { images: number; badge?: string; isNew?: boolean }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images);
  };

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images) % images);
  };

  return (
    <div className="w-full aspect-square bg-gray-200 rounded-xl relative overflow-hidden mb-3 group">
      {/* Navigation buttons - show on hover */}
      {images > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:scale-110"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:scale-110"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </>
      )}

      {/* Heart button */}
      <button className="absolute top-3 right-3 p-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <Heart className="w-5 h-5 text-white stroke-[2.5px] hover:fill-white" />
      </button>

      {/* Badges */}
      {isNew && (
        <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded-md text-xs font-semibold shadow-sm">New</div>
      )}
      {badge && !isNew && (
        <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded-md text-xs font-semibold shadow-sm">{badge}</div>
      )}

      {/* Dots indicator */}
      {images > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {[...Array(images)].map((_, idx) => (
            <div
              key={idx}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                idx === currentIndex ? "bg-white w-2" : "bg-white/60"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  return (
    <main className="w-full">
      <section className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,650px)_1fr] gap-8 items-center px-4 lg:px-8 py-16">
        <div className="space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            Send your items across all the world <span className="text-[#4A154B]">.</span>
          </h1>

          <div className="flex gap-4">
            <button 
              className="flex flex-col items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
              onClick={() => console.log("Flights selected")}
            >
              <div className="h-16 w-16 rounded-lg bg-gray-200" />
              <span className="text-sm">Flights</span>
            </button>
            <button 
              className="flex flex-col items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
              onClick={() => console.log("Cars selected")}
            >
              <div className="h-16 w-16 rounded-lg bg-gray-200" />
              <span className="text-sm">Cars</span>
            </button>
          </div>

          <div className="w-full">
            <div className="rounded-full border border-gray-300 bg-white shadow-md hover:shadow-lg transition-shadow flex items-center h-14 px-5 gap-4 mx-auto max-w-3xl">
              <Input 
                placeholder="From?" 
                className="flex-1 border-0 shadow-none focus-visible:ring-0 h-full px-0 text-sm placeholder:text-gray-500" 
              />
              <div className="h-8 w-px bg-gray-300" />
              <Input 
                placeholder="To?" 
                className="flex-1 border-0 shadow-none focus-visible:ring-0 h-full px-0 text-sm placeholder:text-gray-500" 
              />
              <div className="h-8 w-px bg-gray-300" />
              <div className="flex-1">
                <DatePicker 
                  date={selectedDate}
                  onDateChange={setSelectedDate}
                  placeholder="Date?"
                  variant="adobe"
                  className="border-0 shadow-none h-8 px-0 text-sm bg-white hover:bg-white focus:ring-0 w-full justify-start"
                />
              </div>
              <div className="h-8 w-px bg-gray-300" />
              <Input 
                placeholder="Category" 
                className="flex-1 border-0 shadow-none focus-visible:ring-0 h-full px-0 text-sm placeholder:text-gray-500" 
              />
              <Button 
                className="rounded-full h-10 px-6 shrink-0 font-semibold"
                style={{ backgroundColor: SLACK_AUBERGINE_HEX, color: "#ffffff" }}
                onClick={() => window.location.href = "/search"}
              >
                Search
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 justify-self-end pr-0 h-full">
          <div className="w-16 h-16 bg-gray-200 rounded-xl animate-[slideUpDown_3s_ease-in-out_infinite]" style={{ animationDelay: '0s' }} />
          <div className="w-16 h-16 bg-gray-200 rounded-xl animate-[slideUpDown_3s_ease-in-out_infinite]" style={{ animationDelay: '0.5s' }} />
          <div className="w-16 h-16 bg-gray-200 rounded-xl animate-[slideUpDown_3s_ease-in-out_infinite]" style={{ animationDelay: '1s' }} />
          <div className="w-16 h-16 bg-gray-200 rounded-xl animate-[slideUpDown_3s_ease-in-out_infinite]" style={{ animationDelay: '1.5s' }} />
          <div className="w-16 h-16 bg-gray-200 rounded-xl animate-[slideUpDown_3s_ease-in-out_infinite]" style={{ animationDelay: '0.3s' }} />
          <div className="w-16 h-16 bg-gray-200 rounded-xl animate-[slideUpDown_3s_ease-in-out_infinite]" style={{ animationDelay: '0.8s' }} />
          <div className="w-16 h-16 bg-gray-200 rounded-xl animate-[slideUpDown_3s_ease-in-out_infinite]" style={{ animationDelay: '1.3s' }} />
          <div className="w-16 h-16 bg-gray-200 rounded-xl animate-[slideUpDown_3s_ease-in-out_infinite]" style={{ animationDelay: '1.8s' }} />
        </div>
      </section>

      {/* Recent Searches Section */}
      <section className="w-full max-w-7xl mx-auto px-4 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Your recent searches</h2>
          <Button variant="link" className="text-sm">Start a new search</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="group cursor-pointer">
            <ImageCarousel images={4} badge="Guest favorite" isNew />
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm">Montréal → Paris</h3>
                <div className="flex items-center gap-0.5">
                  <Star className="w-3 h-3 fill-black text-black" />
                  <span className="text-xs font-medium">5.0</span>
                </div>
              </div>
              <p className="text-sm text-gray-600">1 parcel, Standard</p>
              <p className="text-sm text-gray-600">Oct 19 - Nov 6</p>
              <div className="mt-1">
                <span className="font-semibold text-base">$72</span> <span className="text-sm text-gray-600">total</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Routes Section */}
      <section className="w-full max-w-7xl mx-auto px-4 lg:px-8 py-12">
        <h2 className="text-2xl font-bold mb-6">Popular delivery routes under $80</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {[
            { city: "Toronto", duration: "1h, direct", dates: "Nov 11 - 15", price: "$42", badge: "Superhost", images: 5, isNew: true },
            { city: "Vancouver", duration: "1h 40m, direct", dates: "Nov 13 - 16", price: "$51", badge: "Guest favorite", images: 3, isNew: false },
            { city: "Calgary", duration: "1h 30m, direct", dates: "Nov 13 - 16", price: "$51", badge: null, images: 4, isNew: false },
            { city: "Ottawa", duration: "1h 29m, direct", dates: "Nov 14 - 17", price: "$53", badge: "Superhost", images: 3, isNew: true },
            { city: "Halifax", duration: "3h 10m, direct", dates: "Nov 19 - 26", price: "$55", badge: null, images: 4, isNew: false },
          ].map((route, idx) => (
            <div key={idx} className="group cursor-pointer">
              <ImageCarousel images={route.images} badge={route.badge || undefined} isNew={route.isNew} />
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm">{route.city}</h3>
                  <div className="flex items-center gap-0.5">
                    <Star className="w-3 h-3 fill-black text-black" />
                    <span className="text-xs font-medium">4.9</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{route.duration}</p>
                <p className="text-sm text-gray-600">{route.dates}</p>
                <div className="mt-1">
                  <span className="font-semibold text-base">{route.price}</span> <span className="text-sm text-gray-600">total</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="w-full max-w-7xl mx-auto px-4 lg:px-8 py-12">
        <h2 className="text-2xl font-bold mb-6">Browse by category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { label: "Documents", desc: "Papers, contracts" },
            { label: "Electronics", desc: "Phones, laptops" },
            { label: "Food", desc: "Meals, groceries" },
            { label: "Shopping", desc: "Clothes, accessories" },
            { label: "Business", desc: "Samples, prototypes" },
            { label: "Gifts", desc: "Presents, surprises" },
          ].map((category, idx) => (
            <div
              key={idx}
              className="group cursor-pointer p-5 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all"
            >
              <div className="flex flex-col items-start gap-3">
                <div className="w-12 h-12 rounded-lg bg-gray-200 group-hover:bg-gray-300 transition-colors" />
                <div>
                  <h3 className="font-semibold text-sm mb-0.5">{category.label}</h3>
                  <p className="text-xs text-gray-600">{category.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
