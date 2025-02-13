import { defineField, defineType } from 'sanity'
import { languageField } from '../../config/languages'
import { TranslateIcon } from '@sanity/icons'

export default defineType({
  name: 'translations',
  title: 'Site Translations',
  type: 'document',
  icon: TranslateIcon,
  groups: [
    { name: 'navigation', title: 'Navigation' },
    { name: 'products', title: 'Products Page' },
    { name: 'common', title: 'Common Elements' },
    { name: 'footer', title: 'Footer' }
  ],
  fields: [
    languageField,
    // Navigation
    defineField({
      name: 'nav',
      title: 'Navigation',
      type: 'object',
      group: 'navigation',
      options: {
        collapsed: false,
        collapsible: true
      },
      fields: [
        defineField({
          name: 'products',
          type: 'string',
          title: 'Products Link',
          options: {
            aiAssist: {
              translateAction: true
            }
          }
        }),
        defineField({
          name: 'about',
          type: 'string',
          title: 'About Link',
          options: {
            aiAssist: {
              translateAction: true
            }
          }
        }),
        defineField({
          name: 'contact',
          type: 'string',
          title: 'Contact Link',
          options: {
            aiAssist: {
              translateAction: true
            }
          }
        })
      ]
    }),
    // Products Page
    defineField({
      name: 'products',
      title: 'Products Page',
      type: 'object',
      group: 'products',
      options: {
        collapsed: false,
        collapsible: true
      },
      fields: [
        defineField({
          name: 'pageTitle',
          type: 'string',
          title: 'Page Title',
          options: {
            aiAssist: {
              translateAction: true
            }
          }
        }),
        defineField({
          name: 'pageDescription',
          type: 'text',
          title: 'Page Description',
          options: {
            aiAssist: {
              translateAction: true
            }
          }
        }),
        defineField({
          name: 'categoryLabels',
          type: 'object',
          title: 'Category Labels',
          options: {
            aiAssist: {
              translateAction: true
            }
          },
          fields: [
            defineField({
              name: 'pesticide',
              type: 'string',
              title: 'Pesticide'
            }),
            defineField({
              name: 'herbicide',
              type: 'string',
              title: 'Herbicide'
            }),
            defineField({
              name: 'fungicide',
              type: 'string',
              title: 'Fungicide'
            })
          ]
        })
      ]
    }),
    // Common Elements
    defineField({
      name: 'common',
      title: 'Common Elements',
      type: 'object',
      group: 'common',
      options: {
        collapsed: false,
        collapsible: true
      },
      fields: [
        defineField({
          name: 'loading',
          type: 'string',
          title: 'Loading Message',
          options: {
            aiAssist: {
              translateAction: true
            }
          }
        }),
        defineField({
          name: 'error',
          type: 'string',
          title: 'Error Message',
          options: {
            aiAssist: {
              translateAction: true
            }
          }
        }),
        defineField({
          name: 'noResults',
          type: 'string',
          title: 'No Results Message',
          options: {
            aiAssist: {
              translateAction: true
            }
          }
        })
      ]
    })
  ],
  preview: {
    select: {
      language: 'language'
    },
    prepare({ language }) {
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
        title: `Site Translations (${language.toUpperCase()})`,
        media: TranslateIcon
      }
    }
  }
}) 