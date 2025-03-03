import { defineField, defineType } from 'sanity'
import { DocumentIcon } from '@sanity/icons'
import { languageField, translationTrackingFields } from '../config/languages'

export default defineType({
  name: 'blogPage',
  title: 'Blog Page',
  type: 'document',
  icon: DocumentIcon,
  groups: [
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'settings',
      title: 'Settings',
    },
    {
      name: 'seo',
      title: 'SEO',
    }
  ],
  fields: [
    languageField,
    ...translationTrackingFields,
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      group: 'content',
      validation: Rule => Rule.required(),
      options: {
        aiAssist: {
          translateAction: true
        }
      }
    }),
    defineField({
      name: 'description',
      title: 'Page Description',
      type: 'text',
      rows: 3,
      group: 'content',
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
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
      group: 'settings'
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Page Sections',
      type: 'array',
      group: 'content',
      of: [
        { type: 'hero' },
        { type: 'featuredPosts' },
        { type: 'categoryList' },
        { type: 'newsletter' },
        { type: 'recentPosts' },
        { type: 'searchSection' }
      ]
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
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
      title: 'title',
      language: 'language'
    },
    prepare({ title, language }) {
      return {
        title: title || 'Blog Page',
        subtitle: `Language: ${language || 'Not set'}`
      }
    }
  }
}) 