import type { LanguageCode } from "@/hooks/useTranslations"
import { languages } from "@/config/languages"
import { notFound } from "next/navigation"
import { Metadata } from "next"

interface Props {
  params: {
    lang: string
  }
}

// Generate static params for all supported languages
export function generateStaticParams() {
  return languages.map((lang) => ({
    lang: lang.id,
  }))
}

// Validate the language parameter
function validateLanguage(lang: string): asserts lang is LanguageCode {
  if (!languages.some(l => l.id === lang)) {
    notFound()
  }
}

// Generate metadata
export async function generateMetadata(props: Props): Promise<Metadata> {
  try {
    const params = await Promise.resolve(props.params)
    validateLanguage(params.lang)
    return {
      title: 'Life Scientific',
      description: 'Welcome to Life Scientific',
    }
  } catch {
    return {
      title: 'Life Scientific',
      description: 'Welcome to Life Scientific',
    }
  }
}

export default async function LandingPage(props: Props) {
  const params = await Promise.resolve(props.params)
  validateLanguage(params.lang)
  
  return (
    <main>
      {/* Your custom landing page content will go here */}
    </main>
  )
} 