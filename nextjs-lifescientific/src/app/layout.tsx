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
    <html lang={currentLang} className="scroll-smooth">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container max-w-[80%] mx-auto flex h-16 items-center">
            <div className="mr-4 flex">
              <Link 
                className="mr-6 flex items-center space-x-2 text-xl font-bold hover:text-primary transition-colors" 
                href={`/${currentLang}`}
              >
                <span>Life Scientific</span>
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
        <main className="flex-1">
          {children}
        </main>
        <footer className="border-t py-8 mt-16">
          <div className="container max-w-[80%] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-bold mb-4">Life Scientific</h3>
                <p className="text-sm text-muted-foreground">
                  Innovative agricultural solutions for a sustainable future.
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link 
                      href={`/${currentLang}/products`}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      Products
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4">Contact</h3>
                <address className="text-sm text-muted-foreground not-italic">
                  Life Scientific Ltd<br />
                  NovaUCD, Belfield Innovation Park<br />
                  Dublin 4, Ireland
                </address>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} Life Scientific. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
