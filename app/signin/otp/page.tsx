"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { brandColors } from "@/lib/colors";

export default function OtpPage() {
  const searchParams = useSearchParams();
  const emailFromQuery = searchParams.get("email") || "your email";
  const [code, setCode] = useState("");

  const handleChange = (val: string) => {
    const sanitized = val.replace(/\D/g, "").slice(0, 6);
    setCode(sanitized);
  };

  return (
    <div className="w-screen flex items-start justify-center bg-gray-50 pt-10 pb-10">
      <div className="w-full max-w-md px-4 sm:px-6 md:px-0">
        <Card variant="adobeMinimal" className="overflow-hidden border border-gray-200 rounded-2xl shadow-sm">
          <CardHeader className="pb-3">
            <div className="w-full h-32 bg-gray-100 rounded-md mb-3" />
            <CardTitle className="text-lg font-adobe">Please verify your email address</CardTitle>
            <CardDescription className="font-adobe">
              We just sent a 6-digit verification code to your email: <strong>{emailFromQuery}</strong>. Please enter the code within 10 minutes.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5 pt-0">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 font-adobe">verificationCodeLabel</label>
              <Input
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="123456"
                value={code}
                onChange={(e) => handleChange(e.target.value)}
                className="text-center tracking-widest font-mono text-lg"
                maxLength={6}
              />
            </div>
            <div className="text-sm text-gray-600 font-adobe">
              Can't find the email? Try checking your spam folder, or <button className="underline hover:opacity-80" onClick={() => console.log("resend code")}>send a new code</button>
            </div>
            <Button
              disabled={code.length !== 6}
              size="sm"
              className="w-full rounded-full font-adobe font-semibold hover:brightness-95 disabled:opacity-60"
              style={{ backgroundColor: brandColors.blueDark, color: "#ffffff" }}
            >
              Verify
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


