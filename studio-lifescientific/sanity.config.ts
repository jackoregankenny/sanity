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
  projectId: 'wfaq7tu4',
  dataset: 'production',
  plugins: [
    deskTool({
      structure: (S) => 
        S.list()
          .title('Content')
          .items([
            // Products list
            S.listItem()
              .title('Products')
              .child(
                S.list()
                  .title('Products')
                  .items([
                    S.listItem()
                      .title('All Products')
                      .schemaType('product')
                      .child(
                        S.documentList()
                          .title('All Products')
                          .filter('_type == "product" && language == "en"')
                          .defaultOrdering([{field: 'name', direction: 'asc'}])
                      ),
                  ])
              ),
            // Other document types
            ...S.documentTypeListItems()
              .filter(item => 
                !['product'].includes(item.getId() as string) && 
                item.getId() !== contextDocumentTypeName
              ),
            // AI Instructions
            S.documentTypeListItem(contextDocumentTypeName)
              .title('AI Instructions')
          ])
    }),
    visionTool(),
    documentInternationalization({
      supportedLanguages: languages.map(({id, title}) => ({id, title})),
      schemaTypes: ['product', 'post'],
      weakReferences: true
    }),
    assist({
      translate: {
        document: {
          languageField: 'language',
          documentTypes: ['product', 'post']
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
