import { getLanguageBadge } from './config/languages'

interface Document {
  _type: string
  language: string
}

export const badges = (document: Document) => {
  const badges = []

  if (document.language) {
    const languageBadge = getLanguageBadge(document.language)
    if (languageBadge) {
      badges.push(languageBadge)
    }
  }

  return badges
} 