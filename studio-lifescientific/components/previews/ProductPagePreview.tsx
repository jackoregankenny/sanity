import React from 'react'
import { Card, Flex, Stack, Text } from '@sanity/ui'

interface PreviewProps {
  document: {
    displayed: {
      product?: {
        name: string
      }
      pageTitle?: {
        text: string
      }
      content?: any[]
    }
  }
}

export function ProductPagePreview({ document }: PreviewProps) {
  const { displayed } = document
  const product = displayed.product
  const pageTitle = displayed.pageTitle?.text
  const contentBlocks = displayed.content || []

  return (
    <Card padding={4}>
      <Stack space={4}>
        <Card padding={3} tone="primary" border radius={2}>
          <Text size={2} weight="semibold">
            {pageTitle || 'Untitled Page'}
          </Text>
          {product && (
            <Text size={1} muted>
              Product: {product.name}
            </Text>
          )}
        </Card>

        <Stack space={3}>
          {contentBlocks.map((block, index) => (
            <Card key={block._key || index} padding={3} border radius={2}>
              <Stack space={3}>
                <Text size={1} weight="semibold">
                  {block._type}
                </Text>
                {block.heading?.text && (
                  <Text size={1}>{block.heading.text}</Text>
                )}
              </Stack>
            </Card>
          ))}
        </Stack>

        {contentBlocks.length === 0 && (
          <Card padding={4} tone="caution" border radius={2}>
            <Text align="center">No content blocks added yet</Text>
          </Card>
        )}
      </Stack>
    </Card>
  )
} 