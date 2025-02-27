# Life Scientific - Language and Content Management

## Table of Contents
- [Overview](#overview)
- [Language System](#language-system)
- [Content Structure](#content-structure)
- [Translation Management](#translation-management)
- [Studio Organization](#studio-organization)
- [Implementation Details](#implementation-details)
- [Best Practices](#best-practices)

## Overview

The Life Scientific website uses Sanity.io for content management with built-in multilingual support. The system is designed to:
- Maintain English as the primary content source
- Support multiple language translations
- Track translation status and updates
- Share media assets across translations
- Provide an efficient workflow for content managers

## Language System

### Supported Languages
The system supports the following languages:
```typescript
languages = [
  { id: 'en', title: 'English', flag: '🇬🇧', isDefault: true },
  { id: 'fr', title: 'French', flag: '🇫🇷' },
  { id: 'de', title: 'German', flag: '🇩🇪' },
  { id: 'es', title: 'Spanish', flag: '🇪🇸' },
  { id: 'it', title: 'Italian', flag: '🇮🇹' },
  // ... additional languages
]
```

### Translation Status System
Each translated document includes:
- Status indicator: up-to-date ✓ | needs-review ⚠️ | out-of-sync ⚡
- Last translation date
- Last update date
- Content version number

## Content Structure

### Document Types
All translatable document types (products, pages, posts) include:
- Language field (automatically set)
- Translation tracking fields
- Shared media references
- AI-assisted translation fields

### Media Handling
- Images are stored once and referenced across translations
- Only alt text and captions are translated
- Uses Sanity's built-in asset management
- No duplication of media assets

## Translation Management

### Translation Process
1. Create content in English (source language)
2. Create a new translation document or select an existing one
3. Use the "Copy from English" button to copy the source content
4. Use the AI Assist translation feature in Sanity Studio
5. Review and edit translations as needed
6. Update translation status and version

### Copy from English Feature
The system provides a "Copy from English" button that:
- Automatically finds the English source document
- Copies all translatable content fields
- Maintains document structure and references
- Sets translation status to "needs-review"
- Updates translation metadata

### Translation Fields
Fields marked with `aiAssist.translateAction: true` can be translated:
```typescript
options: {
  aiAssist: {
    translateAction: true
  }
}
```

### Copied Fields
The following fields are automatically copied from English source:
- name
- tagline
- description
- features
- benefits
- supportedCrops
- variants
- productImage
- category

### Status Tracking
Translation status is tracked through:
- Visual indicators in the Studio
- Status badges on content lists
- Translation Info tab in document editor
- Automatic status updates on copy operations

## Studio Organization

### Desk Structure
The Studio is organized by content type and language:
```
Content
├── Landing Page
├── Products
│   ├── 🇬🇧 English (Original)
│   ├── 🇫🇷 French
│   ├── 🇩🇪 German
│   └── ...
├── Pages
└── Blog
    ├── Posts
    ├── Authors
    └── Categories
```

### Status Indicators
- ✓ Up to date (green)
- ⚠️ Needs review (yellow)
- ⚡ Out of sync (red)

## Implementation Details

### Key Files
1. `studio-lifescientific/config/languages.ts`
   - Language configuration
   - Translation status types
   - Shared translation fields

2. `studio-lifescientific/deskStructure.ts`
   - Studio navigation structure
   - Language filtering
   - Status badges

3. `studio-lifescientific/schemaTypes/product.ts` (example)
   - Document schema with translation fields
   - AI-assist configuration
   - Media handling

### Translation Fields Implementation
```typescript
// Translation tracking fields
export const translationTrackingFields = [
  {
    name: 'translationStatus',
    title: 'Translation Status',
    type: 'string',
    options: {
      list: [
        { title: 'Up to Date', value: 'up-to-date' },
        { title: 'Needs Review', value: 'needs-review' },
        { title: 'Out of Sync', value: 'out-of-sync' }
      ]
    }
  },
  {
    name: 'lastTranslated',
    title: 'Last Translated',
    type: 'datetime'
  },
  // ... additional fields
]
```

## Best Practices

### Content Creation
1. Always create original content in English first
2. Fill all required fields before translation
3. Use clear, translatable language
4. Add descriptive alt text for images

### Translation Workflow
1. Use AI Assist for initial translation
2. Review translations for accuracy
3. Update translation status accordingly
4. Keep versions synchronized

### Media Management
1. Upload high-quality images once
2. Use meaningful file names
3. Add alt text in source language
4. Translate alt text for each language

### Version Control
1. Increment version numbers for significant changes
2. Update translation status when source changes
3. Review affected translations
4. Maintain change history

## Troubleshooting

### Common Issues
1. **Missing Translations**
   - Check language configuration
   - Verify document references
   - Ensure proper language field values

2. **Status Not Updating**
   - Check desk structure configuration
   - Verify translation tracking fields
   - Clear browser cache

3. **Media Issues**
   - Verify asset references
   - Check image permissions
   - Confirm CDN configuration

## Support and Resources

### Documentation
- [Sanity.io Documentation](https://www.sanity.io/docs)
- [AI Assist Guide](https://www.sanity.io/docs/ai-assist)
- Internal Wiki (link)

### Contact
- Technical Support: support@lifescientific.com
- Content Team: content@lifescientific.com

---

Last Updated: [Current Date]
Version: 2.0.0 