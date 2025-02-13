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
    { name: 'features', title: 'Features & Benefits' },
    { name: 'variants', title: 'Product Variants' },
    { name: 'media', title: 'Media' },
    { name: 'seo', title: 'SEO' }
  ],
  __experimental_actions: ['create', 'update', 'publish', 'delete'],
  initialValue: {
    features: [],
    benefits: [],
    variants: []
  },
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
          .slice(0, 96)
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
        layout: 'radio'
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
    // Features & Benefits
    defineField({
      name: 'features',
      title: 'Key Features',
      type: 'array',
      of: [{
        type: 'object',
        name: 'feature',
        title: 'Feature',
        fields: [
          defineField({
            name: 'title',
            type: 'string',
            validation: Rule => Rule.required(),
            options: {
              aiAssist: {
                translateAction: true
              }
            }
          }),
          defineField({
            name: 'description',
            type: 'text',
            rows: 2,
            validation: Rule => Rule.required(),
            options: {
              aiAssist: {
                translateAction: true
              }
            }
          })
        ],
        preview: {
          select: {
            title: 'title',
            description: 'description'
          },
          prepare({ title, description }) {
            return {
              title: title || 'Untitled Feature',
              subtitle: description
            }
          }
        }
      }],
      validation: Rule => Rule.min(2),
      group: 'features'
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      of: [{
        type: 'object',
        name: 'benefit',
        title: 'Benefit',
        fields: [
          defineField({
            name: 'title',
            type: 'string',
            validation: Rule => Rule.required(),
            options: {
              aiAssist: {
                translateAction: true
              }
            }
          }),
          defineField({
            name: 'description',
            type: 'text',
            rows: 2,
            validation: Rule => Rule.required(),
            options: {
              aiAssist: {
                translateAction: true
              }
            }
          })
        ],
        preview: {
          select: {
            title: 'title',
            description: 'description'
          },
          prepare({ title, description }) {
            return {
              title: title || 'Untitled Benefit',
              subtitle: description
            }
          }
        }
      }],
      validation: Rule => Rule.min(2),
      group: 'features'
    }),
    // Product Variants
    defineField({
      name: 'variants',
      title: 'Product Variants',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({
            name: 'name',
            type: 'string',
            validation: Rule => Rule.required(),
            options: {
              aiAssist: {
                translateAction: true
              }
            }
          }),
          defineField({
            name: 'sku',
            type: 'string',
            validation: Rule => Rule.required()
          }),
          defineField({
            name: 'activeIngredients',
            type: 'array',
            of: [{
              type: 'object',
              fields: [
                defineField({
                  name: 'name',
                  type: 'string',
                  validation: Rule => Rule.required()
                }),
                defineField({
                  name: 'amount',
                  type: 'string',
                  validation: Rule => Rule.required()
                }),
                defineField({
                  name: 'units',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'g/L', value: 'g/L' },
                      { title: 'g/kg', value: 'g/kg' },
                      { title: '%w/w', value: '%w/w' },
                      { title: '%w/v', value: '%w/v' }
                    ]
                  },
                  validation: Rule => Rule.required()
                })
              ]
            }],
            validation: Rule => Rule.required().min(1)
          }),
          defineField({
            name: 'formulationType',
            type: 'string',
            options: {
              list: [
                { title: 'Soluble Concentrate (SL)', value: 'SL' },
                { title: 'Emulsifiable Concentrate (EC)', value: 'EC' },
                { title: 'Suspension Concentrate (SC)', value: 'SC' },
                { title: 'Wettable Powder (WP)', value: 'WP' },
                { title: 'Water Dispersible Granules (WG)', value: 'WG' }
              ]
            },
            validation: Rule => Rule.required()
          }),
          defineField({
            name: 'registrationNumber',
            type: 'string',
            validation: Rule => Rule.required()
          }),
          defineField({
            name: 'containerSizes',
            type: 'array',
            of: [{ type: 'string' }],
            validation: Rule => Rule.required().min(1)
          }),
          defineField({
            name: 'documents',
            type: 'array',
            of: [{
              type: 'object',
              fields: [
                defineField({
                  name: 'name',
                  type: 'string',
                  validation: Rule => Rule.required(),
                  options: {
                    aiAssist: {
                      translateAction: true
                    }
                  }
                }),
                defineField({
                  name: 'url',
                  type: 'url',
                  validation: Rule => Rule.required()
                })
              ]
            }]
          })
        ]
      }],
      validation: Rule => Rule.min(1).unique().error('Each variant must be unique'),
      group: 'variants'
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
    }),
    // SEO
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      description: 'Override the default title tag',
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
      description: 'Override the default meta description',
      group: 'seo',
      options: {
        aiAssist: {
          translateAction: true
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
    prepare({ title, subtitle, media, language }) {
      const languageLabels = {
        en: '🇬🇧',
        fr: '🇫🇷',
        de: '🇩🇪',
        es: '🇪🇸',
        it: '🇮🇹',
        pt: '🇵🇹',
        nl: '🇳🇱',
        pl: '🇵🇱',
        hu: '🇭🇺',
        el: '🇬🇷',
        ro: '🇷🇴',
        sk: '🇸🇰'
      } as const
      
      const flag = languageLabels[language as keyof typeof languageLabels] || ''
      
      return {
        title: `${flag} ${title || ''}`,
        subtitle,
        media
      }
    }
  },
  hooks: {
    async beforeDocument(doc: any) {
      const { documents, specifications, ...rest } = doc
      return rest
    }
  }
}) 