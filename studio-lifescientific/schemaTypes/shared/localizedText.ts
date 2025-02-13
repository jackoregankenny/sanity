import { defineField, defineType } from 'sanity'

export const localizedText = defineType({
  title: 'Localized Text',
  name: 'localizedText',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'string',
      validation: Rule => Rule.required(),
      options: {
        aiAssist: {
          translateAction: true
        }
      }
    })
  ],
  preview: {
    select: {
      title: 'text'
    }
  }
}) 