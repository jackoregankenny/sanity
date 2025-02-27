import { defineField, defineType } from 'sanity'
import { PlayIcon } from '@sanity/icons'

export const videoBlock = defineType({
  name: 'pageVideo',
  type: 'object',
  title: 'Video Section',
  icon: PlayIcon,
  preview: {
    select: {
      title: 'title',
      url: 'url'
    },
    prepare({ title, url }) {
      return {
        title: title || 'Video Section',
        subtitle: url,
        media: PlayIcon
      }
    }
  },
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
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      options: {
        aiAssist: {
          translateAction: true
        }
      }
    }),
    defineField({
      name: 'url',
      title: 'Video URL',
      description: 'Supports YouTube, Vimeo, or other video embed URLs',
      type: 'url',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'thumbnail',
      title: 'Video Thumbnail',
      type: 'image',
      description: 'Optional thumbnail to show before the video plays',
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
      name: 'aspectRatio',
      title: 'Aspect Ratio',
      type: 'string',
      options: {
        list: [
          { title: '16:9', value: '16:9' },
          { title: '4:3', value: '4:3' },
          { title: '1:1', value: '1:1' }
        ],
        layout: 'radio'
      },
      initialValue: '16:9'
    })
  ]
}) 