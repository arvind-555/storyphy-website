import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/chrome/Header";
import { Footer } from "@/components/chrome/Footer";
import { StickyMobileBar } from "@/components/chrome/StickyMobileBar";
import { WhatsAppFab } from "@/components/chrome/WhatsAppFab";

const fredoka = Fredoka({ subsets: ["latin"], variable: "--font-fredoka" });
const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });

export const metadata: Metadata = {
  title: "Storyphy - Personalized storybooks where your child is the hero",
  description:
    "Premium personalized hardcover storybooks. You approve the preview before we print. Delivered across India in 7-10 days.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fredoka.variable} ${nunito.variable}`}>
      <body className="pb-20 md:pb-0">
        <Header />
        <main>{children}</main>
        <Footer />
        <StickyMobileBar />
        <WhatsAppFab />
      </body>
    </html>
  );
}
