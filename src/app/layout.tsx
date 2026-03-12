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
    default: "Pruve — AI Employees for Your Business",
    template: "%s | Pruve",
  },
  description:
    "Pruve builds AI employees that answer calls, capture leads, manage social media, and automate your operations — so you can focus on growing your business.",
  keywords: [
    "AI automation agency",
    "AI employees for small business",
    "AI agents",
    "WhatsApp bot",
    "business automation",
    "workflow automation",
    "AI receptionist",
    "lead capture automation",
    "social media AI",
    "web design agency",
    "SEO services",
  ],
  authors: [{ name: "Pruve" }],
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://pruve.ca",
    siteName: "Pruve",
    title: "Pruve — AI Employees for Your Business",
    description:
      "Pruve builds AI employees that answer calls, capture leads, manage social media, and automate your operations — so you can focus on growing your business.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pruve — AI Employees for Your Business",
    description:
      "Pruve builds AI employees that answer calls, capture leads, manage social media, and automate your operations — so you can focus on growing your business.",
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
