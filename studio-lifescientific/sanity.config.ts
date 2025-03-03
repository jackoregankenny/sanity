import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {documentInternationalization} from '@sanity/document-internationalization'
import {assist, contextDocumentTypeName} from '@sanity/assist'
import {presentationTool} from 'sanity/presentation'
import {schemaTypes} from './schemaTypes'
import {structure} from './deskStructure'
import CopyFromSourceAction from './actions/copyFromSource'
import {DocumentActionComponent, DocumentActionsContext, SchemaTypeDefinition} from 'sanity'
import { languages, getDefaultLanguage } from './config/languages'
import { codeInput } from '@sanity/code-input'

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
            // Blog
            S.listItem()
              .title('Blog')
              .child(
                S.list()
                  .title('Blog')
                  .items([
                    S.listItem()
                      .title('Blog Posts')
                      .child(
                        S.list()
                          .title('Blog Posts')
                          .items([
                            S.listItem()
                              .title('All Blog Posts')
                              .child(
                                S.documentList()
                                  .title('All Blog Posts')
                                  .filter('_type == "blogPost"')
                              ),
                            S.divider(),
                            ...languages.map(lang => 
                              S.listItem()
                                .title(`${lang.title} Blog Posts`)
                                .child(
                                  S.documentList()
                                    .title(`${lang.title} Blog Posts`)
                                    .filter('_type == "blogPost" && language == $lang')
                                    .params({ lang: lang.id })
                                )
                            )
                          ])
                      ),
                    S.listItem()
                      .title('Categories')
                      .child(
                        S.documentList()
                          .title('Categories')
                          .filter('_type == "category"')
                      ),
                    S.listItem()
                      .title('Authors')
                      .child(
                        S.documentList()
                          .title('Authors')
                          .filter('_type == "author"')
                      ),
                    S.listItem()
                      .title('Blog Pages')
                      .child(
                        S.list()
                          .title('Blog Pages')
                          .items([
                            S.listItem()
                              .title('All Blog Pages')
                              .child(
                                S.documentList()
                                  .title('All Blog Pages')
                                  .filter('_type == "blogPage"')
                              ),
                            S.divider(),
                            ...languages.map(lang => 
                              S.listItem()
                                .title(`${lang.title} Blog Pages`)
                                .child(
                                  S.documentList()
                                    .title(`${lang.title} Blog Pages`)
                                    .filter('_type == "blogPage" && language == $lang')
                                    .params({ lang: lang.id })
                                )
                            )
                          ])
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
            // Navigation
            S.listItem()
              .title('Navigation')
              .child(
                S.documentList()
                  .title('Navigation')
                  .filter('_type == "navigation"')
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
      schemaTypes: ['product', 'blogPost', 'blogPage'],
      weakReferences: true
    }),
    assist({
      translate: {
        document: {
          languageField: 'language',
          documentTypes: ['product', 'blogPost', 'blogPage']
        }
      }
    }),
    presentationTool({
      previewUrl: {
        draftMode: {
          enable: '/api/draft',
        },
      },
      title: 'Preview'
    }),
    codeInput()
  ],
  schema: {
    types: schemaTypes as any,
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
