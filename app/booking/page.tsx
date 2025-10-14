"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SLACK_AUBERGINE_HEX, SLACK_GREEN_HEX, SLACK_YELLOW_HEX } from "@/lib/colors";
import { ChevronDown, ChevronUp, AlertTriangle, Info, Shield, Clock, Package, User, MapPin, CreditCard, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import AirlineLogo from "@/components/AirlineLogo";

interface BookingData {
  packageDetails: {
    type: string;
    weight: string;
    dimensions: string;
    value: string;
    fragile: boolean;
    insurance: boolean;
    description: string;
  };
  packagePhotos: {
    images: File[];
    previews: string[];
  };
  senderInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  recipientInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  deliveryPreferences: {
    preferredDate: string;
    preferredTime: string;
    urgency: string;
    confirmationMethod: string;
    specialInstructions: string;
  };
  extras: {
    tracking: boolean;
    insurance: boolean;
    signature: boolean;
    photos: boolean;
  };
  payment: {
    method: string;
    total: string;
  };
}

export default function BookingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [expandedStep, setExpandedStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingData>({
    packageDetails: {
      type: "",
      weight: "",
      dimensions: "",
      value: "",
      fragile: false,
      insurance: false,
      description: "",
    },
    packagePhotos: {
      images: [],
      previews: [],
    },
    senderInfo: {
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      country: "",
    },
    recipientInfo: {
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      country: "",
    },
    deliveryPreferences: {
      preferredDate: "",
      preferredTime: "",
      urgency: "",
      confirmationMethod: "",
      specialInstructions: "",
    },
    extras: {
      tracking: false,
      insurance: false,
      signature: false,
      photos: false,
    },
    payment: {
      method: "",
      total: "$77",
    },
  });

  const steps = [
    {
      id: 1,
      title: "Package Details & Requirements",
      description: "Provide information about your package",
      completed: false,
      hasImage: true,
    },
    {
      id: 2,
      title: "Package Photos",
      description: "Upload images of your package items",
      completed: false,
      hasImage: true,
    },
    {
      id: 3,
      title: "Sender Information",
      description: "Your contact and pickup details",
      completed: false,
      hasImage: false,
    },
    {
      id: 4,
      title: "Recipient Information",
      description: "Delivery address and contact details",
      completed: false,
      hasImage: false,
    },
  ];

  const toggleStep = (stepId: number) => {
    setExpandedStep(expandedStep === stepId ? 0 : stepId);
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      setExpandedStep(currentStep + 1);
    } else {
      // Navigate to payment page when all steps are completed
      router.push('/payment');
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setExpandedStep(currentStep - 1);
    }
  };

  const updateBookingData = (section: keyof BookingData, field: string, value: any) => {
    setBookingData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      const newImages = [...bookingData.packagePhotos.images, ...files];
      const newPreviews = [...bookingData.packagePhotos.previews];
      
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          newPreviews.push(e.target?.result as string);
          setBookingData(prev => ({
            ...prev,
            packagePhotos: {
              images: newImages,
              previews: newPreviews,
            },
          }));
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    const newImages = bookingData.packagePhotos.images.filter((_, i) => i !== index);
    const newPreviews = bookingData.packagePhotos.previews.filter((_, i) => i !== index);
    setBookingData(prev => ({
      ...prev,
      packagePhotos: {
        images: newImages,
        previews: newPreviews,
      },
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Package Delivery</h1>
          <p className="text-gray-600">Follow the steps below to finalize your booking with our trusted travelers</p>
        </div>

        {/* Important Notice */}
        <div className="bg-gray-50 rounded-lg p-4 mb-8 border border-gray-200">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0 text-gray-500" />
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-1">Multi-Leg Delivery Notice</h3>
              <p className="text-xs text-gray-600">
                Your package will be handed off between different travelers during the journey. 
                Each traveler is verified and insured. You'll receive real-time updates at each handoff point.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
          {/* Main Content - Steps */}
          <div className="space-y-6">
            {steps.map((step, index) => {
              const isExpanded = expandedStep === step.id;
              const isCompleted = step.completed;
              const isCurrent = currentStep === step.id;

              return (
                <div key={step.id} className="bg-white rounded-lg border border-gray-200 shadow-sm">
                  {/* Step Header */}
                  <div
                    className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => toggleStep(step.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {/* Image Placeholder */}
                        {step.hasImage && (
                          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                            <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                              <span className="text-gray-400 text-xs">IMG</span>
                            </div>
                          </div>
                        )}
                        
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                          <p className="text-sm text-gray-600">{step.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {isCompleted && (
                          <Badge className="bg-gray-100 text-gray-700 border-gray-300">
                            Completed
                          </Badge>
                        )}
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Step Content */}
                  {isExpanded && (
                    <div className="px-6 pb-6 border-t border-gray-100">
                      {step.id === 1 && (
                        <div className="space-y-6 pt-6">
                          {/* Package Type Selection */}
                          <div>
                            <label className="block text-base font-medium text-gray-700 mb-4">
                              Package Type <span className="text-red-500">*</span>
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                              {/* Envelope */}
                              <div
                                className={`relative cursor-pointer rounded-lg border p-4 transition-all duration-200 hover:shadow-sm ${
                                  bookingData.packageDetails.type === 'envelope'
                                    ? 'border-gray-300 bg-gray-50'
                                    : 'border-gray-200 bg-white hover:border-gray-300'
                                }`}
                                onClick={() => updateBookingData('packageDetails', 'type', 'envelope')}
                              >
                                <div className="flex flex-col items-center text-center">
                                  <div className="w-12 h-12 mb-3 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <span className="text-gray-400 text-xs font-medium">IMG</span>
                                  </div>
                                  <h3 className="font-medium text-gray-900 mb-1 text-sm">Envelope</h3>
                                  <p className="text-xs text-gray-500">Documents, letters</p>
                                  <p className="text-xs text-gray-400 mt-1">Max: 200g</p>
                                </div>
                                {bookingData.packageDetails.type === 'envelope' && (
                                  <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center" style={{ backgroundColor: SLACK_AUBERGINE_HEX }}>
                                    <CheckCircle className="w-2.5 h-2.5 text-white" />
                                  </div>
                                )}
                              </div>

                              {/* Small Box */}
                              <div
                                className={`relative cursor-pointer rounded-lg border p-4 transition-all duration-200 hover:shadow-sm ${
                                  bookingData.packageDetails.type === 'small-box'
                                    ? 'border-gray-300 bg-gray-50'
                                    : 'border-gray-200 bg-white hover:border-gray-300'
                                }`}
                                onClick={() => updateBookingData('packageDetails', 'type', 'small-box')}
                              >
                                <div className="flex flex-col items-center text-center">
                                  <div className="w-12 h-12 mb-3 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <span className="text-gray-400 text-xs font-medium">IMG</span>
                                  </div>
                                  <h3 className="font-medium text-gray-900 mb-1 text-sm">Small Box</h3>
                                  <p className="text-xs text-gray-500">Electronics, books</p>
                                  <p className="text-xs text-gray-400 mt-1">Max: 1kg</p>
                                </div>
                                {bookingData.packageDetails.type === 'small-box' && (
                                  <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center" style={{ backgroundColor: SLACK_AUBERGINE_HEX }}>
                                    <CheckCircle className="w-2.5 h-2.5 text-white" />
                                  </div>
                                )}
                              </div>

                              {/* Medium Box */}
                              <div
                                className={`relative cursor-pointer rounded-lg border p-4 transition-all duration-200 hover:shadow-sm ${
                                  bookingData.packageDetails.type === 'medium-box'
                                    ? 'border-gray-300 bg-gray-50'
                                    : 'border-gray-200 bg-white hover:border-gray-300'
                                }`}
                                onClick={() => updateBookingData('packageDetails', 'type', 'medium-box')}
                              >
                                <div className="flex flex-col items-center text-center">
                                  <div className="w-12 h-12 mb-3 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <span className="text-gray-400 text-xs font-medium">IMG</span>
                                  </div>
                                  <h3 className="font-medium text-gray-900 mb-1 text-sm">Medium Box</h3>
                                  <p className="text-xs text-gray-500">Clothing, shoes</p>
                                  <p className="text-xs text-gray-400 mt-1">Max: 5kg</p>
                                </div>
                                {bookingData.packageDetails.type === 'medium-box' && (
                                  <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center" style={{ backgroundColor: SLACK_AUBERGINE_HEX }}>
                                    <CheckCircle className="w-2.5 h-2.5 text-white" />
                                  </div>
                                )}
                              </div>

                              {/* Luggage */}
                              <div
                                className={`relative cursor-pointer rounded-lg border p-4 transition-all duration-200 hover:shadow-sm ${
                                  bookingData.packageDetails.type === 'baggage'
                                    ? 'border-gray-300 bg-gray-50'
                                    : 'border-gray-200 bg-white hover:border-gray-300'
                                }`}
                                onClick={() => updateBookingData('packageDetails', 'type', 'baggage')}
                              >
                                <div className="flex flex-col items-center text-center">
                                  <div className="w-12 h-12 mb-3 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <span className="text-gray-400 text-xs font-medium">IMG</span>
                                  </div>
                                  <h3 className="font-medium text-gray-900 mb-1 text-sm">Luggage</h3>
                                  <p className="text-xs text-gray-500">Large items, suitcases</p>
                                  <p className="text-xs text-gray-400 mt-1">Max: 20kg</p>
                                </div>
                                {bookingData.packageDetails.type === 'baggage' && (
                                  <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center" style={{ backgroundColor: SLACK_AUBERGINE_HEX }}>
                                    <CheckCircle className="w-2.5 h-2.5 text-white" />
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Package Details */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-base font-medium text-gray-700 mb-2">
                                Declared Value ($) <span className="text-red-500">*</span>
                              </label>
                              <Input
                                className="h-12 text-base"
                                placeholder="e.g., 500"
                                value={bookingData.packageDetails.value}
                                onChange={(e) => updateBookingData('packageDetails', 'value', e.target.value)}
                              />
                              <p className="text-xs text-gray-500 mt-1">For insurance purposes</p>
                            </div>
                            <div>
                              <label className="block text-base font-medium text-gray-700 mb-2">
                                Package Description
                              </label>
                              <Input
                                className="h-12 text-base"
                                placeholder="Brief description of contents"
                                value={bookingData.packageDetails.description}
                                onChange={(e) => updateBookingData('packageDetails', 'description', e.target.value)}
                              />
                            </div>
                          </div>

                          {/* Special Requirements */}
                          <div className="space-y-4">
                            <h4 className="font-medium text-gray-900">Special Requirements</h4>
                            <div className="space-y-3">
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="fragile"
                                  checked={bookingData.packageDetails.fragile}
                                  onCheckedChange={(checked) => updateBookingData('packageDetails', 'fragile', checked)}
                                />
                                <label htmlFor="fragile" className="text-sm text-gray-700">
                                  This package contains fragile items (+$5 handling fee)
                                </label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="insurance"
                                  checked={bookingData.packageDetails.insurance}
                                  onCheckedChange={(checked) => updateBookingData('packageDetails', 'insurance', checked)}
                                />
                                <label htmlFor="insurance" className="text-sm text-gray-700">
                                  Add comprehensive insurance coverage (+$15)
                                </label>
                              </div>
                            </div>
                          </div>

                          {/* Guidelines */}
                          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                            <div>
                              <h4 className="text-xs font-medium text-gray-700 mb-2">Package Guidelines</h4>
                              <ul className="text-xs space-y-1 text-gray-600">
                                <li>• Ensure all items are properly packaged and secured</li>
                                <li>• Fragile items should be wrapped in bubble wrap</li>
                                <li>• Do not include prohibited items (liquids, batteries, etc.)</li>
                                <li>• Label your package with recipient information</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}

                      {step.id === 2 && (
                        <div className="space-y-6 pt-6">
                          {/* Header */}
                          <div className="text-center">
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">Package Photos</h4>
                            <p className="text-sm text-gray-600">
                              Upload clear photos to help travelers identify your package
                            </p>
                          </div>

                          {/* Upload Area */}
                          <div className="relative">
                            <input
                              type="file"
                              multiple
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                              id="package-photos"
                            />
                            <label
                              htmlFor="package-photos"
                              className="block cursor-pointer"
                            >
                              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-gray-400 hover:bg-gray-50 transition-all duration-200">
                                <div className="flex flex-col items-center gap-4">
                                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                                    <Package className="w-6 h-6 text-gray-500" />
                                  </div>
                                  <div>
                                    <p className="text-base font-medium text-gray-900 mb-1">Upload Photos</p>
                                    <p className="text-sm text-gray-500">Click to browse or drag and drop</p>
                                  </div>
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="px-4 py-2 text-sm"
                                    style={{ borderColor: SLACK_AUBERGINE_HEX, color: SLACK_AUBERGINE_HEX }}
                                  >
                                    Choose Files
                                  </Button>
                                </div>
                              </div>
                            </label>
                          </div>

                          {/* Image Previews */}
                          {bookingData.packagePhotos.previews.length > 0 && (
                            <div>
                              <div className="flex items-center justify-between mb-4">
                                <h5 className="text-sm font-medium text-gray-900">
                                  Photos ({bookingData.packagePhotos.previews.length}/10)
                                </h5>
                                <span className="text-xs text-gray-500">
                                  {bookingData.packagePhotos.previews.length < 10 ? `${10 - bookingData.packagePhotos.previews.length} more allowed` : 'Maximum reached'}
                                </span>
                              </div>
                              
                              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                {bookingData.packagePhotos.previews.map((preview, index) => (
                                  <div key={index} className="relative group">
                                    <div className="aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                                      <img
                                        src={preview}
                                        alt={`Package photo ${index + 1}`}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                    <button
                                      onClick={() => removeImage(index)}
                                      className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                                    >
                                      ×
                                    </button>
                                    <div className="absolute bottom-1 left-1 right-1">
                                      <div className="bg-black bg-opacity-50 rounded px-2 py-1">
                                        <p className="text-white text-xs text-center">Photo {index + 1}</p>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Guidelines */}
                          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <div className="flex items-start gap-3">
                              <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Info className="w-3 h-3 text-blue-600" />
                              </div>
                              <div>
                                <h4 className="text-sm font-medium text-gray-700 mb-2">Photo Tips</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-600">
                                  <div className="space-y-1">
                                    <p>• Use good lighting</p>
                                    <p>• Show all angles</p>
                                    <p>• Include packaging</p>
                                  </div>
                                  <div className="space-y-1">
                                    <p>• Keep photos in focus</p>
                                    <p>• Show any damage</p>
                                    <p>• Max 10 photos</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {step.id === 3 && (
                        <div className="space-y-6 pt-6">

                          {/* Security Notice */}
                          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                            <div className="flex items-start gap-3">
                              <Shield className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-500" />
                              <div>
                                <h4 className="text-xs font-medium text-gray-700 mb-1">Secure & Private</h4>
                                <p className="text-xs text-gray-600">
                                  Your information is encrypted and only shared with verified travelers.
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Personal Information */}
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Full Name <span className="text-red-500">*</span>
                                </label>
                                <Input
                                  className="h-11 text-sm"
                                  placeholder="Your full name"
                                  value={bookingData.senderInfo.name}
                                  onChange={(e) => updateBookingData('senderInfo', 'name', e.target.value)}
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Email Address <span className="text-red-500">*</span>
                                </label>
                                <Input
                                  className="h-11 text-sm"
                                  type="email"
                                  placeholder="your@email.com"
                                  value={bookingData.senderInfo.email}
                                  onChange={(e) => updateBookingData('senderInfo', 'email', e.target.value)}
                                />
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Country <span className="text-red-500">*</span>
                                </label>
                                <Select onValueChange={(value) => updateBookingData('senderInfo', 'country', value)}>
                                  <SelectTrigger className="h-11 text-sm px-3 py-2">
                                    <SelectValue placeholder="Select country" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="CA">🇨🇦 Canada</SelectItem>
                                    <SelectItem value="US">🇺🇸 United States</SelectItem>
                                    <SelectItem value="FR">🇫🇷 France</SelectItem>
                                    <SelectItem value="TN">🇹🇳 Tunisia</SelectItem>
                                    <SelectItem value="DE">🇩🇪 Germany</SelectItem>
                                    <SelectItem value="GB">🇬🇧 United Kingdom</SelectItem>
                                    <SelectItem value="IT">🇮🇹 Italy</SelectItem>
                                    <SelectItem value="ES">🇪🇸 Spain</SelectItem>
                                    <SelectItem value="NL">🇳🇱 Netherlands</SelectItem>
                                    <SelectItem value="BE">🇧🇪 Belgium</SelectItem>
                                    <SelectItem value="CH">🇨🇭 Switzerland</SelectItem>
                                    <SelectItem value="AT">🇦🇹 Austria</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Phone Number <span className="text-red-500">*</span>
                                </label>
                                <Input
                                  className="h-11 text-sm px-3 py-2"
                                  placeholder="+1 (555) 123-4567"
                                  value={bookingData.senderInfo.phone}
                                  onChange={(e) => updateBookingData('senderInfo', 'phone', e.target.value)}
                                />
                              </div>
                            </div>
                          </div>

                          {/* Address Information */}
                          <div className="space-y-4">
                            <h5 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-gray-500" />
                              Pickup Address
                            </h5>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Street Address <span className="text-red-500">*</span>
                              </label>
                              <Input
                                className="h-11 text-sm"
                                placeholder="123 Main Street, Apt 4B"
                                value={bookingData.senderInfo.address}
                                onChange={(e) => updateBookingData('senderInfo', 'address', e.target.value)}
                              />
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  City <span className="text-red-500">*</span>
                                </label>
                                <Input
                                  className="h-11 text-sm"
                                  placeholder="Montreal"
                                  value={bookingData.senderInfo.city}
                                  onChange={(e) => updateBookingData('senderInfo', 'city', e.target.value)}
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Postal Code <span className="text-red-500">*</span>
                                </label>
                                <Input
                                  className="h-11 text-sm"
                                  placeholder="H1A 1A1"
                                  value={bookingData.senderInfo.postalCode}
                                  onChange={(e) => updateBookingData('senderInfo', 'postalCode', e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {step.id === 4 && (
                        <div className="space-y-6 pt-6">
                          {/* Personal Information */}
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Recipient Name <span className="text-red-500">*</span>
                                </label>
                                <Input
                                  className="h-11 text-sm px-3 py-2"
                                  placeholder="Recipient's full name"
                                  value={bookingData.recipientInfo.name}
                                  onChange={(e) => updateBookingData('recipientInfo', 'name', e.target.value)}
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Email Address <span className="text-red-500">*</span>
                                </label>
                                <Input
                                  className="h-11 text-sm px-3 py-2"
                                  type="email"
                                  placeholder="recipient@email.com"
                                  value={bookingData.recipientInfo.email}
                                  onChange={(e) => updateBookingData('recipientInfo', 'email', e.target.value)}
                                />
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Country <span className="text-red-500">*</span>
                                </label>
                                <Select onValueChange={(value) => updateBookingData('recipientInfo', 'country', value)}>
                                  <SelectTrigger className="h-11 text-sm px-3 py-2">
                                    <SelectValue placeholder="Select country" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="CA">🇨🇦 Canada</SelectItem>
                                    <SelectItem value="US">🇺🇸 United States</SelectItem>
                                    <SelectItem value="FR">🇫🇷 France</SelectItem>
                                    <SelectItem value="TN">🇹🇳 Tunisia</SelectItem>
                                    <SelectItem value="DE">🇩🇪 Germany</SelectItem>
                                    <SelectItem value="GB">🇬🇧 United Kingdom</SelectItem>
                                    <SelectItem value="IT">🇮🇹 Italy</SelectItem>
                                    <SelectItem value="ES">🇪🇸 Spain</SelectItem>
                                    <SelectItem value="NL">🇳🇱 Netherlands</SelectItem>
                                    <SelectItem value="BE">🇧🇪 Belgium</SelectItem>
                                    <SelectItem value="CH">🇨🇭 Switzerland</SelectItem>
                                    <SelectItem value="AT">🇦🇹 Austria</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Phone Number <span className="text-red-500">*</span>
                                </label>
                                <Input
                                  className="h-11 text-sm px-3 py-2"
                                  placeholder="+1 (555) 123-4567"
                                  value={bookingData.recipientInfo.phone}
                                  onChange={(e) => updateBookingData('recipientInfo', 'phone', e.target.value)}
                                />
                              </div>
                            </div>
                          </div>

                          {/* Address Information */}
                          <div className="space-y-4">
                            <h5 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-gray-500" />
                              Delivery Address
                            </h5>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Street Address <span className="text-red-500">*</span>
                              </label>
                              <Input
                                className="h-11 text-sm px-3 py-2"
                                placeholder="123 Main Street, Apt 4B"
                                value={bookingData.recipientInfo.address}
                                onChange={(e) => updateBookingData('recipientInfo', 'address', e.target.value)}
                              />
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  City <span className="text-red-500">*</span>
                                </label>
                                <Input
                                  className="h-11 text-sm px-3 py-2"
                                  placeholder="Paris"
                                  value={bookingData.recipientInfo.city}
                                  onChange={(e) => updateBookingData('recipientInfo', 'city', e.target.value)}
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Postal Code <span className="text-red-500">*</span>
                                </label>
                                <Input
                                  className="h-11 text-sm px-3 py-2"
                                  placeholder="75001"
                                  value={bookingData.recipientInfo.postalCode}
                                  onChange={(e) => updateBookingData('recipientInfo', 'postalCode', e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}




                      {/* Step Actions */}
                      <div className="flex justify-between pt-6 border-t border-gray-100">
                        <Button
                          variant="outline"
                          onClick={prevStep}
                          disabled={currentStep === 1}
                          className="px-6"
                        >
                          Previous
                        </Button>
                        <Button
                          onClick={nextStep}
                          disabled={currentStep === steps.length}
                          className="px-6"
                          style={{ backgroundColor: SLACK_AUBERGINE_HEX, color: "#ffffff" }}
                        >
                          {currentStep === steps.length ? 'Proceed to Payment' : 'Next Step'}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Sidebar - Order Summary */}
          <div className="lg:sticky lg:top-8">
            <Card className="border border-gray-200 shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-900">Order Summary</h3>
                  <Badge variant="outline" className="text-gray-600 border-gray-300">
                    ✓ Verified
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Delivery Route */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-900">Montreal → Paris</div>
                    <div className="text-sm text-gray-600">1 day delivery</div>
                  </div>
                </div>

                {/* Trip Legs */}
                <div>
                  
                  <div className="space-y-3">
                    {/* Leg 1 */}
                    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3 mb-3">
                        <AirlineLogo
                          airlineCode="aircanada"
                          className="w-10 h-10"
                          width={40}
                          height={40}
                          fallbackText="AC"
                        />
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900">Montreal → Paris</div>
                          <div className="text-sm text-gray-600">Air Canada • 7h 00m</div>
                        </div>
                        <Badge variant="outline" className="text-gray-600 border-gray-300">Leg 1</Badge>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div className="flex items-center gap-2">
                          <Clock className="w-3 h-3" />
                          <span>Jan 15, 17:50 → Jan 16, 06:50</span>
                        </div>
                        <div className="text-gray-800 font-medium">
                          Arrives: Jan 16, 07:30
                        </div>
                      </div>
                    </div>

                    {/* Leg 2 */}
                    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3 mb-3">
                        <AirlineLogo
                          airlineCode="tunisair"
                          className="w-10 h-10"
                          width={40}
                          height={40}
                          fallbackText="TU"
                        />
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900">Paris → Tunis</div>
                          <div className="text-sm text-gray-600">Tunisair • 2h 30m</div>
                        </div>
                        <Badge variant="outline" className="text-gray-600 border-gray-300">Leg 2</Badge>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div className="flex items-center gap-2">
                          <Clock className="w-3 h-3" />
                          <span>Jan 16, 14:30 → Jan 16, 17:00</span>
                        </div>
                        <div className="text-gray-800 font-medium">
                          Final Arrival: Jan 16, 17:45
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Package Info */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-3">Package Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium text-gray-900">{bookingData.packageDetails.type || 'Not specified'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Weight:</span>
                      <span className="font-medium text-gray-900">{bookingData.packageDetails.weight || 'Not specified'} kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Value:</span>
                      <span className="font-medium text-gray-900">${bookingData.packageDetails.value || 'Not specified'}</span>
                    </div>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-4">Price Breakdown</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Base Delivery</span>
                      <span className="font-semibold text-gray-900">$77.00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Insurance</span>
                      <span className="font-semibold text-gray-900">$0.00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Express Service</span>
                      <span className="font-semibold text-gray-900">$0.00</span>
                    </div>
                    <div className="border-t border-gray-300 pt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-gray-900">Total</span>
                        <span className="text-2xl font-bold text-gray-900">$77.00</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Security & Trust */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Shield className="w-5 h-5 text-gray-600" />
                    <h4 className="font-bold text-gray-900">Secure & Insured</h4>
                  </div>
                  <p className="text-sm text-gray-700">
                    Your package is fully insured and tracked throughout the journey. 
                    All travelers are verified and background-checked.
                  </p>
                </div>

                {/* Terms */}
                <div className="text-xs text-gray-500 space-y-1">
                  <p>By proceeding, you agree to our Terms of Service and Privacy Policy.</p>
                  <p>All information provided must be accurate and complete.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}