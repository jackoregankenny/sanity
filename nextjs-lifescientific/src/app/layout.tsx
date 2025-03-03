import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { createClient } from "@/lib/sanity.client";
import { getDefaultLanguage } from "@/config/languages";
import { getTranslations } from "@/hooks/useTranslations";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Life Scientific",
  description: "Life Scientific - Agricultural Solutions",
};

interface RootLayoutProps {
  children: React.ReactNode
  params?: Promise<{
    lang?: string
  }>
}

// Fetch navigation data from Sanity
async function getNavigation(lang: string) {
  const client = createClient();
  
  try {
    const navigation = await client.fetch(`
      *[_type == "navigation" && language == $lang][0] {
        title,
        logo,
        logoText,
        items[] {
          text,
          href,
          isExternal,
          icon,
          children[] {
            text,
            href,
            isExternal
          }
        }
      }
    `, { lang });
    
    return navigation;
  } catch (error) {
    console.error("Error fetching navigation:", error);
    return null;
  }
}

export default async function RootLayout(props: RootLayoutProps) {
  const params = await props.params;

  const {
    children
  } = props;

  const currentLang = params?.lang || getDefaultLanguage().id;
  
  // Get navigation data
  const navigationData = await getNavigation(currentLang);
  
  // Get translations
  const translations = await getTranslations(currentLang);

  return (
    <html lang={currentLang} className="scroll-smooth">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Navbar 
          logo={navigationData?.logo} 
          logoText={navigationData?.logoText || "Life Scientific"} 
          items={navigationData?.items || []}
          currentLang={currentLang}
          translations={translations}
        />
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
                      {translations.nav.products}
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href={`/${currentLang}/blog`}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {translations.nav.blog}
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
