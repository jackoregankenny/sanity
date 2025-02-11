import { defineField, defineType } from '@sanity/types'

export default defineType({
  name: 'activeIngredient',
  title: 'Active Ingredient',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string'
    }),
    defineField({
      name: 'amount',
      title: 'Amount',
      type: 'string'
    }),
    defineField({
      name: 'units',
      title: 'Units',
      type: 'string'
    })
  ]
}) 