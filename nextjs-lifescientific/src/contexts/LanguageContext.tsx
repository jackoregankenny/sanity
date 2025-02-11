'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { getAvailableLanguages } from '@/lib/translations'

interface LanguageContextType {
  currentLanguage: string
  setLanguage: (lang: string) => void
  availableLanguages: string[]
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState('en')
  const availableLanguages = getAvailableLanguages()

  const setLanguage = (lang: string) => {
    if (availableLanguages.includes(lang)) {
      setCurrentLanguage(lang)
      document.documentElement.lang = lang
    }
  }

  return (
    <LanguageContext.Provider 
      value={{ 
        currentLanguage, 
        setLanguage,
        availableLanguages
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
} 