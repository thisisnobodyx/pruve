import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/layout/CustomCursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Pruve.ca — AI Automation Agency",
    template: "%s | Pruve.ca",
  },
  description:
    "We build AI agents, automations, and intelligent systems that run your business while you focus on what matters.",
  keywords: [
    "AI automation",
    "AI agents",
    "WhatsApp bot",
    "business automation",
    "workflow automation",
    "AI receptionist",
  ],
  authors: [{ name: "Pruve.ca" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pruve.ca",
    siteName: "Pruve.ca",
    title: "Pruve.ca — AI Automation Agency",
    description:
      "We build AI agents, automations, and intelligent systems that run your business while you focus on what matters.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pruve.ca — AI Automation Agency",
    description:
      "We build AI agents, automations, and intelligent systems that run your business while you focus on what matters.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} font-body bg-bg text-white antialiased`}
      >
        <CustomCursor />
        <Nav />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
