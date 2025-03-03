import { defineField, defineType } from 'sanity'
import { languageField, translationTrackingFields } from '../config/languages'
import { DocumentsIcon } from '@sanity/icons'

export default defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  icon: DocumentsIcon,
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
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      group: 'metadata',
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
      group: 'metadata',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      group: 'metadata',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      group: 'content',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      group: 'content',
      description: 'A short summary of the blog post shown in listings',
      options: {
        aiAssist: {
          translateAction: true
        }
      }
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' }
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Number', value: 'number' }
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
              { title: 'Underline', value: 'underline' },
              { title: 'Strike', value: 'strike-through' }
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
                  },
                  {
                    name: 'openInNewTab',
                    type: 'boolean',
                    title: 'Open in new tab',
                    initialValue: true
                  }
                ]
              }
            ]
          }
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
              options: {
                aiAssist: {
                  translateAction: true
                }
              }
            },
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for SEO and accessibility',
              options: {
                aiAssist: {
                  translateAction: true
                }
              }
            }
          ]
        },
        {
          type: 'code',
          title: 'Code Block',
          options: {
            language: 'js',
            languageAlternatives: [
              { title: 'JavaScript', value: 'js' },
              { title: 'HTML', value: 'html' },
              { title: 'CSS', value: 'css' },
              { title: 'TypeScript', value: 'typescript' },
              { title: 'PHP', value: 'php' },
              { title: 'Python', value: 'python' },
              { title: 'Bash', value: 'bash' },
              { title: 'JSON', value: 'json' }
            ]
          }
        }
      ],
      group: 'content',
      options: {
        aiAssist: {
          translateAction: true
        }
      }
    }),
    defineField({
      name: 'relatedPosts',
      title: 'Related Posts',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'blogPost' }] }],
      group: 'metadata',
      validation: Rule => Rule.unique()
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      group: 'seo',
      description: 'Override the default post title for SEO purposes',
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
      author: 'author.name',
      media: 'featuredImage',
      language: 'language'
    },
    prepare({ title, author, media, language }) {
      return {
        title: title || 'Untitled Post',
        subtitle: `${author ? `By ${author}` : ''} • Language: ${language || 'Not set'}`,
        media
      }
    }
  }
}) 