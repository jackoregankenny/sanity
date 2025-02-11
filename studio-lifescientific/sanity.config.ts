import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {documentInternationalization} from '@sanity/document-internationalization'
import {assist, contextDocumentTypeName} from '@sanity/assist'
import {schemaTypes} from './schemaTypes'
import {structure} from './deskStructure'
import CopyFromSourceAction from './actions/copyFromSource'
import {DocumentActionComponent, DocumentActionsContext} from 'sanity'

const supportedLanguages = [
  { id: 'en', title: 'English' },
  { id: 'fr', title: 'French' },
  { id: 'de', title: 'German' },
  { id: 'es', title: 'Spanish' },
  { id: 'it', title: 'Italian' },
  { id: 'pt-PT', title: 'Portuguese (European)' },
  { id: 'pt-BR', title: 'Portuguese (Brazilian)' }
]

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
      supportedLanguages,
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
