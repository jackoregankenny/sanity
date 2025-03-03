import { defineField, defineType } from 'sanity'
import { DocumentIcon, TagIcon, EnvelopeIcon, DocumentsIcon, SearchIcon } from '@sanity/icons'

export const featuredPostsBlock = defineType({
  name: 'featuredPosts',
  title: 'Featured Posts',
  type: 'object',
  icon: DocumentsIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'localizedText',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'posts',
      title: 'Featured Posts',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'blogPost' }]
        }
      ],
      validation: Rule => Rule.required().min(1).max(6)
    })
  ],
  preview: {
    select: {
      title: 'heading.text',
      postsCount: 'posts.length'
    },
    prepare({ title, postsCount = 0 }) {
      return {
        title: title || 'Featured Posts',
        subtitle: `${postsCount} post${postsCount === 1 ? '' : 's'}`,
        media: DocumentsIcon
      }
    }
  }
})

export const categoryListBlock = defineType({
  name: 'categoryList',
  title: 'Category List',
  type: 'object',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'localizedText'
    }),
    defineField({
      name: 'categories',
      title: 'Categories to Display',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'category' }]
        }
      ],
      validation: Rule => Rule.required()
    })
  ],
  preview: {
    select: {
      title: 'heading.text',
      categoriesCount: 'categories.length'
    },
    prepare({ title, categoriesCount = 0 }) {
      return {
        title: title || 'Category List',
        subtitle: `${categoriesCount} categor${categoriesCount === 1 ? 'y' : 'ies'}`,
        media: TagIcon
      }
    }
  }
})

export const newsletterBlock = defineType({
  name: 'newsletter',
  title: 'Newsletter Section',
  type: 'object',
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'localizedText',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localizedText'
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'localizedText',
      validation: Rule => Rule.required()
    })
  ],
  preview: {
    select: {
      title: 'heading.text'
    },
    prepare({ title }) {
      return {
        title: title || 'Newsletter Section',
        media: EnvelopeIcon
      }
    }
  }
})

export const recentPostsBlock = defineType({
  name: 'recentPosts',
  title: 'Recent Posts',
  type: 'object',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'localizedText',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'postsToShow',
      title: 'Number of Posts to Show',
      type: 'number',
      initialValue: 6,
      validation: Rule => Rule.required().min(1).max(12)
    })
  ],
  preview: {
    select: {
      title: 'heading.text',
      count: 'postsToShow'
    },
    prepare({ title, count }) {
      return {
        title: title || 'Recent Posts',
        subtitle: `Shows ${count} posts`,
        media: DocumentIcon
      }
    }
  }
})

export const searchSectionBlock = defineType({
  name: 'searchSection',
  title: 'Search Section',
  type: 'object',
  icon: SearchIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'localizedText'
    }),
    defineField({
      name: 'placeholder',
      title: 'Search Placeholder',
      type: 'localizedText',
      validation: Rule => Rule.required()
    })
  ],
  preview: {
    select: {
      title: 'heading.text'
    },
    prepare({ title }) {
      return {
        title: title || 'Search Section',
        media: SearchIcon
      }
    }
  }
})

export const blogBlocks = [
  featuredPostsBlock,
  categoryListBlock,
  newsletterBlock,
  recentPostsBlock,
  searchSectionBlock
] 