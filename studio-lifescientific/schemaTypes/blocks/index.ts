import { defineArrayMember, defineField, defineType } from 'sanity'
import { DocumentTextIcon, ImageIcon, PlayIcon, TagIcon } from '@sanity/icons'

// Hero Block
export const heroBlock = defineType({
  name: 'hero',
  type: 'object',
  title: 'Hero',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'heading',
      type: 'localizedText'
    }),
    defineField({
      name: 'subheading',
      type: 'localizedText'
    }),
    defineField({
      name: 'ctaText',
      type: 'localizedText'
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.'
        })
      ]
    })
  ],
  preview: {
    select: {
      title: 'heading.text',
      media: 'image'
    },
    prepare({ title, media }) {
      return {
        title: title || 'Hero',
        subtitle: 'Hero Section',
        media: media || DocumentTextIcon
      }
    }
  }
})

// Features Block
export const featuresBlock = defineType({
  name: 'features',
  type: 'object',
  title: 'Features',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'heading',
      type: 'localizedText'
    }),
    defineField({
      name: 'features',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'title', type: 'localizedText' }),
            defineField({ name: 'description', type: 'localizedText' }),
            defineField({
              name: 'icon',
              type: 'string',
              options: {
                list: [
                  { title: 'Shield', value: 'shield' },
                  { title: 'Leaf', value: 'leaf' },
                  { title: 'Lab', value: 'lab' },
                  { title: 'Chart', value: 'chart' }
                ]
              }
            })
          ]
        })
      ]
    })
  ],
  preview: {
    select: {
      title: 'heading.text'
    },
    prepare({ title }) {
      return {
        title: title || 'Features',
        subtitle: 'Features Section',
        media: TagIcon
      }
    }
  }
})

// Gallery Block
export const galleryBlock = defineType({
  name: 'gallery',
  type: 'object',
  title: 'Gallery',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'heading',
      type: 'localizedText'
    }),
    defineField({
      name: 'images',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for SEO and accessibility.'
            })
          ]
        })
      ],
      options: {
        layout: 'grid'
      }
    })
  ],
  preview: {
    select: {
      title: 'heading.text',
      media: 'images.0'
    },
    prepare({ title, media }) {
      return {
        title: title || 'Gallery',
        subtitle: 'Image Gallery',
        media: media || ImageIcon
      }
    }
  }
})

// Video Block
export const videoBlock = defineType({
  name: 'video',
  type: 'object',
  title: 'Video',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'heading',
      type: 'localizedText'
    }),
    defineField({
      name: 'url',
      type: 'url',
      title: 'Video URL'
    }),
    defineField({
      name: 'caption',
      type: 'localizedText'
    })
  ],
  preview: {
    select: {
      title: 'heading.text'
    },
    prepare({ title }) {
      return {
        title: title || 'Video',
        subtitle: 'Video Section',
        media: PlayIcon
      }
    }
  }
})

export const blocks = [
  heroBlock,
  featuresBlock,
  galleryBlock,
  videoBlock
] 