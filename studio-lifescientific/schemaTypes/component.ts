import { defineField, defineType } from '@sanity/types'
import { languageField } from '../config/languages'

export default defineType({
  name: 'component',
  title: 'Component',
  type: 'document',
  groups: [
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'settings',
      title: 'Settings',
    }
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
      group: 'content'
    }),
    defineField({
      name: 'key',
      title: 'Component Key',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: input => input
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w\-]+/g, '')
          .slice(0, 96)
      },
      validation: Rule => Rule.required()
    }),
    languageField,
    defineField({
      name: 'type',
      title: 'Component Type',
      type: 'string',
      options: {
        list: [
          { title: 'Hero Section', value: 'hero' },
          { title: 'Feature Section', value: 'feature' },
          { title: 'Call to Action', value: 'cta' },
          { title: 'Content Block', value: 'content' },
          { title: 'Image Gallery', value: 'gallery' }
        ]
      },
      validation: Rule => Rule.required(),
      group: 'settings'
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'}
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'}
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url'
                  }
                ]
              }
            ]
          }
        },
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
      ]
    }),
    defineField({
      name: 'settings',
      title: 'Component Settings',
      type: 'object',
      group: 'settings',
      fields: [
        {
          name: 'backgroundColor',
          title: 'Background Color',
          type: 'string',
          options: {
            list: [
              { title: 'White', value: 'white' },
              { title: 'Light Gray', value: 'light-gray' },
              { title: 'Dark', value: 'dark' }
            ]
          }
        },
        {
          name: 'layout',
          title: 'Layout',
          type: 'string',
          options: {
            list: [
              { title: 'Full Width', value: 'full' },
              { title: 'Contained', value: 'contained' },
              { title: 'Split', value: 'split' }
            ]
          }
        }
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      type: 'type',
      language: 'language'
    },
    prepare({ title, type, language }) {
      return {
        title: `${title} (${language.toUpperCase()})`,
        subtitle: `Component Type: ${type}`
      }
    }
  }
}) 