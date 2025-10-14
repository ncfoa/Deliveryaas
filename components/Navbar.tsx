"use client"

import { Button } from "@/components/ui/button";
import { Menu, User, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle, CardDescription as CDesc } from "@/components/ui/card";
import { brandColors } from "@/lib/colors";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"login" | "email" | "otp">("login");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  return (
    <header className="w-full">
      <nav className="w-full h-16 lg:h-20 flex items-center justify-between border-b border-gray-200 px-3 sm:px-4 lg:px-6">
        <div className="flex items-center gap-3">
          <button aria-label="Menu" className="p-3 rounded-md hover:bg-gray-100 cursor-pointer">
            <Menu className="w-5 h-5 text-gray-500" />
          </button>
          <Link href="/" className="flex items-center gap-2 text-lg md:text-xl font-semibold text-black tracking-tight">
            <img src="https://img.icons8.com/doodle/48/paper-plane--v1.png" alt="Tazmenia logo" className="h-6 w-6" />
            Tazmenia
          </Link>
        </div>
        <div>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full bg-white text-black border-gray-300 hover:bg-gray-50 flex items-center gap-2"
            onClick={() => { setOpen(true); setStep("login"); }}
          >
            <User className="w-5 h-5" />
            Connexion
          </Button>
        </div>
      </nav>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg bg-white">
          <DialogTitle className="sr-only">
            {step === "login" && "Sign in to Tazmenia"}
            {step === "email" && "Enter your email"}
            {step === "otp" && "Verify your email"}
          </DialogTitle>
          {step !== "login" && (
            <div className="mb-2">
              <button
                onClick={() => setStep(step === "email" ? "login" : "email")}
                className="inline-flex items-center gap-2 text-sm text-gray-700 hover:underline"
              >
                <ArrowLeft className="w-4 h-4" /> Retour
              </button>
            </div>
          )}
          {step === "login" && (
            <Card variant="adobeMinimal" className="border-0 shadow-none">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-adobe">Tout d'abord, saisissez votre e‑mail</CardTitle>
                <CDesc className="font-adobe">Nous vous suggérons d'utiliser l'adresse e‑mail que vous utilisez au travail.</CDesc>
              </CardHeader>
              <CardContent className="space-y-5 pt-0">
                <Button
                  size="lg"
                  className="w-full rounded-full px-5 font-adobe font-semibold hover:brightness-90 cursor-pointer flex items-center justify-center gap-2 text-base"
                  style={{ backgroundColor: "#ffffff", color: brandColors.blueDark, border: `2px solid ${brandColors.blueDark}` }}
                  onClick={() => setStep("email")}
                >
                  Continuer avec l'adresse e‑mail
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
              </CardContent>
            </Card>
          )}
          {step === "email" && (
            <div className="space-y-4">
              <DialogHeader>
                <DialogTitle className="font-adobe">Entrez votre adresse e‑mail</DialogTitle>
                <DialogDescription className="font-adobe">Nous vous enverrons un code à 6 chiffres.</DialogDescription>
              </DialogHeader>
              <Input type="email" placeholder="votre@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              <Button disabled={!email.includes("@")} onClick={() => setStep("otp")} className="w-full rounded-full font-adobe" style={{ backgroundColor: brandColors.blueDark, color: "#ffffff" }}>Continuer</Button>
            </div>
          )}
          {step === "otp" && (
            <div className="space-y-4">
              <DialogHeader>
                <DialogTitle className="font-adobe">Please verify your email address</DialogTitle>
                <DialogDescription className="font-adobe">We just sent a 6-digit verification code to your email: <strong>{email || "your email"}</strong>. Please enter the code within 10 minutes.</DialogDescription>
              </DialogHeader>
              <Input inputMode="numeric" pattern="[0-9]*" placeholder="123456" value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))} className="text-center tracking-widest font-mono text-lg" maxLength={6} />
              <div className="text-sm text-gray-600 font-adobe">Can't find the email? Try checking your spam folder, or <button className="underline" onClick={() => console.log('resend')}>send a new code</button></div>
              <Button disabled={otp.length !== 6} className="w-full rounded-full font-adobe" style={{ backgroundColor: brandColors.blueDark, color: "#ffffff" }}>Verify</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </header>
  );
}


