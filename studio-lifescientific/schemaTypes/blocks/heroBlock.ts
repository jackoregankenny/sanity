import { defineField, defineType } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

export const heroBlock = defineType({
  name: 'hero',
  type: 'object',
  title: 'Hero Section',
  icon: DocumentTextIcon,
  preview: {
    select: {
      title: 'heading',
      subtitle: 'subheading',
      media: 'image'
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Hero Section',
        subtitle: subtitle,
        media: media || DocumentTextIcon
      }
    }
  },
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: Rule => Rule.required(),
      options: {
        aiAssist: {
          translateAction: true
        }
      }
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 2,
      options: {
        aiAssist: {
          translateAction: true
        }
      }
    }),
    defineField({
      name: 'image',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true
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
      ]
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Button Text',
          type: 'string',
          options: {
            aiAssist: {
              translateAction: true
            }
          }
        }),
        defineField({
          name: 'link',
          title: 'Button Link',
          type: 'url',
          validation: Rule => Rule.required()
        })
      ]
    })
  ]
}) 