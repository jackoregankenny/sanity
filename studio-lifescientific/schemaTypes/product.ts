import { defineField, defineType } from '@sanity/types'

const languageLabels = {
  en: '🇬🇧',
  fr: '🇫🇷',
  de: '🇩🇪',
  es: '🇪🇸',
  it: '🇮🇹',
  'pt-PT': '🇵🇹',
  'pt-BR': '🇧🇷'
} as const

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  initialValue: {
    language: 'en'
  },
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required().min(2).max(100),
      options: {
        aiAssist: {
          translateAction: true
        }
      }
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
        slugify: input => input
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w\-]+/g, '')
          .slice(0, 96),
        aiAssist: {
          exclude: true
        }
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
      options: {
        aiAssist: {
          exclude: true
        }
      }
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      validation: Rule => Rule.required().min(10).max(200),
      options: {
        aiAssist: {
          translateAction: true
        }
      }
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required().min(50),
      options: {
        aiAssist: {
          translateAction: true
        }
      }
    }),
    defineField({
      name: 'productImage',
      title: 'Product Image',
      type: 'image',
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: 'alt'
        }
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
          options: {
            aiAssist: {
              translateAction: true
            }
          }
        })
      ],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Pesticide', value: 'pesticide' },
          { title: 'Herbicide', value: 'herbicide' },
          { title: 'Fungicide', value: 'fungicide' }
        ],
        layout: 'radio',
        aiAssist: {
          exclude: true
        }
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'variants',
      title: 'Product Variants',
      type: 'array',
      of: [{ type: 'productVariant' }],
      validation: Rule => Rule.min(1).unique().error('Each variant must be unique'),
      options: {
        aiAssist: {
          exclude: true
        }
      }
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'tagline',
      media: 'productImage',
      language: 'language'
    },
    prepare(selection) {
      const { title, subtitle, media, language } = selection
      const flag = languageLabels[language as keyof typeof languageLabels] || ''
      
      return {
        title: `${flag} ${title || ''}`,
        subtitle: subtitle,
        media
      }
    }
  }
}) 