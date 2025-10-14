"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { brandColors } from "@/lib/colors";
import { useRouter } from "next/navigation";

export default function SignInEmail() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const isValid = email.trim().length > 3 && email.includes("@");
  return (
    <div className="w-screen flex items-start justify-center bg-gray-50 pt-10 pb-10">
      <div className="w-full max-w-md px-4 sm:px-6 md:px-0">
        <div className="mb-4">
          <Link href="/signin" className="inline-flex items-center gap-2 text-sm text-gray-700 hover:underline">
            <ArrowLeft className="w-4 h-4" /> Retour
          </Link>
        </div>
        <Card variant="adobeMinimal" className="overflow-hidden border border-gray-200 rounded-2xl shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                <Mail className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <CardTitle className="text-lg font-adobe">Entrez votre adresse e‑mail</CardTitle>
                <CardDescription className="font-adobe">Nous vous enverrons un lien pour continuer avec Tazmenia.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-5 pt-0">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 font-adobe">Adresse e‑mail</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 font-adobe"
                />
              </div>
              <p className="text-xs text-gray-500 font-adobe">Nous ne partagerons pas votre e‑mail. Vous pourrez changer plus tard.</p>
            </div>

            <Button
              size="sm"
              className="w-full rounded-full px-5 font-adobe font-semibold"
              style={{ backgroundColor: brandColors.blueDark, color: "#ffffff" }}
              onClick={() => { router.push(`/signin/otp?email=${encodeURIComponent(email)}`) }}
              disabled={!isValid}
            >
              Continuer
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


