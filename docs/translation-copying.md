# Translation Copying System

## Overview

The Life Scientific website implements a robust translation copying system that allows content managers to easily create and update translations based on English source content. This document details the implementation and usage of the "Copy from English" feature.

## Features

- Automatic source document detection
- Selective field copying
- Translation status tracking
- Draft management
- Error handling and validation

## Implementation

### Location
The copy functionality is implemented in:
```typescript
studio-lifescientific/actions/copyFromSource.ts
```

### Core Components

1. **Document Action**
   - Appears as a "Copy from English" button
   - Only visible on non-English documents
   - Handles both new and existing translations

2. **Field Management**
   ```typescript
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
   ]
   ```

3. **Translation Metadata**
   ```typescript
   const documentData = {
     _type: type,
     language: doc.language,
     translationStatus: 'needs-review',
     lastTranslated: new Date().toISOString(),
     lastUpdated: new Date().toISOString(),
     version: englishDoc.version,
     // ... copied fields
   }
   ```

## Usage

### Creating a New Translation

1. Navigate to the content type section (e.g., Products)
2. Create a new document in the desired language
3. Click "Copy from English" in the document actions
4. The system will:
   - Find the English source document
   - Copy all relevant fields
   - Create a draft with the content
   - Set status to "needs-review"

### Updating Existing Translations

1. Open the translation document
2. Click "Copy from English" to refresh content
3. The system will:
   - Update all copied fields
   - Maintain existing translations
   - Update translation metadata
   - Create/update draft as needed

## Technical Details

### Document Matching
- Uses document slugs to match translations with source
- Maintains consistent document structure
- Preserves references and relationships

### Draft Management
```typescript
// Create or update draft
const draftId = draft?.['_id'] || `drafts.${id}`
if (existingDraft) {
  await client.patch(draftId).set(documentData).commit()
} else {
  await client.createOrReplace({
    ...documentData,
    _id: draftId,
    _type: type
  })
}
```

### Error Handling
- Validates source document existence
- Checks for required fields
- Provides clear error messages
- Maintains document integrity

## Best Practices

1. **Before Copying**
   - Ensure English content is complete
   - Verify all required fields are filled
   - Check media assets are properly linked

2. **After Copying**
   - Review copied content
   - Use AI Assist for translation
   - Update status when translation is complete
   - Publish when ready

3. **Maintenance**
   - Regularly check translation status
   - Update translations when source changes
   - Monitor version numbers
   - Keep drafts synchronized

## Troubleshooting

### Common Issues

1. **Copy Failed - Source Not Found**
   - Verify English document exists
   - Check slug matches
   - Ensure correct document type

2. **Copy Failed - Document Creation**
   - Check document permissions
   - Verify draft status
   - Review document structure

3. **Missing Fields**
   - Verify field list is up to date
   - Check field permissions
   - Ensure field types match

## Future Improvements

Planned enhancements:
- Selective field copying
- Translation memory
- Batch operations
- Change tracking
- Version diffing

## Support

For technical issues or questions:
- Technical Support: support@lifescientific.com
- Documentation: [Internal Wiki Link]
- Source Code: [Repository Link]

---

Last Updated: [Current Date]
Version: 1.0.0 