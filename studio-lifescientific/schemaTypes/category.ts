import { defineField, defineType } from 'sanity'
import { TagIcon } from '@sanity/icons'
import { languageField, translationTrackingFields } from '../config/languages'

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
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
        slugify: input => input
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w\-]+/g, '')
          .slice(0, 96)
      },
      validation: Rule => Rule.required()
    }),
    languageField,
    ...translationTrackingFields,
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      options: {
        aiAssist: {
          translateAction: true
        }
      }
    }),
    defineField({
      name: 'color',
      title: 'Color',
      type: 'string',
      description: 'Color used for category highlighting',
      options: {
        list: [
          { title: 'Teal', value: 'teal' },
          { title: 'Green', value: 'green' },
          { title: 'Blue', value: 'blue' },
          { title: 'Purple', value: 'purple' },
          { title: 'Red', value: 'red' },
          { title: 'Orange', value: 'orange' },
          { title: 'Yellow', value: 'yellow' },
          { title: 'Gray', value: 'gray' }
        ]
      },
      initialValue: 'teal'
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      }
    })
  ],
  preview: {
    select: {
      title: 'title',
      media: 'featuredImage',
      language: 'language'
    },
    prepare({ title, media, language }) {
      return {
        title: title || 'Untitled Category',
        subtitle: `Language: ${language || 'Not set'}`,
        media
      }
    }
  }
}) 