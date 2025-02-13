import { defineField, defineType } from 'sanity'
import { languageField } from '../config/languages'

// Shared image field with alt text
const imageWithAlt = {
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
      title: 'Alternative Text',
      description: 'Important for SEO and accessibility.',
      options: {
        aiAssist: {
          translateAction: true
        }
      }
    })
  ]
}

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  groups: [
    { name: 'basic', title: 'Basic Information', default: true },
    { name: 'details', title: 'Product Details' },
    { name: 'regulatory', title: 'Regulatory Information' },
    { name: 'media', title: 'Media' }
  ],
  fields: [
    // Basic Information
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: Rule => Rule.required().min(2).max(100),
      group: 'basic',
      options: {
        aiAssist: {
          translateAction: true
        }
      }
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
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
      validation: Rule => Rule.required(),
      group: 'basic'
    }),
    languageField,
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
      validation: Rule => Rule.required(),
      group: 'basic'
    }),
    // Product Details
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'A short, catchy description',
      validation: Rule => Rule.required().min(10).max(200),
      group: 'details',
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
      rows: 4,
      validation: Rule => Rule.required().min(50),
      group: 'details',
      options: {
        aiAssist: {
          translateAction: true
        }
      }
    }),
    defineField({
      name: 'features',
      title: 'Key Features',
      type: 'array',
      of: [{
        type: 'string',
        options: {
          aiAssist: {
            translateAction: true
          }
        }
      }],
      validation: Rule => Rule.required().min(2),
      group: 'details'
    }),
    defineField({
      name: 'specifications',
      title: 'Specifications',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({
            name: 'label',
            type: 'string',
            options: {
              aiAssist: {
                translateAction: true
              }
            }
          }),
          defineField({
            name: 'value',
            type: 'string',
            options: {
              aiAssist: {
                translateAction: true
              }
            }
          })
        ]
      }],
      group: 'details'
    }),
    defineField({
      name: 'ingredients',
      title: 'Active Ingredients',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({
            name: 'name',
            type: 'string',
            options: {
              aiAssist: {
                translateAction: true
              }
            }
          }),
          defineField({
            name: 'percentage',
            type: 'string',
            options: {
              aiAssist: {
                exclude: true
              }
            }
          }),
          defineField({
            name: 'description',
            type: 'text',
            rows: 2,
            options: {
              aiAssist: {
                translateAction: true
              }
            }
          })
        ]
      }],
      group: 'details'
    }),
    // Regulatory Information
    defineField({
      name: 'variants',
      title: 'Product Variants',
      type: 'array',
      of: [{ type: 'productVariant' }],
      validation: Rule => Rule.min(1).unique().error('Each variant must be unique'),
      group: 'regulatory',
      options: {
        aiAssist: {
          exclude: true
        }
      }
    }),
    defineField({
      name: 'documents',
      title: 'Product Documents',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{ type: 'productDocument' }],
        options: {
          filter: 'language == $language',
          filterParams: {
            language: '^.language'
          }
        }
      }],
      group: 'regulatory'
    }),
    // Media
    defineField({
      name: 'productImage',
      title: 'Product Image',
      ...imageWithAlt,
      validation: Rule => Rule.required(),
      group: 'media'
    }),
    defineField({
      name: 'gallery',
      title: 'Image Gallery',
      type: 'array',
      of: [{ ...imageWithAlt }],
      group: 'media'
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'tagline',
      media: 'productImage',
      language: 'language'
    },
    prepare({ title, subtitle, media, language }) {
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
        title: `${flag} ${title || ''}`,
        subtitle,
        media
      }
    }
  }
}) 