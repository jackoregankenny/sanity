import { defineField, defineType } from 'sanity'
import { ImageIcon, DocumentTextIcon, PlayIcon, StackIcon } from '@sanity/icons'

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

// Hero Block
export const heroBlock = defineType({
  name: 'pageHero',
  title: 'Hero Section',
  type: 'object',
  icon: ImageIcon,
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
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
      options: {
        aiAssist: {
          translateAction: true
        }
      }
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      ...imageWithAlt
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
          type: 'string'
        })
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      media: 'backgroundImage'
    }
  }
})

// Features Block
export const featuresBlock = defineType({
  name: 'pageFeatures',
  title: 'Features Section',
  type: 'object',
  icon: StackIcon,
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
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
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
      of: [{
        type: 'object',
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
            rows: 3,
            validation: Rule => Rule.required(),
            options: {
              aiAssist: {
                translateAction: true
              }
            }
          }),
          defineField({
            name: 'icon',
            title: 'Icon',
            ...imageWithAlt
          })
        ]
      }],
      validation: Rule => Rule.required().min(1)
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Grid', value: 'grid' },
          { title: 'List', value: 'list' }
        ]
      },
      initialValue: 'grid'
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle'
    }
  }
})

// Gallery Block
export const galleryBlock = defineType({
  name: 'pageGallery',
  title: 'Gallery Section',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      options: {
        aiAssist: {
          translateAction: true
        }
      }
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
      options: {
        aiAssist: {
          translateAction: true
        }
      }
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({
            name: 'image',
            title: 'Image',
            ...imageWithAlt
          }),
          defineField({
            name: 'caption',
            title: 'Caption',
            type: 'string',
            options: {
              aiAssist: {
                translateAction: true
              }
            }
          })
        ]
      }],
      validation: Rule => Rule.required().min(1)
    }),
    defineField({
      name: 'columns',
      title: 'Columns',
      type: 'number',
      options: {
        list: [
          { title: '2 Columns', value: 2 },
          { title: '3 Columns', value: 3 },
          { title: '4 Columns', value: 4 }
        ]
      },
      initialValue: 3
    })
  ],
  preview: {
    select: {
      title: 'title',
      media: 'images.0.image'
    }
  }
})

// Video Block
export const videoBlock = defineType({
  name: 'pageVideo',
  title: 'Video Section',
  type: 'object',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      options: {
        aiAssist: {
          translateAction: true
        }
      }
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
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
      type: 'url',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'type',
      title: 'Video Type',
      type: 'string',
      options: {
        list: [
          { title: 'YouTube', value: 'youtube' },
          { title: 'Vimeo', value: 'vimeo' },
          { title: 'File', value: 'file' }
        ]
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'poster',
      title: 'Poster Image',
      description: 'Displayed before the video plays (only for uploaded videos)',
      ...imageWithAlt,
      hidden: ({ parent }) => parent?.type !== 'file'
    })
  ],
  preview: {
    select: {
      title: 'title',
      type: 'type'
    },
    prepare({ title, type }) {
      return {
        title: title || 'Video',
        subtitle: `Type: ${type}`
      }
    }
  }
}) 