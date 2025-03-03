import { defineField, defineType } from 'sanity'
import { languageField } from '../config/languages'
import { MenuIcon } from '@sanity/icons'

export default defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  icon: MenuIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'Name this navigation (e.g., "Main Navigation", "Footer Navigation")'
    }),
    languageField,
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Upload the logo for the navigation bar'
    }),
    defineField({
      name: 'logoText',
      title: 'Logo Text',
      type: 'string',
      description: 'Text to display if logo is not available or as alt text'
    }),
    defineField({
      name: 'items',
      title: 'Navigation Items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'link',
          title: 'Link',
          fields: [
            defineField({
              name: 'text',
              title: 'Link Text',
              type: 'string',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'href',
              title: 'Link URL',
              type: 'string',
              description: 'Use relative URLs like "/products" or "/blog"',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'isExternal',
              title: 'Is External Link',
              type: 'boolean',
              initialValue: false
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  { title: 'None', value: '' },
                  { title: 'Home', value: 'home' },
                  { title: 'Products', value: 'package' },
                  { title: 'Blog', value: 'file-text' },
                  { title: 'Contact', value: 'mail' },
                  { title: 'About', value: 'info' }
                ]
              }
            }),
            defineField({
              name: 'children',
              title: 'Dropdown Items',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'dropdownLink',
                  title: 'Dropdown Link',
                  fields: [
                    defineField({
                      name: 'text',
                      title: 'Link Text',
                      type: 'string',
                      validation: Rule => Rule.required()
                    }),
                    defineField({
                      name: 'href',
                      title: 'Link URL',
                      type: 'string',
                      validation: Rule => Rule.required()
                    }),
                    defineField({
                      name: 'isExternal',
                      title: 'Is External Link',
                      type: 'boolean',
                      initialValue: false
                    })
                  ],
                  preview: {
                    select: {
                      title: 'text',
                      subtitle: 'href'
                    }
                  }
                }
              ]
            })
          ],
          preview: {
            select: {
              title: 'text',
              subtitle: 'href',
              hasChildren: 'children'
            },
            prepare({ title, subtitle, hasChildren }) {
              return {
                title: title || 'Untitled',
                subtitle: hasChildren?.length > 0 
                  ? `${subtitle} (with dropdown - ${hasChildren.length} items)`
                  : subtitle
              }
            }
          }
        }
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      language: 'language'
    },
    prepare({ title, language }) {
      return {
        title: title || 'Unnamed Navigation',
        subtitle: `Language: ${language || 'Not set'}`
      }
    }
  }
}) 