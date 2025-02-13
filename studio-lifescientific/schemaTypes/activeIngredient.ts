import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'activeIngredient',
  title: 'Active Ingredient',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Ingredient Name',
      type: 'string',
      validation: Rule => Rule.required(),
      options: {
        aiAssist: {
          translateAction: true
        }
      }
    }),
    defineField({
      name: 'amount',
      title: 'Amount',
      type: 'string',
      validation: Rule => Rule.required(),
      options: {
        aiAssist: {
          exclude: true
        }
      }
    }),
    defineField({
      name: 'units',
      title: 'Units',
      type: 'string',
      options: {
        list: [
          { title: 'g/L', value: 'g/L' },
          { title: 'g/kg', value: 'g/kg' },
          { title: '%w/w', value: '%w/w' },
          { title: '%w/v', value: '%w/v' }
        ],
        aiAssist: {
          exclude: true
        }
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'iupacName',
      title: 'IUPAC Name',
      type: 'string',
      validation: Rule => Rule.required(),
      options: {
        aiAssist: {
          exclude: true
        }
      }
    }),
    defineField({
      name: 'casNumber',
      title: 'CAS Number',
      type: 'string',
      validation: Rule => Rule.required(),
      options: {
        aiAssist: {
          exclude: true
        }
      }
    })
  ],
  preview: {
    select: {
      title: 'name',
      amount: 'amount',
      units: 'units'
    },
    prepare({ title, amount, units }) {
      return {
        title: title || 'Unnamed Ingredient',
        subtitle: amount && units ? `${amount}${units}` : undefined
      }
    }
  }
}) 