import { definePlugin } from 'sanity'

export interface Language {
  id: string
  title: string
  flag: string
  isDefault?: boolean
  countries: string[]
}

export const languages: Language[] = [
  { id: 'en', title: 'English', flag: '🇬🇧', isDefault: true, countries: ['UK', 'Ireland', 'USA', 'Canada'] },
  { id: 'fr', title: 'French', flag: '🇫🇷', countries: ['France', 'Belgium'] },
  { id: 'de', title: 'German', flag: '🇩🇪', countries: ['Germany'] },
  { id: 'es', title: 'Spanish', flag: '🇪🇸', countries: ['Spain'] },
  { id: 'it', title: 'Italian', flag: '🇮🇹', countries: ['Italy'] },
  { id: 'pt', title: 'Portuguese', flag: '🇵🇹', countries: ['Portugal'] },
  { id: 'nl', title: 'Dutch', flag: '🇳🇱', countries: ['Netherlands'] },
  { id: 'pl', title: 'Polish', flag: '🇵🇱', countries: ['Poland'] },
  { id: 'hu', title: 'Hungarian', flag: '🇭🇺', countries: ['Hungary'] },
  { id: 'el', title: 'Greek', flag: '🇬🇷', countries: ['Greece'] },
  { id: 'ro', title: 'Romanian', flag: '🇷🇴', countries: ['Romania'] },
  { id: 'sk', title: 'Slovak', flag: '🇸🇰', countries: ['Slovakia'] }
] as const

export type LanguageCode = typeof languages[number]['id']

// Utility functions for language handling
export const getDefaultLanguage = () => languages.find(lang => lang.isDefault) || languages[0]

export const getLanguageFromCode = (code: string): Language | undefined => 
  languages.find(lang => lang.id === code)

export const formatLanguageTitle = (code: string): string => {
  const language = getLanguageFromCode(code)
  return language ? `${language.flag} ${language.title}` : code
}

// For use in schema definitions
export const languageField = {
  name: 'language',
  type: 'string',
  readOnly: true,
  hidden: true,
  initialValue: getDefaultLanguage().id,
  options: {
    list: languages.map(lang => ({
      title: formatLanguageTitle(lang.id),
      value: lang.id
    }))
  }
}

// For document badges
export const getLanguageBadge = (lang: string) => {
  const language = getLanguageFromCode(lang)
  return language ? {
    label: language.flag,
    title: language.title,
    color: language.isDefault ? 'success' : 'primary'
  } : null
}

// For filtering in desk structure
export const languageFilter = (type: string, lang: string) => 
  `_type == "${type}" && language == "${lang}"` 