'use client'

import { useParams, usePathname } from "next/navigation"
import Link from "next/link"
import { languages } from "@/config/languages"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export function LanguageSelector() {
  const params = useParams()
  const pathname = usePathname()
  const currentLang = params?.lang as string
  const currentLanguage = languages.find((l) => l.id === currentLang)

  // Get the path without the language prefix
  const pathWithoutLang = pathname.replace(`/${currentLang}`, "")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <span className="text-lg">{currentLanguage?.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem key={lang.id} asChild>
            <Link
              href={`/${lang.id}${pathWithoutLang}`}
              className={currentLang === lang.id ? "font-medium" : ""}
            >
              <span className="mr-2">{lang.flag}</span>
              {lang.name}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 