import { StructureBuilder } from 'sanity/desk'
import { 
  BasketIcon, 
  DocumentIcon, 
  EditIcon,
  ComposeIcon,
  UsersIcon,
  TagIcon,
  ComponentIcon,
  CogIcon,
  TranslateIcon,
  HomeIcon,
  ControlsIcon,
  EarthGlobeIcon
} from '@sanity/icons'
import { languages, getLanguageBadge } from './config/languages'
import { TranslationStatus } from './config/languages'

// Status badge colors
const statusColors: Record<TranslationStatus, string> = {
  'up-to-date': '#43d675',
  'needs-review': '#ffb238',
  'out-of-sync': '#ff4759'
}

interface DocumentItem {
  translationStatus?: TranslationStatus
  language?: string
}

interface Badge {
  label: string
  color: string
  title: string
}

type SanityDocumentList = ReturnType<StructureBuilder['documentList']>

// Helper to create a language-filtered list with status indicators
const createLanguageFilteredList = (S: StructureBuilder, type: string, title: string, lang: string): SanityDocumentList => {
  const list = S.documentList()
    .title(title)
    .filter('_type == $type && language == $lang')
    .params({ type, lang })
    .defaultOrdering([
      { field: 'translationStatus', direction: 'asc' },
      { field: 'lastUpdated', direction: 'desc' }
    ])
    .child(documentId =>
      S.document()
        .documentId(documentId)
        .schemaType(type)
        .views([
          S.view.form(),
          S.view
            .component(() => null)
            .title('Translation History')
            .icon(TranslateIcon)
        ])
    )

  // Add badges to the list
  const listWithBadges = list as SanityDocumentList & {
    getBadges: (item: DocumentItem) => Badge[]
  }

  listWithBadges.getBadges = (item: DocumentItem) => {
    const badges: Badge[] = []
    
    if (lang !== 'en' && item.translationStatus) {
      badges.push({
        label: item.translationStatus === 'up-to-date' ? '✓' : item.translationStatus === 'needs-review' ? '⚠️' : '⚡',
        color: statusColors[item.translationStatus],
        title: `Translation: ${item.translationStatus}`
      })
    }

    if (item.language) {
      const langBadge = getLanguageBadge(item.language)
      if (langBadge) {
        badges.push(langBadge as Badge)
      }
    }
    
    return badges
  }

  return listWithBadges
}

// Create a section for a content type with language variants
const createContentTypeSection = (S: StructureBuilder, type: string, title: string, icon: any) =>
  S.listItem()
    .title(title)
    .icon(icon)
    .child(
      S.list()
        .title(`${title} by Language`)
        .items([
          // Original English Content
          S.listItem()
            .title('English (Original)')
            .icon(DocumentIcon)
            .child(
              createLanguageFilteredList(S, type, `${title} (English)`, 'en')
            ),
          // Divider
          S.divider(),
          // Translations
          ...languages
            .filter(lang => lang.id !== 'en')
            .map(language => 
              S.listItem()
                .title(`${language.flag} ${language.title}`)
                .icon(TranslateIcon)
                .child(
                  createLanguageFilteredList(S, type, `${title} (${language.title})`, language.id)
                )
            )
        ])
    )

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Landing Page
      createContentTypeSection(S, 'landingPage', 'Landing Page', HomeIcon),
      
      // Products Section
      createContentTypeSection(S, 'product', 'Products', BasketIcon),
      
      // Pages Section
      createContentTypeSection(S, 'page', 'Pages', DocumentIcon),
      
      // Blog Section
      S.listItem()
        .title('Blog')
        .icon(ComposeIcon)
        .child(
          S.list()
            .title('Blog Content')
            .items([
              createContentTypeSection(S, 'post', 'Posts', EditIcon),
              S.divider(),
              S.listItem()
                .title('Authors')
                .icon(UsersIcon)
                .child(
                  S.documentList()
                    .title('Authors')
                    .filter('_type == "author"')
                ),
              S.listItem()
                .title('Categories')
                .icon(TagIcon)
                .child(
                  S.documentList()
                    .title('Categories')
                    .filter('_type == "category"')
                )
            ])
        ),

      // Configuration
      S.divider(),
      S.listItem()
        .title('Site Configuration')
        .icon(CogIcon)
        .child(
          S.list()
            .title('Configuration')
            .items([
              S.listItem()
                .title('Site Settings')
                .icon(ComponentIcon)
                .child(
                  S.document()
                    .schemaType('siteSettings')
                    .documentId('siteSettings')
                ),
              S.listItem()
                .title('Navigation')
                .icon(ControlsIcon)
                .child(
                  S.document()
                    .schemaType('navigation')
                    .documentId('navigation')
                ),
              S.listItem()
                .title('Translations')
                .icon(EarthGlobeIcon)
                .child(
                  S.documentList()
                    .title('Site Translations')
                    .filter('_type == "translations"')
                )
            ])
        )
    ]) 