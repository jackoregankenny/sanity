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
    defineField({
      name: 'title',
      title: 'Page Title',
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
      name: 'subtitle',
      title: 'Page Subtitle',
      type: 'string',
      group: 'content',
      options: {
        aiAssist: {
          translateAction: true
        }
      }
    }),
    languageField,
    ...translationTrackingFields,
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
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      group: 'content'
    }),
    defineField({
      name: 'postsPerPage',
      title: 'Posts Per Page',
      type: 'number',
      initialValue: 9,
      validation: Rule => Rule.required().min(1).max(24),
      group: 'settings'
    }),
    defineField({
      name: 'featuredPosts',
      title: 'Featured Posts',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'blogPost' }] }],
      group: 'content',
      description: 'Selected posts to highlight at the top of the blog page',
      validation: Rule => Rule.unique()
    }),
    defineField({
      name: 'showAuthorBio',
      title: 'Show Author Bio',
      type: 'boolean',
      initialValue: true,
      group: 'settings'
    }),
    defineField({
      name: 'showCategoriesWidget',
      title: 'Show Categories Widget',
      type: 'boolean',
      initialValue: true,
      group: 'settings'
    }),
    defineField({
      name: 'showRecentPostsWidget',
      title: 'Show Recent Posts Widget',
      type: 'boolean',
      initialValue: true,
      group: 'settings'
    }),
    defineField({
      name: 'showSubscribeWidget',
      title: 'Show Subscribe Widget',
      type: 'boolean',
      initialValue: true,
      group: 'settings'
    }),
    defineField({
      name: 'subscribeFormTitle',
      title: 'Subscribe Form Title',
      type: 'string',
      initialValue: 'Stay Updated',
      group: 'content',
      options: {
        aiAssist: {
          translateAction: true
        }
      }
    }),
    defineField({
      name: 'subscribeFormText',
      title: 'Subscribe Form Text',
      type: 'text',
      rows: 2,
      initialValue: 'Join our newsletter for the latest insights and updates.',
      group: 'content',
      options: {
        aiAssist: {
          translateAction: true
        }
      }
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
        title: title || 'Blog Page',
        subtitle: `Language: ${language || 'Not set'}`
      }
    }
  }
}) 