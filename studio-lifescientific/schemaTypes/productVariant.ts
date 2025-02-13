import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'productVariant',
  title: 'Product Variant',
  type: 'object',
  groups: [
    { name: 'basic', title: 'Basic Information', default: true },
    { name: 'ingredients', title: 'Active Ingredients' },
    { name: 'regulatory', title: 'Regulatory Information' }
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Variant Name',
      type: 'string',
      validation: Rule => Rule.required(),
      group: 'basic',
      options: {
        aiAssist: {
          translateAction: true
        }
      }
    }),
    defineField({
      name: 'sku',
      title: 'SKU',
      type: 'string',
      validation: Rule => Rule.required(),
      group: 'basic',
      options: {
        aiAssist: {
          exclude: true
        }
      }
    }),
    defineField({
      name: 'activeIngredients',
      title: 'Active Ingredients',
      type: 'array',
      of: [{
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
          })
        ]
      }],
      validation: Rule => Rule.required().min(1),
      group: 'ingredients',
      options: {
        aiAssist: {
          exclude: true
        }
      }
    }),
    defineField({
      name: 'formulationType',
      title: 'Formulation Type',
      type: 'string',
      options: {
        list: [
          { title: 'Soluble Concentrate (SL)', value: 'SL' },
          { title: 'Emulsifiable Concentrate (EC)', value: 'EC' },
          { title: 'Suspension Concentrate (SC)', value: 'SC' },
          { title: 'Wettable Powder (WP)', value: 'WP' },
          { title: 'Water Dispersible Granules (WG)', value: 'WG' }
        ],
        aiAssist: {
          exclude: true
        }
      },
      validation: Rule => Rule.required(),
      group: 'regulatory'
    }),
    defineField({
      name: 'registrationNumber',
      title: 'Registration Number',
      type: 'string',
      validation: Rule => Rule.required(),
      group: 'regulatory',
      options: {
        aiAssist: {
          exclude: true
        }
      }
    }),
    defineField({
      name: 'containerSizes',
      title: 'Container Sizes',
      type: 'array',
      of: [{ type: 'string' }],
      validation: Rule => Rule.required().min(1),
      group: 'regulatory',
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
      ingredients: 'activeIngredients'
    },
    prepare({ title, ingredients = [] }) {
      const firstIngredient = ingredients[0]
      const subtitle = firstIngredient 
        ? `${firstIngredient.name} ${firstIngredient.amount}${firstIngredient.units}`
        : 'No ingredients'

      return {
        title: title || 'Unnamed Variant',
        subtitle
      }
    }
  }
}) 