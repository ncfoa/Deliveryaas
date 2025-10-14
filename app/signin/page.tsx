"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { brandColors } from "@/lib/colors";
import Image from "next/image";
import { Mail } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();
  return (
    <>
      <div className="w-screen flex items-start justify-center bg-gray-50 pt-6 mb-10">
        <div className="w-full max-w-md px-4 sm:px-6 md:px-0 mt-10">
          <Card variant="adobeMinimal" className="overflow-hidden border-1 border-gray-200 rounded-xl">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <CardTitle className="text-xl font-adobe">Tout d’abord, saisissez votre e-mail</CardTitle>
              </div>
              <CardDescription className="font-adobe">Nous vous suggérons d’utiliser l’adresse e-mail que vous utilisez au travail.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 pt-0">
              <Button
                size="lg"
                className="w-full rounded-full px-5 font-adobe font-semibold hover:brightness-90 cursor-pointer flex items-center justify-center gap-2 text-base"
                style={{ backgroundColor: "#ffffff", color: brandColors.blueDark, border: `2px solid ${brandColors.blueDark}` }}
                onClick={() => router.push("/signin/email")}
              >
                <Mail className="w-5 h-5" /> Continuer avec l'adresse e-mail
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500 font-adobe">ou</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full rounded-full px-5 font-adobe bg-white hover:bg-gray-50 text-black border-gray-300 cursor-pointer flex items-center justify-center gap-2"
                  onClick={() => { console.log("Continue with Google"); }}
                >
                  <Image src="/google.svg" width={20} height={20} alt="Google" className="h-5 w-5" />
                  <span className="leading-none">Google</span>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full rounded-full px-5 font-adobe bg-white hover:bg-gray-50 text-black border-gray-300 cursor-pointer flex items-center justify-center gap-2"
                  onClick={() => { console.log("Continue with Apple"); }}
                >
                  <Image src="/apple.svg" width={20} height={20} alt="Apple" className="h-5 w-5" />
                  <span className="leading-none">Apple</span>
                </Button>
              </div>

              <div className="space-y-3 text-xs text-gray-600 font-adobe leading-relaxed">
                <p>
                  En saisissant votre adresse e-mail et en poursuivant, vous créerez un nouvel espace de travail ou serez dirigé(e)
                  vers des espaces de travail ou des invitations existants associés à votre adresse e-mail.
                </p>
                <p>
                  En créant un espace de travail, vous acceptez l’Accord de services principaux, les Conditions d’utilisation, et les
                  Conditions supplémentaires de Tazmania. Des informations complémentaires sont disponibles dans notre Politique de
                  confidentialité et notre Politique en matière de cookies.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

    </>
  );
}
