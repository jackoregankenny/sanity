import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { LanguageSelector } from "@/components/LanguageSelector";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Life Scientific",
  description: "Life Scientific Product Catalog",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          <div className="min-h-screen bg-background">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="container flex h-14 items-center">
                <div className="mr-4 flex">
                  <Link className="mr-6 flex items-center space-x-2" href="/">
                    <span className="font-bold">Life Scientific</span>
                  </Link>
                </div>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                  <nav className="flex items-center">
                    <LanguageSelector />
                  </nav>
                </div>
              </div>
            </header>
            <main>
              {children}
            </main>
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
