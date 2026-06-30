import type { Metadata } from "next";
import { Cormorant_Garamond, Libre_Baskerville, Geist_Mono } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CursorGlow } from "@/components/CursorGlow";
import { CursorProvider } from "@/contexts/CursorContext";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const libreBaskerville = Libre_Baskerville({
  variable: "--font-libre-baskerville",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nick Omori",
  description: "Product manager.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${libreBaskerville.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <CursorProvider>
            <CursorGlow />
            <SiteHeader />
            {children}
          </CursorProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
