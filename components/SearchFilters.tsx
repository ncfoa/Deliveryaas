"use client"

import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function SearchFilters() {
  return (
    <aside className="space-y-4">
      {/* Package Details */}
      <Card className="border border-gray-200 shadow-sm">
        <CardContent className="p-4">
          <div>
            <h3 className="font-semibold text-sm mb-3 text-gray-900">Package Details</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-600 mb-1 block">Weight (kg)</label>
                <div className="flex gap-2">
                  <Input placeholder="Min" className="text-xs h-8" />
                  <Input placeholder="Max" className="text-xs h-8" />
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-600 mb-1 block">Dimensions (cm)</label>
                <div className="grid grid-cols-3 gap-2">
                  <Input placeholder="L" className="text-xs h-8" />
                  <Input placeholder="W" className="text-xs h-8" />
                  <Input placeholder="H" className="text-xs h-8" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Package Type */}
      <Card className="border border-gray-200 shadow-sm">
        <CardContent className="p-4">
          <div>
            <h3 className="font-semibold text-sm mb-3 text-gray-900">Package Type</h3>
            <div className="space-y-2">
              {[
                { label: "Documents", desc: "Letters, contracts", price: "Base" },
                { label: "Electronics", desc: "Phones, laptops", price: "+$5" },
                { label: "Clothing", desc: "Clothes, shoes", price: "Base" },
                { label: "Fragile", desc: "Glass, ceramics", price: "+$8" },
                { label: "Perishable", desc: "Food, medicine", price: "+$12" },
                { label: "Valuable", desc: "Jewelry, cash", price: "+$15" },
              ].map((type, idx) => (
                <label key={idx} className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded text-xs">
                  <div className="flex items-center gap-2">
                    <Checkbox className="h-4 w-4" />
                    <div>
                      <div className="font-medium">{type.label}</div>
                      <div className="text-gray-500 text-xs">{type.desc}</div>
                    </div>
                  </div>
                  <span className="text-gray-600 text-xs">{type.price}</span>
                </label>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transport Method */}
      <Card className="border border-gray-200 shadow-sm">
        <CardContent className="p-4">
          <div>
            <h3 className="font-semibold text-sm mb-3 text-gray-900">Transport Method</h3>
            <div className="space-y-2">
              {[
                { label: "Air Travel", desc: "Fastest, most expensive" },
                { label: "Ground Transport", desc: "Reliable, cost-effective" },
                { label: "Mixed Transport", desc: "Flexible routing" },
              ].map((method, idx) => (
                <label key={idx} className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded text-xs">
                  <div className="flex items-center gap-2">
                    <Checkbox className="h-4 w-4" />
                    <div>
                      <div className="font-medium">{method.label}</div>
                      <div className="text-gray-500 text-xs">{method.desc}</div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security & Insurance */}
      <Card className="border border-gray-200 shadow-sm">
        <CardContent className="p-4">
          <div>
            <h3 className="font-semibold text-sm mb-3 text-gray-900">Security & Insurance</h3>
            <div className="space-y-2">
              {[
                { label: "Insured Delivery", price: "+$8", badge: "Recommended" },
                { label: "Photo Proof", price: "Free", badge: "Standard" },
                { label: "Signature Required", price: "+$3", badge: "Secure" },
                { label: "Temperature Controlled", price: "+$12", badge: "Special" },
              ].map((security, idx) => (
                <label key={idx} className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded text-xs">
                  <div className="flex items-center gap-2">
                    <Checkbox className="h-4 w-4" />
                    <span>{security.label}</span>
                    <Badge variant="outline" className="text-xs px-2 py-1">
                      {security.badge}
                    </Badge>
                  </div>
                  <span className="text-gray-600 text-xs">{security.price}</span>
                </label>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Traveler Rating */}
      <Card className="border border-gray-200 shadow-sm">
        <CardContent className="p-4">
          <div>
            <h3 className="font-semibold text-sm mb-3 text-gray-900">Traveler Rating</h3>
            <div className="space-y-2">
              {[
                { label: "5.0 stars", count: "12 travelers" },
                { label: "4.5+ stars", count: "45 travelers" },
                { label: "4.0+ stars", count: "78 travelers" },
                { label: "3.5+ stars", count: "23 travelers" },
              ].map((rating, idx) => (
                <label key={idx} className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded text-xs">
                  <div className="flex items-center gap-2">
                    <Checkbox className="h-4 w-4" />
                    <span>{rating.label}</span>
                  </div>
                  <span className="text-gray-600 text-xs">{rating.count}</span>
                </label>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Price Range */}
      <Card className="border border-gray-200 shadow-sm">
        <CardContent className="p-4">
          <div>
            <h3 className="font-semibold text-sm mb-3 text-gray-900">Price Range</h3>
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input placeholder="Min $50" className="text-xs h-8" />
                <Input placeholder="Max $500" className="text-xs h-8" />
              </div>
              <div className="text-xs text-gray-500">
                Express delivery costs 20-40% more
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Route Preferences */}
      <Card className="border border-gray-200 shadow-sm">
        <CardContent className="p-4">
          <div>
            <h3 className="font-semibold text-sm mb-3 text-gray-900">Route Preferences</h3>
            <div className="space-y-2">
              {[
                { label: "Direct route only", desc: "No stops" },
                { label: "Allow 1 stop", desc: "Cost savings" },
                { label: "Allow multiple stops", desc: "Maximum savings" },
                { label: "Custom route", desc: "Specify waypoints" },
              ].map((route, idx) => (
                <label key={idx} className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded text-xs">
                  <div className="flex items-center gap-2">
                    <Checkbox className="h-4 w-4" />
                    <div>
                      <div className="font-medium">{route.label}</div>
                      <div className="text-gray-500 text-xs">{route.desc}</div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Clear Filters */}
      <div className="pt-4">
        <Button variant="outline" size="sm" className="w-full h-10 text-sm cursor-pointer hover:bg-gray-50 transition-colors">
          Clear All Filters
        </Button>
      </div>
    </aside>
  );
}
