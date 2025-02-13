import { defineField, defineType } from '@sanity/types'
import { languageField } from '../../config/languages'

// Shared text content type for reusable text blocks
const localizedText = {
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
  ]
}

// Product page UI text schema
export const productPageLayout = defineType({
  name: 'productPageLayout',
  title: 'Product Page Layout',
  type: 'document',
  groups: [
    {
      name: 'hero',
      title: 'Hero Section',
    },
    {
      name: 'features',
      title: 'Features Section',
    },
    {
      name: 'specs',
      title: 'Specifications Section',
    },
    {
      name: 'variants',
      title: 'Variants Section',
    },
    {
      name: 'related',
      title: 'Related Products Section',
    }
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Layout Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    languageField,
    defineField({
      name: 'isDefault',
      title: 'Is Default Layout',
      type: 'boolean',
      initialValue: false
    }),
    // Hero Section
    defineField({
      name: 'ctaText',
      title: 'Call to Action Text',
      type: 'localizedText',
      group: 'hero'
    }),
    // Features Section
    defineField({
      name: 'featuresTitle',
      title: 'Features Section Title',
      type: 'localizedText',
      group: 'features'
    }),
    // Specifications Section
    defineField({
      name: 'specsTitle',
      title: 'Specifications Section Title',
      type: 'localizedText',
      group: 'specs'
    }),
    defineField({
      name: 'specLabels',
      title: 'Specification Labels',
      type: 'object',
      group: 'specs',
      fields: [
        defineField({ name: 'activeIngredient', type: 'localizedText', title: 'Active Ingredient Label' }),
        defineField({ name: 'concentration', type: 'localizedText', title: 'Concentration Label' }),
        defineField({ name: 'formulationType', type: 'localizedText', title: 'Formulation Type Label' }),
        defineField({ name: 'mechanismOfAction', type: 'localizedText', title: 'Mechanism of Action Label' })
      ]
    }),
    // Variants Section
    defineField({
      name: 'variantsTitle',
      title: 'Variants Section Title',
      type: 'localizedText',
      group: 'variants'
    }),
    // Related Products Section
    defineField({
      name: 'relatedTitle',
      title: 'Related Products Section Title',
      type: 'localizedText',
      group: 'related'
    })
  ],
  preview: {
    select: {
      title: 'title',
      language: 'language',
      isDefault: 'isDefault'
    },
    prepare({ title, language, isDefault }) {
      return {
        title: `${title} (${language.toUpperCase()})`,
        subtitle: isDefault ? 'Default Layout' : 'Custom Layout'
      }
    }
  }
})

// Export the localized text type for reuse
export const sharedTypes = [
  defineType({
    ...localizedText,
    preview: {
      select: {
        title: 'text'
      }
    }
  })
] 