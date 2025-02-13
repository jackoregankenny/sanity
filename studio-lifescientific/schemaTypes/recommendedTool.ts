import { defineField, defineType } from '@sanity/types'
import { languageField } from '../config/languages'

export default defineType({
  name: 'recommendedTool',
  title: 'Recommended Tool',
  type: 'document',
  groups: [
    {
      name: 'basic',
      title: 'Basic Information',
    },
    {
      name: 'details',
      title: 'Tool Details',
    },
    {
      name: 'media',
      title: 'Media',
    }
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Tool Name',
      type: 'string',
      validation: Rule => Rule.required(),
      group: 'basic'
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
          { title: 'Farm Equipment', value: 'equipment' },
          { title: 'Digital Tools', value: 'digital' },
          { title: 'Agricultural Services', value: 'services' },
          { title: 'Precision Farming', value: 'precision' },
          { title: 'Sustainability Tools', value: 'sustainability' }
        ]
      },
      validation: Rule => Rule.required(),
      group: 'basic'
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required().max(200),
      group: 'basic'
    }),
    defineField({
      name: 'description',
      title: 'Full Description',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'}
          ]
        }
      ],
      group: 'details'
    }),
    defineField({
      name: 'features',
      title: 'Key Features',
      type: 'array',
      of: [{ type: 'string' }],
      validation: Rule => Rule.required().min(1),
      group: 'details'
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      of: [{ type: 'string' }],
      validation: Rule => Rule.required().min(1),
      group: 'details'
    }),
    defineField({
      name: 'manufacturer',
      title: 'Manufacturer/Provider',
      type: 'string',
      group: 'details'
    }),
    defineField({
      name: 'website',
      title: 'Website',
      type: 'url',
      group: 'details'
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.'
        }
      ],
      validation: Rule => Rule.required(),
      group: 'media'
    }),
    defineField({
      name: 'gallery',
      title: 'Image Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for SEO and accessibility.'
            }
          ]
        }
      ],
      group: 'media'
    }),
    defineField({
      name: 'price',
      title: 'Price Range',
      type: 'string',
      options: {
        list: [
          { title: '€ Budget-Friendly', value: 'budget' },
          { title: '€€ Mid-Range', value: 'mid' },
          { title: '€€€ Premium', value: 'premium' },
          { title: 'Contact for Pricing', value: 'contact' }
        ]
      },
      group: 'details'
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'mainImage',
      language: 'language'
    },
    prepare({ title, subtitle, media, language }) {
      return {
        title: `${title} (${language.toUpperCase()})`,
        subtitle: `Category: ${subtitle}`,
        media
      }
    }
  }
}) 