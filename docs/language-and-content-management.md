# Life Scientific - Language and Content Management

## Table of Contents
- [Language System](#language-system)
- [Content Structure](#content-structure)
- [Studio Organization](#studio-organization)
- [Document Actions](#document-actions)
- [Frontend Integration](#frontend-integration)
- [Best Practices](#best-practices)

## Language System

### Overview
The system supports multilingual content management with English as the primary language and translations in:
- French (fr) 🇫🇷
- German (de) 🇩🇪
- Spanish (es) 🇪🇸
- Italian (it) 🇮🇹
- Portuguese (pt) 🇵🇹

### Translation Management

#### 1. Original Documents
- All original content is created in English
- Original documents are marked with a "Original" badge
- Located under "Original Products" or "Original Posts" sections

#### 2. Translation Process
- Translations are managed through the "🌐 Translate" button
- Uses DeepL API for automated translation
- Translatable fields:
  - Products: name, tagline, description
  - Posts: title, excerpt

#### 3. Translation References
- Each document maintains references to its translations
- Translation IDs follow the format: `translation.{originalId}.{language}`
- Translations reference back to their English original

## Content Structure

### Products

#### 1. Base Product Structure
```typescript
{
  name: string            // Product name
  slug: string           // URL-friendly identifier
  language: string       // Language code (en, fr, de, etc.)
  tagline: string        // Short product description
  description: string    // Full product description
  productImage: Image    // Main product image
  category: string       // pesticide/herbicide/fungicide
  variants: ProductVariant[]
  translations: TranslationRefs
}
```

#### 2. Product Variants
```typescript
{
  country: 'IE' | 'UK'   // Country availability
  crop: string          // Target crop
  cropGroup: string     // Crop classification
  approvalNumber: string // Regulatory approval
  formulationType: string
  mechanismOfAction: string
  containerSize: string
  details: (ProductDocument | ActiveIngredient)[]
}
```

### Blog Posts

#### 1. Post Structure
```typescript
{
  title: string         // Post title
  slug: string         // URL-friendly identifier
  language: string     // Language code
  author: Reference    // Link to author
  mainImage: Image     // Featured image
  categories: Reference[] // Post categories
  publishedAt: datetime
  excerpt: string      // Short summary
  body: array          // Rich text content
  translations: TranslationRefs
}
```

## Studio Organization

### Desk Structure
```
Content
├── Products
│   ├── Original Products (English)
│   ├── Translations
│   │   ├── French Products
│   │   ├── German Products
│   │   ├── Spanish Products
│   │   ├── Italian Products
│   │   └── Portuguese Products
│   └── All Products
└── Blog
    ├── Original Posts (English)
    ├── Translations
    │   ├── French Posts
    │   ├── German Posts
    │   ├── Spanish Posts
    │   ├── Italian Posts
    │   └── Portuguese Posts
    ├── All Posts
    ├── Authors
    └── Categories
```

## Document Actions

### Translation Actions
- **🌐 Translate**: Available on English documents
  - Automatically creates/updates translations in all supported languages
  - Preserves non-translatable fields (images, references, etc.)
  - Shows status for each language (created/updated/failed)

### Delete Actions

#### 1. Delete
- Removes single document
- Updates reference in original/translations
- Maintains other translations

#### 2. Delete All
- Removes document and all translations
- Requires confirmation
- Cleans up all references
- Available for both originals and translations

## Frontend Integration

### Language Selection
- Language selector in header
- Persists language preference
- Automatically shows content in selected language

### Content Display

#### 1. Products
- Filtered by language
- Shows country availability
- Displays technical details and variants
- Related products based on category and country

#### 2. Blog Posts
- Language-specific content
- Author information
- Categories and tags
- Rich text content with images

### Translation UI
- Language flags and native names
- Clear indication of current language
- Smooth transition between translations

## Best Practices

### 1. Content Creation
- Always create original content in English
- Fill all required fields before translation
- Use clear, translatable language

### 2. Translation Management
- Review automated translations
- Keep translations in sync with originals
- Use delete actions appropriately

### 3. Content Organization
- Use appropriate categories
- Maintain consistent naming
- Keep product variants updated

### 4. Technical Details
- Maintain accurate approval numbers
- Update country availability
- Keep documentation current

---

## API Reference

### Translation Endpoints

#### POST /api/translate
Translates content using DeepL API

**Request Body:**
```typescript
{
  fromLang: string,     // Source language (e.g., 'en')
  toLang: string,       // Target language (e.g., 'fr', 'de')
  document: {
    fields: {           // Fields to translate
      [key: string]: string
    }
  }
}
```

**Response:**
```typescript
{
  document: {
    fields: {           // Translated fields
      [key: string]: string
    }
  }
}
```

### Environment Variables

Required environment variables for translation functionality:
```env
DEEPL_API_KEY=your-api-key
```

## Troubleshooting

### Common Issues

1. **Translation Fails**
   - Check DeepL API key validity
   - Verify network connectivity
   - Ensure content is not empty

2. **Missing Translations**
   - Verify original document exists
   - Check language configuration
   - Confirm translation references

3. **Delete Operation Fails**
   - Check for reference constraints
   - Verify user permissions
   - Ensure document exists

### Support

For additional support or feature requests:
- Email: support@lifescientific.com
- Documentation: [Internal Wiki]
- GitHub: [Repository Link] 