'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useLanguage } from '@/contexts/LanguageContext'

const languageNames: Record<string, { name: string, flag: string }> = {
  en: { name: 'English', flag: '🇬🇧' },
  fr: { name: 'Français', flag: '🇫🇷' },
  de: { name: 'Deutsch', flag: '🇩🇪' },
  es: { name: 'Español', flag: '🇪🇸' },
  it: { name: 'Italiano', flag: '🇮🇹' },
  pt: { name: 'Português', flag: '🇵🇹' }
}

export function LanguageSelector() {
  const { currentLanguage, setLanguage, availableLanguages } = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 px-0">
          {languageNames[currentLanguage].flag}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {availableLanguages.map((lang) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => setLanguage(lang)}
            className="cursor-pointer"
          >
            <span className="mr-2">{languageNames[lang].flag}</span>
            {languageNames[lang].name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 