import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


export const metadata: Metadata = {
  title: "PPD",
  description: "Peer to Peer Delivery",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
          {/* dark overlay over main content when sidebar expanded (not covering navbar) */}
            <Navbar />
            {children}
            <Footer />
      </body>
    </html>
  );
}
