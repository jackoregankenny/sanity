import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {documentInternationalization} from '@sanity/document-internationalization'
import {assist, contextDocumentTypeName} from '@sanity/assist'
import {schemaTypes} from './schemaTypes'
import {structure} from './deskStructure'
import CopyFromSourceAction from './actions/copyFromSource'
import {DocumentActionComponent, DocumentActionsContext} from 'sanity'
import { languages, getDefaultLanguage } from './config/languages'

export default defineConfig({
  name: 'default',
  title: 'Life Scientific',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,
  plugins: [
    deskTool({
      structure: (S) => {
        return S.list()
          .title('Content')
          .items([
            // Products
            S.listItem()
              .title('Products')
              .child(
                S.list()
                  .title('Products')
                  .items([
                    S.listItem()
                      .title('All Products')
                      .child(
                        S.documentList()
                          .title('All Products')
                          .filter('_type == "product"')
                      ),
                    S.divider(),
                    ...languages.map(lang => 
                      S.listItem()
                        .title(`${lang.title} Products`)
                        .child(
                          S.documentList()
                            .title(`${lang.title} Products`)
                            .filter('_type == "product" && language == $lang')
                            .params({ lang: lang.id })
                        )
                    )
                  ])
              ),
            // Pages
            S.listItem()
              .title('Pages')
              .child(
                S.list()
                  .title('Pages')
                  .items([
                    S.listItem()
                      .title('All Pages')
                      .child(
                        S.documentList()
                          .title('All Pages')
                          .filter('_type == "page"')
                      ),
                    S.divider(),
                    ...languages.map(lang => 
                      S.listItem()
                        .title(`${lang.title} Pages`)
                        .child(
                          S.documentList()
                            .title(`${lang.title} Pages`)
                            .filter('_type == "page" && language == $lang')
                            .params({ lang: lang.id })
                        )
                    )
                  ])
              ),
            // Tools & Services
            S.listItem()
              .title('Tools & Services')
              .child(
                S.documentList()
                  .title('Tools & Services')
                  .filter('_type == "recommendedTool"')
              ),
            // Translations
            S.listItem()
              .title('Translations')
              .child(
                S.documentList()
                  .title('Translations')
                  .filter('_type == "translations"')
              )
          ])
      }
    }),
    visionTool(),
    documentInternationalization({
      supportedLanguages: languages.map(({id, title}) => ({id, title})),
      schemaTypes: ['product'],
      weakReferences: true
    }),
    assist({
      translate: {
        document: {
          languageField: 'language',
          documentTypes: ['product']
        }
      }
    })
  ],
  schema: {
    types: schemaTypes,
  },
  document: {
    actions: (prev: DocumentActionComponent[], context: DocumentActionsContext) => {
      if (context.schemaType !== 'product') {
        return prev
      }

      return [
        ...prev,
        CopyFromSourceAction
      ]
    }
  }
})
