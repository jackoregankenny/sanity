import { defineField, defineType } from '@sanity/types'
import { languageField, translationTrackingFields } from '../config/languages'
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
      name: 'metadata',
      title: 'Metadata',
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
        slugify: input => input
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w\-]+/g, '')
          .slice(0, 96)
      },
      validation: Rule => Rule.required(),
      group: 'metadata'
    }),
    languageField,
    ...translationTrackingFields,
    defineField({
      name: 'pageBuilder',
      title: 'Page Builder',
      type: 'array',
      group: 'content',
      of: [
        // Landing Page Sections
        { type: 'landingHero' },
        { type: 'landingFeatures' },
        { type: 'landingProducts' },
        { type: 'landingResearch' },
        { type: 'landingAbout' },
        { type: 'landingTestimonials' },
        { type: 'landingContact' },
        
        // Standard Page Blocks
        { type: 'hero' },
        { type: 'pageFeatures' },
        { type: 'pageGallery' },
        { type: 'pageVideo' },
        { 
          type: 'object',
          name: 'contentBlock',
          title: 'Content Block',
          fields: [
            defineField({
              name: 'content',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [
                    {title: 'Normal', value: 'normal'},
                    {title: 'H2', value: 'h2'},
                    {title: 'H3', value: 'h3'},
                    {title: 'H4', value: 'h4'}
                  ],
                  lists: [
                    {title: 'Bullet', value: 'bullet'},
                    {title: 'Number', value: 'number'}
                  ],
                  marks: {
                    decorators: [
                      {title: 'Strong', value: 'strong'},
                      {title: 'Emphasis', value: 'em'}
                    ],
                    annotations: [
                      {
                        name: 'link',
                        type: 'object',
                        title: 'Link',
                        fields: [
                          {
                            name: 'href',
                            type: 'url',
                            title: 'URL'
                          }
                        ]
                      }
                    ]
                  }
                }
              ],
              options: {
                aiAssist: {
                  translateAction: true
                }
              }
            })
          ]
        }
      ],
      validation: Rule => Rule.required().min(1)
    }),
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
      title: 'title',
      language: 'language'
    },
    prepare({ title, language }) {
      return {
        title: title || 'Untitled Page',
        subtitle: `Language: ${language || 'Not set'}`
      }
    }
  }
}) 