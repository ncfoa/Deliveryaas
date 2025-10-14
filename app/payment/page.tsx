"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SLACK_AUBERGINE_HEX } from "@/lib/colors";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

export default function PaymentPage() {
  const router = useRouter();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods = [
    {
      id: "paypal",
      name: "PayPal",
      description: "Pay securely with your PayPal account",
      logoUrl: "https://img.logo.dev/paypal.com?token=pk_BVIA_DVkRsqy-YEgTE6h5Q"
    },
    {
      id: "stripe",
      name: "Stripe",
      description: "Pay with credit or debit card",
      logoUrl: "https://img.logo.dev/stripe.com?token=pk_BVIA_DVkRsqy-YEgTE6h5Q"
    },
    {
      id: "clicktopay",
      name: "Clicktopay",
      description: "Secure payment processing",
      logoUrl: "https://img.logo.dev/mastercard.com.au?token=pk_BVIA_DVkRsqy-YEgTE6h5Q"
    }
  ];

  const handlePayment = async () => {
    if (!selectedPaymentMethod) return;
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      // Navigate to confirmation page after successful payment
      router.push('/confirmation');
    }, 2000);
  };

  return (
    <main className="w-full bg-gray-50 font-['CentraNo2']">
      <div className="max-w-6xl mx-auto px-4 lg:px-8 lg:pr-16 py-4 space-y-4">
        {/* Header */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <button
                onClick={() => router.back()}
                className="mb-4 text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Booking
              </button>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Complete Payment</h1>
              <p className="text-gray-600">Choose your preferred payment method to secure your delivery</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4">
          {/* Payment Methods */}
          <div className="space-y-4">
            <Card className="border border-gray-200 shadow-sm bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">Payment Methods</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                      selectedPaymentMethod === method.id
                        ? 'border-gray-400 bg-gray-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedPaymentMethod(method.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded flex items-center justify-center">
                        <Image
                          src={method.logoUrl}
                          alt={`${method.name} logo`}
                          width={32}
                          height={32}
                          className="rounded"
                          unoptimized
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{method.name}</h3>
                        <p className="text-sm text-gray-600">{method.description}</p>
                      </div>
                      {selectedPaymentMethod === method.id && (
                        <div className="w-5 h-5 bg-gray-600 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Security Notice */}
            <Card className="border border-gray-200 bg-white">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-gray-600 rounded flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 bg-white rounded"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Secure Payment</h4>
                    <p className="text-sm text-gray-700">
                      Your payment information is encrypted and processed securely. 
                      We never store your payment details.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-4">
            <Card className="border border-gray-200 shadow-sm bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Delivery Route */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Delivery Route</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div>Montreal → Paris</div>
                    <div>1 day • 2 legs</div>
                  </div>
                </div>

                {/* Package Details */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Package Details</h4>
                  <div className="text-sm text-gray-600">
                    Small Box • 1kg max
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Base Delivery</span>
                      <span className="font-medium">$77.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Insurance</span>
                      <span className="font-medium">$5.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Express Service</span>
                      <span className="font-medium">$15.00</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2">
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span style={{ color: SLACK_AUBERGINE_HEX }}>$97.00</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Button */}
                <Button
                  onClick={handlePayment}
                  disabled={!selectedPaymentMethod || isProcessing}
                  className="w-full h-12 text-base font-semibold cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-50"
                  style={{ backgroundColor: SLACK_AUBERGINE_HEX, color: "#ffffff" }}
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </div>
                  ) : (
                    `Pay with ${paymentMethods.find(m => m.id === selectedPaymentMethod)?.name || 'Selected Method'}`
                  )}
                </Button>

                {/* Security Badge */}
                <div className="text-center">
                  <Badge variant="outline" className="text-xs text-gray-600 border-gray-300">
                    SSL Encrypted
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}