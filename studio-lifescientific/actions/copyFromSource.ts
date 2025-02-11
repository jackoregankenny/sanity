import {useClient} from 'sanity'
import {DocumentActionProps} from 'sanity'

// Fields that should be copied from source
const FIELDS_TO_COPY = ['name', 'tagline', 'description', 'productImage'] as const

export default function CopyFromSourceAction(props: DocumentActionProps) {
  const {draft, published, id} = props
  const client = useClient()

  // Only show on non-English documents
  const doc = draft || published
  const isTranslation = doc?.language && doc.language !== 'en'
  
  if (!isTranslation) {
    return null
  }

  return {
    label: 'Copy from English',
    icon: () => '🔄',
    onHandle: async () => {
      // Get the base document ID (without language suffix)
      const baseId = id.replace(/--[a-z]{2}(-[A-Z]{2})?$/, '')
      
      try {
        // Fetch the English source document
        const sourceDoc = await client.fetch(
          `*[_id == $id && language == "en"][0]`,
          {id: baseId}
        )

        if (!sourceDoc) {
          throw new Error('Source document not found')
        }

        // Create a single patch with all field updates
        const patch = {
          _type: 'product',
          language: doc.language,
          ...FIELDS_TO_COPY.reduce((acc, field) => ({
            ...acc,
            [field]: sourceDoc[field]
          }), {})
        }

        // Apply the patch
        await client
          .patch(id)
          .set(patch)
          .commit()

        // Show success message
        props.onComplete()
      } catch (err) {
        console.error('Failed to copy from source:', err)
        // Show error message
        props.onComplete()
      }
    }
  }
} 