import { redirect } from 'next/navigation'
import { getDefaultLanguage } from '@/config/languages'

export default function RootPage() {
  const defaultLang = getDefaultLanguage().id
  redirect(`/${defaultLang}`)
}