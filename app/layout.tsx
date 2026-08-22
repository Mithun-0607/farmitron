import type { Metadata } from "next";
import { Outfit, Newsreader } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FARMiTRON | AI Agricultural Intelligence Platform",
  description: "Smarter Decisions. Stronger Harvests. AI-powered crop intelligence, plant disease detection, weather-aware insights, and accessible farm assistance for small and marginal farmers in India.",
  keywords: ["Agritech", "India Farming", "AI Crop Advisor", "Plant Disease Detection", "Weather Intelligence", "Kharif Rabi Crops"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F7F5EF] text-[#17221C]">
        <Navigation />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
