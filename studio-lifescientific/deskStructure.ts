import { ListItemBuilder, StructureBuilder } from 'sanity/desk'
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
  ControlsIcon
} from '@sanity/icons'
import { languages } from './config/languages'

// Helper function to create a language-filtered list
const createLanguageFilteredList = (S: StructureBuilder, type: string, title: string, lang: string) =>
  S.documentList()
    .title(title)
    .filter('_type == $type && language == $lang')
    .params({ type, lang })

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Products
      S.listItem()
        .title('Products')
        .icon(BasketIcon)
        .child(
          S.list()
            .title('Products by Language')
            .items(
              languages.map(language => 
                S.listItem()
                  .title(`${language.flag} ${language.title}`)
                  .child(
                    createLanguageFilteredList(S, 'product', `Products (${language.title})`, language.id)
                  )
              )
            )
        ),

      // Pages
      S.listItem()
        .title('Pages')
        .icon(DocumentIcon)
        .child(
          S.list()
            .title('Pages by Language')
            .items(
              languages.map(language => 
                S.listItem()
                  .title(`${language.flag} ${language.title}`)
                  .child(
                    createLanguageFilteredList(S, 'page', `Pages (${language.title})`, language.id)
                  )
              )
            )
        ),

      // Blog
      S.listItem()
        .title('Blog')
        .icon(ComposeIcon)
        .child(
          S.list()
            .title('Blog Content')
            .items([
              ...languages.map(language => 
                S.listItem()
                  .title(`${language.flag} Posts`)
                  .child(
                    createLanguageFilteredList(S, 'post', `Posts (${language.title})`, language.id)
                  )
              ),
              S.listItem()
                .title('Authors')
                .icon(UsersIcon)
                .child(
                  S.documentList()
                    .title('Authors')
                    .filter('_type == "author"')
                )
            ])
        ),

      S.divider(),

      // Components
      S.listItem()
        .title('Components')
        .icon(ComponentIcon)
        .child(
          S.documentList()
            .title('Reusable Components')
            .filter('_type == "component" || _type == "callToAction"')
        ),

      // Settings
      S.listItem()
        .title('Settings')
        .icon(ControlsIcon)
        .child(
          S.list()
            .title('Settings')
            .items([
              S.listItem()
                .title('Translation Settings')
                .icon(TranslateIcon)
                .child(
                  S.editor()
                    .id('translationMetadata')
                    .schemaType('translationMetadata')
                    .documentId('translationMetadata')
                ),
              S.listItem()
                .title('Tools & Services')
                .icon(CogIcon)
                .child(
                  S.documentList()
                    .title('Recommended Tools')
                    .filter('_type == "recommendedTool"')
                )
            ])
        )
    ]) 