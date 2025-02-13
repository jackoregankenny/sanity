import { defineArrayMember, defineField, defineType } from 'sanity'
import { BasketIcon, ClipboardIcon, LeaveIcon, SparklesIcon } from '@sanity/icons'
import { 
  ProductOverviewInfo, 
  ProductBenefitsInfo, 
  ProductSpecsInfo, 
  ProductIngredientsInfo,
  LocalizedTextInfo 
} from '../../components/DocumentInfo'

// Product Overview Block
export const productOverviewBlock = defineType({
  name: 'productOverview',
  type: 'object',
  title: 'Product Overview',
  icon: SparklesIcon,
  groups: [
    { name: 'info', title: 'Information', default: true },
    { name: 'content', title: 'Content' },
    { name: 'media', title: 'Media' }
  ],
  fields: [
    defineField({
      name: 'info',
      type: 'string',
      group: 'info',
      components: {
        field: ProductOverviewInfo
      },
      readOnly: true
    }),
    defineField({
      name: 'heading',
      type: 'localizedText',
      group: 'content',
      description: 'The main heading for this section',
      components: {
        field: LocalizedTextInfo
      }
    }),
    defineField({
      name: 'description',
      type: 'localizedText',
      group: 'content',
      description: 'A brief description or introduction',
      components: {
        field: LocalizedTextInfo
      }
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: { hotspot: true },
      group: 'media',
      description: 'The main image for this section',
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility'
        })
      ]
    })
  ],
  preview: {
    select: {
      title: 'heading.text',
      media: 'image'
    },
    prepare({ title, media }) {
      return {
        title: title || 'Product Overview',
        subtitle: 'Overview Section',
        media: media || SparklesIcon
      }
    }
  }
})

// Product Benefits Block
export const productBenefitsBlock = defineType({
  name: 'productBenefits',
  type: 'object',
  title: 'Product Benefits',
  icon: LeaveIcon,
  groups: [
    { name: 'info', title: 'Information', default: true },
    { name: 'content', title: 'Content' }
  ],
  fields: [
    defineField({
      name: 'info',
      type: 'string',
      group: 'info',
      components: {
        field: ProductBenefitsInfo
      },
      readOnly: true
    }),
    defineField({
      name: 'heading',
      type: 'localizedText',
      group: 'content',
      description: 'The main heading for the benefits section',
      components: {
        field: LocalizedTextInfo
      }
    }),
    defineField({
      name: 'benefits',
      type: 'array',
      group: 'content',
      description: 'List of product benefits',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ 
              name: 'title', 
              type: 'localizedText',
              description: 'The benefit title',
              components: {
                field: LocalizedTextInfo
              }
            }),
            defineField({ 
              name: 'description', 
              type: 'localizedText',
              description: 'Detailed explanation of the benefit',
              components: {
                field: LocalizedTextInfo
              }
            })
          ],
          preview: {
            select: {
              title: 'title.text'
            },
            prepare({ title }) {
              return {
                title: title || 'New Benefit',
                subtitle: 'Product Benefit'
              }
            }
          }
        })
      ]
    })
  ],
  preview: {
    select: {
      title: 'heading.text'
    },
    prepare({ title }) {
      return {
        title: title || 'Product Benefits',
        subtitle: 'Benefits Section',
        media: LeaveIcon
      }
    }
  }
})

// Product Specifications Block
export const productSpecsBlock = defineType({
  name: 'productSpecs',
  type: 'object',
  title: 'Product Specifications',
  icon: ClipboardIcon,
  groups: [
    { name: 'info', title: 'Information', default: true },
    { name: 'content', title: 'Content' }
  ],
  fields: [
    defineField({
      name: 'info',
      type: 'string',
      group: 'info',
      components: {
        field: ProductSpecsInfo
      },
      readOnly: true
    }),
    defineField({
      name: 'heading',
      type: 'localizedText',
      group: 'content',
      description: 'The main heading for the specifications section',
      components: {
        field: LocalizedTextInfo
      }
    }),
    defineField({
      name: 'specs',
      type: 'array',
      group: 'content',
      description: 'List of product specifications',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ 
              name: 'label', 
              type: 'localizedText',
              description: 'The specification name',
              components: {
                field: LocalizedTextInfo
              }
            }),
            defineField({ 
              name: 'value', 
              type: 'localizedText',
              description: 'The specification value',
              components: {
                field: LocalizedTextInfo
              }
            })
          ],
          preview: {
            select: {
              title: 'label.text',
              subtitle: 'value.text'
            },
            prepare({ title, subtitle }) {
              return {
                title: title || 'New Specification',
                subtitle: subtitle || 'No value set'
              }
            }
          }
        })
      ]
    })
  ],
  preview: {
    select: {
      title: 'heading.text'
    },
    prepare({ title }) {
      return {
        title: title || 'Product Specifications',
        subtitle: 'Specifications Section',
        media: ClipboardIcon
      }
    }
  }
})

// Product Ingredients Block
export const productIngredientsBlock = defineType({
  name: 'productIngredients',
  type: 'object',
  title: 'Product Ingredients',
  icon: BasketIcon,
  groups: [
    { name: 'info', title: 'Information', default: true },
    { name: 'content', title: 'Content' }
  ],
  fields: [
    defineField({
      name: 'info',
      type: 'string',
      group: 'info',
      components: {
        field: ProductIngredientsInfo
      },
      readOnly: true
    }),
    defineField({
      name: 'heading',
      type: 'localizedText',
      group: 'content',
      description: 'The main heading for the ingredients section',
      components: {
        field: LocalizedTextInfo
      }
    }),
    defineField({
      name: 'ingredients',
      type: 'array',
      group: 'content',
      description: 'List of product ingredients',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ 
              name: 'name', 
              type: 'localizedText',
              description: 'The ingredient name',
              components: {
                field: LocalizedTextInfo
              }
            }),
            defineField({ 
              name: 'percentage', 
              type: 'string',
              description: 'The ingredient percentage or amount'
            }),
            defineField({ 
              name: 'description', 
              type: 'localizedText',
              description: 'Description of the ingredient',
              components: {
                field: LocalizedTextInfo
              }
            })
          ],
          preview: {
            select: {
              title: 'name.text',
              subtitle: 'percentage'
            },
            prepare({ title, subtitle }) {
              return {
                title: title || 'New Ingredient',
                subtitle: subtitle ? `${subtitle}%` : 'No percentage set'
              }
            }
          }
        })
      ]
    })
  ],
  preview: {
    select: {
      title: 'heading.text'
    },
    prepare({ title }) {
      return {
        title: title || 'Product Ingredients',
        subtitle: 'Ingredients Section',
        media: BasketIcon
      }
    }
  }
})

export const productBlocks = [
  productOverviewBlock,
  productBenefitsBlock,
  productSpecsBlock,
  productIngredientsBlock
] 