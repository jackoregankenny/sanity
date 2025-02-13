export interface Language {
  id: string
  name: string
  flag: string
  countries: string[]
}

export const languages: Language[] = [
  {
    id: "en",
    name: "English",
    flag: "🇬🇧",
    countries: ["UK", "Ireland", "USA", "Canada"]
  },
  {
    id: "fr",
    name: "Français",
    flag: "🇫🇷",
    countries: ["France", "Belgium"]
  },
  {
    id: "de",
    name: "Deutsch",
    flag: "🇩🇪",
    countries: ["Germany"]
  },
  {
    id: "es",
    name: "Español",
    flag: "🇪🇸",
    countries: ["Spain"]
  },
  {
    id: "it",
    name: "Italiano",
    flag: "🇮🇹",
    countries: ["Italy"]
  },
  {
    id: "pt",
    name: "Português",
    flag: "🇵🇹",
    countries: ["Portugal"]
  },
  {
    id: "nl",
    name: "Nederlands",
    flag: "🇳🇱",
    countries: ["Netherlands"]
  },
  {
    id: "pl",
    name: "Polski",
    flag: "🇵🇱",
    countries: ["Poland"]
  },
  {
    id: "hu",
    name: "Magyar",
    flag: "🇭🇺",
    countries: ["Hungary"]
  },
  {
    id: "el",
    name: "Ελληνικά",
    flag: "🇬🇷",
    countries: ["Greece"]
  },
  {
    id: "ro",
    name: "Română",
    flag: "🇷🇴",
    countries: ["Romania"]
  },
  {
    id: "sk",
    name: "Slovenčina",
    flag: "🇸🇰",
    countries: ["Slovakia"]
  }
]

export function getDefaultLanguage(): Language {
  return languages[0]
}

export function getLanguageFromCode(code: string): Language | undefined {
  return languages.find((lang) => lang.id === code)
}

export const formatLanguageTitle = (code: string): string => {
  const language = getLanguageFromCode(code)
  return language ? `${language.flag} ${language.name}` : code
} 