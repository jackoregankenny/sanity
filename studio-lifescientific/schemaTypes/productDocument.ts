import { defineField, defineType } from 'sanity'
import { languageField } from '../config/languages'

export default defineType({
  name: 'productDocument',
  title: 'Product Document',
  type: 'document',
  groups: [
    { name: 'basic', title: 'Basic Information', default: true },
    { name: 'file', title: 'Document File' }
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Document Title',
      type: 'string',
      validation: Rule => Rule.required(),
      group: 'basic',
      options: {
        aiAssist: {
          translateAction: true
        }
      }
    }),
    languageField,
    defineField({
      name: 'documentType',
      title: 'Document Type',
      type: 'string',
      options: {
        list: [
          { title: 'Safety Data Sheet (SDS)', value: 'sds' },
          { title: 'Product Label', value: 'label' },
          { title: 'Technical Sheet', value: 'technical' },
          { title: 'Registration Certificate', value: 'registration' }
        ],
        aiAssist: {
          exclude: true
        }
      },
      validation: Rule => Rule.required(),
      group: 'basic'
    }),
    defineField({
      name: 'file',
      title: 'Document File',
      type: 'file',
      options: {
        accept: '.pdf',
        aiAssist: {
          exclude: true
        }
      },
      validation: Rule => Rule.required(),
      group: 'file'
    }),
    defineField({
      name: 'version',
      title: 'Document Version',
      type: 'string',
      validation: Rule => Rule.required(),
      group: 'basic',
      options: {
        aiAssist: {
          exclude: true
        }
      }
    }),
    defineField({
      name: 'validFrom',
      title: 'Valid From',
      type: 'date',
      validation: Rule => Rule.required(),
      group: 'basic',
      options: {
        aiAssist: {
          exclude: true
        }
      }
    }),
    defineField({
      name: 'validUntil',
      title: 'Valid Until',
      type: 'date',
      group: 'basic',
      options: {
        aiAssist: {
          exclude: true
        }
      }
    })
  ],
  preview: {
    select: {
      title: 'title',
      docType: 'documentType',
      language: 'language',
      version: 'version'
    },
    prepare({ title, docType, language, version }) {
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
      const docTypes = {
        sds: '📋',
        label: '🏷️',
        technical: '📑',
        registration: '📜'
      } as const

      return {
        title: `${flag} ${title || ''}`,
        subtitle: `${docTypes[docType as keyof typeof docTypes] || ''} v${version}`
      }
    }
  }
}) 