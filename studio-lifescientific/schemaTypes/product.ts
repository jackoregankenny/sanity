import { defineField, defineType } from 'sanity'
import { languageField, translationTrackingFields } from '../config/languages'

interface PreviewProps {
  title: string
  subtitle: string
  media: string
  language: string
}

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
    { name: 'crops', title: 'Supported Crops' },
    { name: 'media', title: 'Media' },
    { name: 'seo', title: 'SEO' },
    { name: 'translation', title: 'Translation Info' }
  ],
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
          .replace(/[^a-z0-9-]+/g, '')
          .slice(0, 96)
      },
      validation: Rule => Rule.required(),
      group: 'basic'
    }),
    languageField,
    // Translation tracking fields
    ...translationTrackingFields.map(field => ({
      ...field,
      group: 'translation'
    })),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'object',
      group: 'basic',
      fields: [
        defineField({
          name: 'value',
          title: 'Category Type',
          type: 'string',
          options: {
            list: [
              { title: 'Pesticide', value: 'pesticide' },
              { title: 'Herbicide', value: 'herbicide' },
              { title: 'Fungicide', value: 'fungicide' },
              { title: 'Insecticide', value: 'insecticide' }
            ],
            layout: 'radio'
          },
          validation: Rule => Rule.required()
        }),
        defineField({
          name: 'label',
          title: 'Display Label',
          type: 'string',
          description: 'Translated display name for this category',
          options: {
            aiAssist: {
              translateAction: true
            }
          },
          validation: Rule => Rule.required()
        })
      ],
      preview: {
        select: {
          value: 'value',
          label: 'label'
        },
        prepare({ value, label }) {
          return {
            title: label || value
          }
        }
      }
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
      validation: Rule => Rule.min(1),
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
      validation: Rule => Rule.min(1),
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
            title: 'Active Ingredients',
            type: 'array',
            of: [{
              type: 'object',
              fields: [
                defineField({
                  name: 'name',
                  title: 'Ingredient Name',
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
            title: 'Formulation Type',
            type: 'object',
            fields: [
              defineField({
                name: 'value',
                title: 'Type',
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
                name: 'label',
                title: 'Display Label',
                type: 'string',
                description: 'Translated display name for this formulation type',
                options: {
                  aiAssist: {
                    translateAction: true
                  }
                },
                validation: Rule => Rule.required()
              })
            ],
            preview: {
              select: {
                value: 'value',
                label: 'label'
              },
              prepare({ value, label }) {
                return {
                  title: label || value
                }
              }
            }
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
    // Crop Support
    defineField({
      name: 'supportedCrops',
      title: 'Supported Crops',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({
            name: 'crop',
            title: 'Crop',
            type: 'string',
            validation: Rule => Rule.required(),
            options: {
              aiAssist: {
                translateAction: true
              }
            }
          }),
          defineField({
            name: 'dosage',
            title: 'Dosage',
            type: 'object',
            fields: [
              defineField({
                name: 'amount',
                title: 'Amount',
                type: 'number',
                validation: Rule => Rule.required().positive()
              }),
              defineField({
                name: 'unit',
                title: 'Unit',
                type: 'string',
                options: {
                  list: [
                    { title: 'L/ha', value: 'L/ha' },
                    { title: 'kg/ha', value: 'kg/ha' },
                    { title: 'g/ha', value: 'g/ha' },
                    { title: 'mL/ha', value: 'mL/ha' }
                  ]
                },
                validation: Rule => Rule.required()
              })
            ]
          }),
          defineField({
            name: 'timing',
            title: 'Application Timing',
            type: 'string',
            options: {
              aiAssist: {
                translateAction: true
              }
            }
          }),
          defineField({
            name: 'notes',
            title: 'Special Instructions',
            type: 'text',
            rows: 2,
            options: {
              aiAssist: {
                translateAction: true
              }
            }
          })
        ],
        preview: {
          select: {
            crop: 'crop',
            amount: 'dosage.amount',
            unit: 'dosage.unit'
          },
          prepare(selection: Record<string, any>) {
            const crop = selection.crop as string
            const amount = selection.amount as number | undefined
            const unit = selection.unit as string | undefined
            
            return {
              title: crop,
              subtitle: amount && unit ? `${amount} ${unit}` : undefined
            }
          }
        }
      }],
      group: 'crops',
      validation: Rule => Rule.unique().error('Each crop can only be added once')
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
    prepare(selection: PreviewProps) {
      const { title, subtitle, media, language } = selection
      
      const languageLabels = {
        en: '🌍',
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
  }
})