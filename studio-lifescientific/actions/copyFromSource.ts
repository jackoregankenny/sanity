import { useClient } from 'sanity'
import { useToast } from '@sanity/ui'
import { DocumentActionProps } from 'sanity'
import { translationStatusList } from '../config/languages'

interface SanityDocument {
  _type: string
  _id: string
  language?: string
  slug?: {
    current: string
  }
}

// Get all fields that have aiAssist.translateAction = true
async function getTranslatableFields(client: any, type: string) {
  const schema = await client.fetch(`*[_type == "schema.type" && name == $type][0]`, { type })
  return schema?.fields?.filter((field: any) => 
    field.options?.aiAssist?.translateAction === true
  ).map((field: any) => field.name) || []
}

export default function CopyFromSourceAction(props: DocumentActionProps) {
  const { draft, published, id, type } = props
  const client = useClient()
  const toast = useToast()

  // Only show on non-English documents
  const doc = (draft || published) as SanityDocument | undefined
  const isTranslation = doc?.language && doc.language !== 'en'
  
  if (!isTranslation || !doc?.slug?.current) {
    return null
  }

  // Safe to use doc.slug.current after the check above
  const slugCurrent = doc.slug.current

  return {
    label: 'Copy from English',
    icon: () => '🔄',
    onHandle: async () => {
      try {
        // Show progress toast
        toast.push({ status: 'info', title: 'Copying from English source...' })

        // Find the English source document using the same slug
        const englishDoc = await client.fetch(
          `*[_type == $type && language == "en" && slug.current == $slug][0]`,
          { 
            type,
            slug: slugCurrent
          }
        )

        if (!englishDoc) {
          throw new Error('English source document not found. Please create the English version first with the same slug.')
        }

        // Only copy specific fields from English source
        const fieldsToCopy = [
          'name',
          'tagline',
          'description',
          'features',
          'benefits',
          'supportedCrops',
          'variants',
          'productImage',
          'category'
        ] as const

        // Create base document data with type safety
        const documentData: Record<string, any> = {
          _type: type,
          language: doc.language,
          translationStatus: 'needs-review' as const,
          lastTranslated: new Date().toISOString(),
          lastUpdated: new Date().toISOString(),
          version: englishDoc.version,
          slug: {
            _type: 'slug',
            current: slugCurrent
          }
        }

        // Add fields from English source
        fieldsToCopy.forEach(field => {
          if (englishDoc[field]) {
            documentData[field] = englishDoc[field]
          }
        })

        try {
          // Always work with drafts
          const draftId = draft?.['_id'] || `drafts.${id}`
          
          // Check if draft exists
          const existingDraft = await client.fetch(`*[_id == $draftId][0]`, { draftId })

          if (existingDraft) {
            // Update existing draft
            await client
              .patch(draftId)
              .set(documentData)
              .commit()
          } else {
            // Create new draft with required fields
            await client.createOrReplace({
              ...documentData,
              _id: draftId,
              _type: type // Ensure _type is included
            })
          }

          // Show success message
          toast.push({
            status: 'success',
            title: 'Content copied from English',
            description: 'Use the AI Assist button in each field to translate the content'
          })

          props.onComplete()
        } catch (mutationError) {
          console.error('Mutation error:', mutationError)
          throw new Error('Failed to update document. Please try again.')
        }
      } catch (err) {
        console.error('Failed to copy from source:', err)
        // Show error message
        toast.push({
          status: 'error',
          title: 'Copy failed',
          description: err instanceof Error ? err.message : 'Unknown error occurred'
        })
        props.onComplete()
      }
    }
  }
} 