import { defineField, defineType } from '@sanity/types'
import { languageField } from '../config/languages'
import { DocumentIcon } from '@sanity/icons'

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: DocumentIcon,
  groups: [
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'seo',
      title: 'SEO',
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
      name: 'slug',
      title: 'Slug',
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
      name: 'pageBuilder',
      title: 'Page Builder',
      type: 'array',
      group: 'content',
      of: [
        { type: 'hero' },
        { type: 'features' },
        { type: 'gallery' },
        { type: 'video' }
      ],
      options: {
        layout: 'grid',
        insertMenu: {
          filter: true,
          groups: [
            {
              name: 'content',
              title: 'Content Blocks',
              of: ['hero', 'features']
            },
            {
              name: 'media',
              title: 'Media',
              of: ['gallery', 'video']
            }
          ],
          views: [
            { name: 'list' },
            { 
              name: 'grid',
              previewImageUrl: (schemaTypeName) => `/static/preview-${schemaTypeName}.jpg`
            }
          ]
        }
      }
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      group: 'seo'
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      group: 'seo'
    })
  ],
  preview: {
    select: {
      title: 'title',
      language: 'language'
    },
    prepare({ title, language }) {
      return {
        title: `${title} (${language.toUpperCase()})`
      }
    }
  }
}) 