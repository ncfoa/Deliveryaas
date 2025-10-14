"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SLACK_AUBERGINE_HEX, SLACK_GREEN_HEX } from "@/lib/colors";
import { useRouter } from "next/navigation";
import { CheckCircle, MapPin, Clock, Package, Download, ArrowLeft, Calendar, User, Phone, Mail } from "lucide-react";

export default function ConfirmationPage() {
  const router = useRouter();

  const bookingDetails = {
    id: "#ZT-2024-001",
    totalCost: "$97.00",
    expectedDelivery: "Jan 16, 2024",
    status: "Confirmed",
    paymentMethod: "PayPal"
  };

  const tripDetails = [
    {
      leg: 1,
      airline: "aircanada",
      from: "Montreal",
      to: "Paris",
      date: "Jan 15, 17:50 → Jan 16, 06:50",
      duration: "7h 00m",
      packageArrival: "Jan 16, 07:30"
    },
    {
      leg: 2,
      airline: "tunisair",
      from: "Paris",
      to: "Tunis",
      date: "Jan 16, 14:30 → Jan 16, 17:00",
      duration: "2h 30m",
      packageArrival: "Jan 16, 17:45"
    }
  ];

  const senderInfo = {
    name: "John Smith",
    email: "john@example.com",
    phone: "+1 (555) 123-4567"
  };

  const recipientInfo = {
    name: "Marie Dubois",
    email: "marie@example.com",
    phone: "+33 1 23 45 67 89"
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600">Your package delivery has been successfully booked</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
          {/* Main Content */}
          <div className="space-y-6">
            {/* Booking Details */}
            <Card>
              <CardHeader>
                <CardTitle>Booking Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Booking ID:</span>
                    <span className="ml-2 font-mono font-semibold">{bookingDetails.id}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Total Cost:</span>
                    <span className="ml-2 font-semibold">{bookingDetails.totalCost}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Expected Delivery:</span>
                    <span className="ml-2">{bookingDetails.expectedDelivery}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Payment Method:</span>
                    <span className="ml-2">{bookingDetails.paymentMethod}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <Badge 
                    className="text-white"
                    style={{ backgroundColor: SLACK_GREEN_HEX }}
                  >
                    ✓ {bookingDetails.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Trip Details */}
            <Card>
              <CardHeader>
                <CardTitle>Delivery Route</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tripDetails.map((trip, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                          <span className="text-xs font-bold text-gray-600">{trip.airline}</span>
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{trip.from} → {trip.to}</div>
                          <div className="text-sm text-gray-500">Leg {trip.leg} • {trip.duration}</div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>{trip.date}</div>
                        <div>Package arrives: {trip.packageArrival}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Sender</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span>{senderInfo.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span>{senderInfo.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span>{senderInfo.phone}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recipient</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span>{recipientInfo.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span>{recipientInfo.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span>{recipientInfo.phone}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Next Steps */}
            <Card>
              <CardHeader>
                <CardTitle>What's Next?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-blue-600">1</span>
                  </div>
                  <div>
                    <div className="font-medium text-sm">Confirmation Email</div>
                    <div className="text-xs text-gray-600">You'll receive booking details shortly</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-blue-600">2</span>
                  </div>
                  <div>
                    <div className="font-medium text-sm">Traveler Assignment</div>
                    <div className="text-xs text-gray-600">We'll match you with verified travelers</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-blue-600">3</span>
                  </div>
                  <div>
                    <div className="font-medium text-sm">Real-time Tracking</div>
                    <div className="text-xs text-gray-600">Monitor your package's journey</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <Button
                  onClick={() => router.push('/')}
                  className="w-full"
                  style={{ backgroundColor: SLACK_AUBERGINE_HEX, color: "#ffffff" }}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Receipt
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.push('/')}
                  className="w-full"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </CardContent>
            </Card>

            {/* Support */}
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Need Help?</h4>
                <p className="text-sm text-blue-700 mb-3">
                  Our support team is here to help with any questions about your delivery.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
