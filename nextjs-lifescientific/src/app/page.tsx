import { redirect } from 'next/navigation'
import { getDefaultLanguage } from '@/config/languages'
import { HeroSection } from "@/components/landing/HeroSection";
import { ProductShowcaseHero } from "@/components/landing/ProductShowcaseHero";

export default function Home() {
  const defaultLang = getDefaultLanguage().id
  redirect(`/${defaultLang}`)

  return (
    <main>
      {/* Toggle between the two hero sections as needed */}
      {/* <HeroSection /> */}
      <ProductShowcaseHero 
        title="Life Scientific Solutions"
        subtitle="Discover our innovative agricultural chemicals designed for optimal crop performance and protection."
        ctaText="Explore Products"
        secondaryCtaText="Contact Us"
      />
    </main>
  );
}