import { defineField, defineType } from 'sanity'
import { RocketIcon } from '@sanity/icons'
import { CallToActionInfo } from '../../components/ComponentInfo'

export default defineType({
  name: 'callToAction',
  title: 'Call to Action',
  type: 'document',
  icon: RocketIcon,
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'styling', title: 'Styling' },
  ],
  fields: [
    // Documentation
    defineField({
      name: 'info',
      type: 'string',
      components: {
        field: CallToActionInfo
      },
      readOnly: true,
      group: 'content'
    }),
    // Content Fields
    defineField({
      name: 'title',
      title: 'Component Title',
      type: 'string',
      description: 'Internal title for this component',
      validation: Rule => Rule.required(),
      group: 'content'
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'localizedText',
      description: 'The main heading for the CTA',
      group: 'content'
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localizedText',
      description: 'A brief description or subheading',
      group: 'content'
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'localizedText',
      description: 'Text to display on the button',
      validation: Rule => Rule.required(),
      group: 'content'
    }),
    defineField({
      name: 'buttonUrl',
      title: 'Button URL',
      type: 'string',
      description: 'Where should the button link to?',
      validation: Rule => Rule.required(),
      group: 'content'
    }),
    // Styling Fields
    defineField({
      name: 'style',
      title: 'Style Variant',
      type: 'string',
      options: {
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Accent', value: 'accent' }
        ]
      },
      initialValue: 'primary',
      group: 'styling'
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          { title: 'White', value: 'white' },
          { title: 'Light Gray', value: 'gray-50' },
          { title: 'Brand', value: 'brand' }
        ]
      },
      initialValue: 'white',
      group: 'styling'
    })
  ],
  preview: {
    select: {
      title: 'title',
      heading: 'heading.text',
      style: 'style'
    },
    prepare({ title, heading, style }) {
      return {
        title: title || 'Call to Action',
        subtitle: heading || 'No heading set',
        media: RocketIcon,
        description: `Style: ${style}`
      }
    }
  }
}) 