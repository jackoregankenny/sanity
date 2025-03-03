# Component Organization and Translation Guide

This guide explains how to better organize components in the Life Scientific project and ensure they support translations.

## Component Organization

Currently, many components are in the `landing` folder, but as the project grows, a better organization structure will help with maintainability. Here's a recommended approach:

### Recommended Component Structure

```
src/
└── components/
    ├── common/               # Reusable across the entire app
    │   ├── Button.tsx
    │   ├── Card.tsx
    │   └── ...
    ├── layouts/              # Layout components
    │   ├── Header.tsx
    │   ├── Footer.tsx
    │   └── ...
    ├── sections/             # Larger section components used on multiple pages
    │   ├── hero/             # Different hero components
    │   │   ├── MinimalHero.tsx
    │   │   └── FullWidthHero.tsx
    │   ├── features/         # Feature section variations
    │   │   ├── FeaturesGrid.tsx
    │   │   └── FeaturesList.tsx
    │   ├── testimonials/     # Testimonial sections
    │   │   └── TestimonialsSection.tsx
    │   └── ...               # Other section components
    ├── pages/                # Page-specific components
    │   ├── home/             # Components only used on the home page
    │   ├── products/         # Components specific to product pages
    │   ├── about/            # Components specific to about pages
    │   └── ...               # Other page-specific components
    └── ui/                   # UI building blocks
        ├── inputs/           # Form inputs
        ├── modals/           # Modal components
        ├── notifications/    # Notification components
        └── ...               # Other UI components
```

### Migration Strategy

1. Create the new directory structure
2. Move components to their appropriate folders
3. Update imports in all files that use these components
4. Test thoroughly after migration

For example, to migrate the existing landing components:

```
// Current:
src/components/landing/ResearchSection.tsx

// New:
src/components/sections/research/ResearchSection.tsx
```

## Adding Pre-made Components

When adding pre-made components to the project:

1. Create a new file in the appropriate directory based on the component's purpose
2. Ensure the component follows the project's coding standards and styling approach
3. Add TypeScript interfaces for the component props
4. Add translation support (see section below)
5. Update the Sanity schema if needed

### Example workflow

1. Drop the pre-made component file into the appropriate directory
2. Update import paths for any dependencies
3. Adjust styling to match project conventions (e.g., Tailwind classes)
4. Add translation support
5. Test the component in different contexts

## Translation Support for Components

To ensure components support translations, follow these guidelines:

### 1. Use the Translation Hook

```typescript
import { useTranslations } from '@/hooks/useTranslations'

export function MyComponent() {
  const { t } = useTranslations()
  
  return (
    <div>
      <h2>{t('myComponent.title')}</h2>
      <p>{t('myComponent.description')}</p>
    </div>
  )
}
```

### 2. Handle Dynamic Content from Sanity

For content coming from Sanity CMS that's already translated:

```typescript
type MyComponentProps = {
  title: string
  description: string
}

export function MyComponent({ title, description }: MyComponentProps) {
  const { t } = useTranslations()
  
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      {/* Static UI text still uses the translation function */}
      <button>{t('common.readMore')}</button>
    </div>
  )
}
```

### 3. Create Translation Files

Add your component's translation keys to each language file:

```json
// locales/en.json
{
  "myComponent": {
    "title": "Welcome to our site",
    "description": "This is a description of what we do",
    "buttonText": "Learn more"
  }
}

// locales/fr.json
{
  "myComponent": {
    "title": "Bienvenue sur notre site",
    "description": "Voici une description de ce que nous faisons",
    "buttonText": "En savoir plus"
  }
}
```

### 4. Handling Fallbacks

Always provide fallbacks for translations:

```typescript
{t('myComponent.title') || 'Default Title'}
```

### 5. Date and Number Formatting

Use the built-in formatters for dates and numbers:

```typescript
import { formatDate, formatNumber } from '@/utils/formatters'

// In your component
<p>{formatDate(date, locale)}</p>
<p>{formatNumber(value, locale)}</p>
```

## Example: Adding Translation Support to an Existing Component

Here's how to update an existing component to support translations:

### Before:

```typescript
export function FeatureCard({ title, description, icon }) {
  return (
    <div className="feature-card">
      {icon && <div className="icon">{icon}</div>}
      <h3>Feature Title</h3>
      <p>This is a hardcoded description</p>
      <button>Learn More</button>
    </div>
  )
}
```

### After:

```typescript
import { useTranslations } from '@/hooks/useTranslations'

export function FeatureCard({ title, description, icon }) {
  const { t } = useTranslations()
  
  return (
    <div className="feature-card">
      {icon && <div className="icon">{icon}</div>}
      <h3>{title || t('features.defaultTitle')}</h3>
      <p>{description || t('features.defaultDescription')}</p>
      <button>{t('common.learnMore')}</button>
    </div>
  )
}
```

## Best Practices for Translatable Components

1. **Keep Text Separate from Markup**: Avoid concatenating strings in your components
2. **Use Placeholders for Variables**: For dynamic content, use placeholders in your translations
3. **Consider Text Length**: Some languages may have longer text, ensure your UI can handle it
4. **RTL Support**: Consider right-to-left language support for layouts
5. **Test with Different Languages**: Verify your components work with languages of varying lengths
6. **Document Translation Keys**: Keep a list of all translation keys for reference

## Testing Translations

To test your components with different translations:

1. Switch the language in the app
2. Verify all text is properly translated
3. Check for layout issues due to text length differences
4. Test RTL languages if supported

## Integrating with Sanity

When using components with Sanity:

1. Define multilingual fields in your Sanity schema
2. Fetch content based on the current language
3. Pass the translated content to your components

### Sanity Schema for Multilingual Content

```javascript
export const myMultilingualSchema = defineType({
  name: 'myContent',
  title: 'My Content',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'object',
      fields: Object.keys(supportedLanguages).map(lang => ({
        name: lang,
        title: supportedLanguages[lang].title,
        type: 'string'
      }))
    },
    {
      name: 'description',
      title: 'Description',
      type: 'object',
      fields: Object.keys(supportedLanguages).map(lang => ({
        name: lang,
        title: supportedLanguages[lang].title,
        type: 'text'
      }))
    }
  ]
})
```

## Component-Specific Translation Organization

For complex components, organize translations by component:

```json
{
  "components": {
    "researchSection": {
      "title": "Research",
      "subtitle": "Our approach",
      "statLabels": {
        "years": "Years of Research",
        "effectiveness": "Effectiveness Rate",
        "countries": "Countries Served",
        "centers": "Research Centers"
      },
      "leadershipSection": "Leadership Perspective"
    },
    "featuresSection": {
      "...": "..."
    }
  }
}
```

By following these guidelines, you'll create a well-organized component structure with robust translation support throughout your application. 