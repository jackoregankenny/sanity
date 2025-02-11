import { defineField, defineType } from '@sanity/types'

export default defineType({
  name: 'productDocument',
  title: 'Product Document',
  type: 'object',
  fields: [
    defineField({
      name: 'documentType',
      title: 'Document Type',
      type: 'string',
      options: {
        list: [
          { title: 'SDS', value: 'sds' },
          { title: 'Label', value: 'label' },
          { title: 'Product', value: 'product' }
        ]
      }
    }),
    defineField({
      name: 'file',
      title: 'File',
      type: 'file'
    })
  ]
}) 