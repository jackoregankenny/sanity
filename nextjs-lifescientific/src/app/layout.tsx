import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { LanguageSelector } from "@/components/LanguageSelector";
import { getDefaultLanguage } from "@/config/languages";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Life Scientific",
  description: "Life Scientific - Agricultural Solutions",
};

interface RootLayoutProps {
  children: React.ReactNode
  params?: {
    lang?: string
  }
}

export default function RootLayout({
  children,
  params
}: RootLayoutProps) {
  const currentLang = params?.lang || getDefaultLanguage().id

  return (
    <html lang={currentLang}>
      <body className={inter.className}>
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center">
            <div className="mr-4 flex">
              <Link className="mr-6 flex items-center space-x-2" href={`/${currentLang}`}>
                <span className="font-bold">Life Scientific</span>
              </Link>
            </div>
            <nav className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
              <div className="flex-1 md:flex-none">
                <Link 
                  href={`/${currentLang}/products`}
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  Products
                </Link>
              </div>
              <div className="flex items-center">
                <LanguageSelector />
              </div>
            </nav>
          </div>
        </header>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
