import { defineField, defineType } from '@sanity/types'

export default defineType({
  name: 'productVariant',
  title: 'Product Variant',
  type: 'object',
  fields: [
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
      options: {
        list: [
          { title: 'Ireland', value: 'IE' },
          { title: 'United Kingdom', value: 'UK' }
        ]
      }
    }),
    defineField({
      name: 'crop',
      title: 'Crop',
      type: 'string',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'cropGroup',
      title: 'Crop Group',
      type: 'string'
    }),
    defineField({
      name: 'approvalNumber',
      title: 'Approval Number',
      type: 'string'
    }),
    defineField({
      name: 'formulationType',
      title: 'Formulation Type',
      type: 'string'
    }),
    defineField({
      name: 'mechanismOfAction',
      title: 'Mechanism of Action',
      type: 'string'
    }),
    defineField({
      name: 'containerSize',
      title: 'Container Size',
      type: 'string'
    }),
    defineField({
      name: 'sizeUnit',
      title: 'Size Unit',
      type: 'string'
    }),
    defineField({
      name: 'unitsPerPackage',
      title: 'Units Per Package',
      type: 'string'
    }),
    defineField({
      name: 'weight',
      title: 'Weight',
      type: 'string'
    }),
    defineField({
      name: 'weightUnits',
      title: 'Weight Units',
      type: 'string'
    }),
    defineField({
      name: 'details',
      title: 'Details',
      type: 'array',
      of: [
        { type: 'productDocument' },
        { type: 'activeIngredient' }
      ]
    })
  ]
}) 