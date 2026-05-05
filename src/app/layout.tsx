import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ScannerGridBackground from "@/components/backgrounds/ScannerGridBackground";
import SiteNavbar from "@/components/navigation/SiteNavbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Derek Hoang | Portfolio",
  description: "Derek Hoang's personal portfolio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ScannerGridBackground />
        <div className="relative z-10 flex min-h-screen flex-col">
          <SiteNavbar />
          {children}
        </div>
      </body>
    </html>
  );
}
