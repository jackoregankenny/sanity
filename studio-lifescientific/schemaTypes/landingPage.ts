import { defineField, defineType } from 'sanity'
import { languageField } from '../config/languages'
import { HomeIcon } from '@sanity/icons'
import { imageWithAlt } from './blocks/pageBlocks'

export default defineType({
  name: 'landingPage',
  title: 'Landing Page',
  type: 'document',
  icon: HomeIcon,
  groups: [
    {
      name: 'hero',
      title: 'Hero Section',
    },
    {
      name: 'features',
      title: 'Features Section',
    },
    {
      name: 'products',
      title: 'Products Section',
    },
    {
      name: 'seo',
      title: 'SEO',
    }
  ],
  fields: [
    languageField,
    // Hero Section
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      group: 'hero',
      validation: Rule => Rule.required(),
      options: {
        aiAssist: {
          translateAction: true
        }
      }
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      rows: 3,
      group: 'hero',
      validation: Rule => Rule.required(),
      options: {
        aiAssist: {
          translateAction: true
        }
      }
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      group: 'hero',
      ...imageWithAlt
    }),
    // Features Section
    defineField({
      name: 'featuresTitle',
      title: 'Features Section Title',
      type: 'string',
      group: 'features',
      validation: Rule => Rule.required(),
      options: {
        aiAssist: {
          translateAction: true
        }
      }
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      group: 'features',
      of: [{
        type: 'object',
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
          }),
          defineField({
            name: 'icon',
            type: 'string',
            options: {
              list: [
                { title: 'Leaf', value: 'leaf' },
                { title: 'Flask', value: 'flask' },
                { title: 'Shield', value: 'shield' },
                { title: 'Star', value: 'star' }
              ]
            }
          })
        ]
      }],
      validation: Rule => Rule.required().min(1)
    }),
    // Products Section
    defineField({
      name: 'productsTitle',
      title: 'Products Section Title',
      type: 'string',
      group: 'products',
      validation: Rule => Rule.required(),
      options: {
        aiAssist: {
          translateAction: true
        }
      }
    }),
    defineField({
      name: 'productsSubtitle',
      title: 'Products Section Subtitle',
      type: 'text',
      rows: 2,
      group: 'products',
      validation: Rule => Rule.required(),
      options: {
        aiAssist: {
          translateAction: true
        }
      }
    }),
    defineField({
      name: 'featuredProducts',
      title: 'Featured Products',
      type: 'array',
      group: 'products',
      of: [
        {
          type: 'reference',
          to: [{ type: 'product' }],
          options: {
            filter: 'language == $language',
            filterParams: {
              language: 'language'
            }
          }
        }
      ],
      validation: Rule => Rule.required().min(1).max(6)
    }),
    // SEO Fields (reusing the same structure as page.ts)
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      group: 'seo',
      description: 'Override the default page title for SEO purposes',
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
      description: 'Override the default meta description for SEO purposes',
      options: {
        aiAssist: {
          translateAction: true
        }
      }
    })
  ],
  preview: {
    select: {
      title: 'heroTitle',
      language: 'language'
    },
    prepare({ title, language }) {
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
        title: `${flag} Landing Page`
      }
    }
  }
}) 