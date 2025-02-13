import { defineField, defineType } from 'sanity'
import { languageField } from '../config/languages'

export default defineType({
  name: 'productPage',
  title: 'Product Page',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO' },
    { name: 'ui', title: 'UI Text' }
  ],
  fields: [
    // Reference to product
    defineField({
      name: 'product',
      title: 'Product',
      type: 'reference',
      to: [{ type: 'product' }],
      validation: Rule => Rule.required(),
      group: 'content'
    }),
    languageField,
    // SEO Fields
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      group: 'seo',
      options: {
        aiAssist: {
          translateAction: true
        }
      }
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      group: 'seo',
      options: {
        aiAssist: {
          translateAction: true
        }
      }
    }),
    // UI Text
    defineField({
      name: 'uiText',
      title: 'UI Text',
      type: 'object',
      group: 'ui',
      fields: [
        // Section Headings
        defineField({
          name: 'variantsTitle',
          title: 'Variants Section Title',
          type: 'string',
          options: {
            aiAssist: {
              translateAction: true
            }
          }
        }),
        defineField({
          name: 'documentsTitle',
          title: 'Documents Section Title',
          type: 'string',
          options: {
            aiAssist: {
              translateAction: true
            }
          }
        }),
        // Document Labels
        defineField({
          name: 'documentLabels',
          title: 'Document Labels',
          type: 'object',
          options: {
            aiAssist: {
              translateAction: true
            }
          },
          fields: [
            defineField({
              name: 'sds',
              title: 'SDS Label',
              type: 'string'
            }),
            defineField({
              name: 'label',
              title: 'Label Document Label',
              type: 'string'
            }),
            defineField({
              name: 'technical',
              title: 'Technical Sheet Label',
              type: 'string'
            }),
            defineField({
              name: 'registration',
              title: 'Registration Certificate Label',
              type: 'string'
            })
          ]
        }),
        // Variant Labels
        defineField({
          name: 'variantLabels',
          title: 'Variant Labels',
          type: 'object',
          options: {
            aiAssist: {
              translateAction: true
            }
          },
          fields: [
            defineField({
              name: 'ingredients',
              title: 'Ingredients Label',
              type: 'string'
            }),
            defineField({
              name: 'formulation',
              title: 'Formulation Label',
              type: 'string'
            }),
            defineField({
              name: 'registration',
              title: 'Registration Number Label',
              type: 'string'
            }),
            defineField({
              name: 'containers',
              title: 'Container Sizes Label',
              type: 'string'
            })
          ]
        }),
        // Button Labels
        defineField({
          name: 'buttonLabels',
          title: 'Button Labels',
          type: 'object',
          options: {
            aiAssist: {
              translateAction: true
            }
          },
          fields: [
            defineField({
              name: 'download',
              title: 'Download Button',
              type: 'string'
            }),
            defineField({
              name: 'viewMore',
              title: 'View More Button',
              type: 'string'
            })
          ]
        })
      ]
    })
  ],
  preview: {
    select: {
      productName: 'product.name',
      language: 'language'
    },
    prepare({ productName, language }) {
      const languageLabels = {
        en: '🇬🇧',
        fr: '🇫🇷',
        de: '🇩🇪',
        es: '🇪🇸',
        it: '🇮🇹',
        'pt-PT': '🇵🇹',
        'pt-BR': '🇧🇷'
      } as const
      
      const flag = languageLabels[language as keyof typeof languageLabels] || ''
      
      return {
        title: `${flag} ${productName || 'Untitled Product Page'}`,
        subtitle: 'Product Page'
      }
    }
  }
}) 